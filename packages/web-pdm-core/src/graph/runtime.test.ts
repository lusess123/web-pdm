import { describe, expect, it, vi } from 'vitest';
import type { EdgeData, NodeData } from './g6';

vi.mock('./g6', () => ({
  Graph: class {},
  version: '5.1.1',
}));

vi.mock('./event', () => ({ bindGraphEvents: vi.fn() }));

import {
  createLayout,
  orientRelationPorts,
  resolveNodeOverlaps,
} from './runtime';

const createNode = (id: string, fieldCount: number, x?: number, y?: number) =>
  ({
    id,
    style: {
      erd: {
        fields: Array.from({ length: fieldCount }, (_, index) => ({
          id: `${id}-field-${index}`,
        })),
      },
      x,
      y,
    },
  }) as unknown as NodeData;

const centerOf = (nodes: NodeData[]) =>
  nodes.reduce(
    (center, node) => ({
      x: center.x + Number(node.style?.x),
      y: center.y + Number(node.style?.y),
    }),
    { x: 0, y: 0 },
  );

const overlapCount = (nodes: NodeData[]) => {
  let count = 0;
  nodes.forEach((node, index) => {
    const [width, height] = [300, 80];
    nodes.slice(index + 1).forEach((other) => {
      const [otherWidth, otherHeight] = [300, 80];
      if (
        Math.abs(Number(node.style?.x) - Number(other.style?.x)) <
          (width + otherWidth) / 2 &&
        Math.abs(Number(node.style?.y) - Number(other.style?.y)) <
          (height + otherHeight) / 2
      ) {
        count += 1;
      }
    });
  });
  return count;
};

describe('force layout', () => {
  it('uses each rectangular model footprint for collision sizing', () => {
    const shortModel = createNode('short', 1);
    const tallModel = createNode('tall', 10);
    const layout = createLayout(false, [shortModel, tallModel]);

    expect(layout.type).toBe('force');
    expect(layout.nodeSize).toBeTypeOf('function');
    const nodeSize = layout.nodeSize as (node: NodeData) => number;
    expect(nodeSize(shortModel)).toBeCloseTo(Math.hypot(300, 80));
    expect(nodeSize(tallModel)).toBeCloseTo(Math.hypot(300, 368));
    expect(nodeSize(shortModel)).not.toBe(nodeSize(tallModel));
  });

  it('uses the tuned native force parameters without clustering', () => {
    const layout = createLayout(false, [createNode('model', 1)]);

    expect(layout).toMatchObject({
      collideStrength: 1,
      damping: 0.82,
      edgeStrength: 100,
      gravity: 3,
      interval: 0.015,
      linkDistance: 360,
      maxIteration: 2000,
      maxSpeed: 100,
      minMovement: 0,
      nodeSpacing: 80,
      nodeStrength: 1200,
      preventOverlap: true,
      type: 'force',
    });
    expect(layout).not.toHaveProperty('clustering');
    expect(layout).not.toHaveProperty('leafCluster');
    expect(layout).not.toHaveProperty('nodeClusterBy');
  });

  it.each([
    [100, 2000, 0],
    [101, 1000, 0.15],
    [300, 1000, 0.15],
    [301, 400, 0.25],
    [1000, 400, 0.25],
  ])(
    'scales force work for %s models',
    (nodeCount, maxIteration, minMovement) => {
      const nodes = Array.from({ length: nodeCount }, (_, index) =>
        createNode(`model-${index}`, 1),
      );
      const layout = createLayout(false, nodes);

      expect(layout).toMatchObject({ maxIteration, minMovement });
    },
  );
});

describe('post-force overlap removal', () => {
  it('removes rectangle overlaps while keeping the layout center stable', () => {
    const nodes = Array.from({ length: 9 }, (_, index) =>
      createNode(`model-${index}`, 1, (index % 3) * 40, (index % 2) * 20),
    );
    const center = centerOf(nodes);

    const resolved = resolveNodeOverlaps(nodes);

    expect(overlapCount(nodes)).toBeGreaterThan(0);
    expect(overlapCount(resolved)).toBe(0);
    expect(centerOf(resolved).x).toBeCloseTo(center.x, 6);
    expect(centerOf(resolved).y).toBeCloseTo(center.y, 6);
  });

  it('does not move models that already have enough room', () => {
    const nodes = [
      createNode('left', 1, -155, 0),
      createNode('right', 1, 155, 0),
    ];

    expect(resolveNodeOverlaps(nodes)).toEqual(nodes);
  });
});

describe('relationship port orientation', () => {
  it('uses the nearest horizontal sides after layout', () => {
    const target = createNode('target', 1, -400, 0);
    const source = createNode('source', 1, 400, 0);
    const edge = {
      id: 'relation',
      source: 'source',
      target: 'target',
      style: {
        sourcePort: 'field-0-right',
        targetPort: 'header-left',
      },
    } as EdgeData;

    const [oriented] = orientRelationPorts([source, target], [edge]);

    expect(oriented.style).toMatchObject({
      sourcePort: 'field-0-left',
      targetPort: 'header-right',
    });
    expect(edge.style).toMatchObject({
      sourcePort: 'field-0-right',
      targetPort: 'header-left',
    });
  });

  it('keeps opposite ports for a self relation', () => {
    const node = createNode('self', 1, 0, 0);
    const edge = {
      id: 'self-relation',
      source: 'self',
      target: 'self',
      style: {
        sourcePort: 'field-0-left',
        targetPort: 'field-0-left',
      },
    } as EdgeData;

    expect(orientRelationPorts([node], [edge])[0].style).toMatchObject({
      sourcePort: 'field-0-right',
      targetPort: 'field-0-left',
    });
  });
});
