import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createThemePalette } from '../../theme';
import { registerModelNode } from './model-node';
import { getErdNodeSize, type ErdNodeStyle } from './type';

const { registerMock } = vi.hoisted(() => ({ registerMock: vi.fn() }));

vi.mock('../g6', () => ({
  ExtensionCategory: { NODE: 'node' },
  Rect: class {
    parsedAttributes = {};
    upsert = vi.fn();

    getKeyStyle(attributes: unknown) {
      return attributes;
    }

    render() {}
  },
  register: registerMock,
}));

const createStyle = (
  darkness = false,
  selected = false,
  compact: 0 | 1 | 2 = 0,
): ErdNodeStyle => ({
  compact,
  erd: {
    aggregateModelKey: 'account',
    aggregateRelationLabel: '1:n relation',
    fields: [],
    label: 'User account',
    modelConfig: {
      fields: [],
      label: 'User account',
      module: 'identity',
      name: 'User',
    },
    modelId: 'user',
    name: 'User',
    viewDetailsLabel: darkness ? '查看详情' : 'View detail',
  },
  fieldHeight: 32,
  headerHeight: 48,
  palette: createThemePalette(darkness),
  selected,
  showNameOrLabel: true,
});

type ModelNode = {
  getKeyStyle: (style: ReturnType<typeof createStyle>) => {
    size: [number, number];
  };
  render: (style: ReturnType<typeof createStyle>, container: object) => void;
  upsert: ReturnType<typeof vi.fn>;
};

const createNode = () => {
  registerModelNode();
  const Node = registerMock.mock.calls.at(-1)?.[2] as new () => ModelNode;
  return new Node();
};

const getShape = (node: ModelNode, key: string) => {
  const call = node.upsert.mock.calls.find(([shapeKey]) => shapeKey === key);
  return call ? { attributes: call[2], type: call[1] } : undefined;
};

const getLastShape = (node: ModelNode, key: string) => {
  const call = [...node.upsert.mock.calls]
    .reverse()
    .find(([shapeKey]) => shapeKey === key);
  return call ? { attributes: call[2], type: call[1] } : undefined;
};

describe('ErdModelNode compact level of detail', () => {
  beforeEach(() => registerMock.mockClear());

  it('keeps the full model footprint at every compact level', () => {
    const style = createStyle();
    style.erd.fields = Array.from({ length: 6 }, (_, index) => ({
      id: `field-${index}`,
      label: `Field ${index}`,
      name: `field_${index}`,
      type: 'string',
    }));

    const sizes = ([0, 1, 2] as const).map((compact) =>
      getErdNodeSize({ ...style, compact }),
    );

    expect(sizes).toEqual([
      [300, 240],
      [300, 240],
      [300, 240],
    ]);
  });

  it.each([1, 2] as const)(
    'shows the complete model name across the compact %s card',
    (compact) => {
      const node = createNode();
      const style = createStyle(false, false, compact);
      style.erd.name = 'EnterpriseCustomerAccountRelationshipHistory';
      node.render(style, {});

      const title = getShape(node, 'compact-title');
      expect(title).toMatchObject({
        attributes: {
          textAlign: 'center',
          textBaseline: 'middle',
          wordWrap: true,
          wordWrapWidth: 268,
        },
        type: 'text',
      });
      expect(String(title?.attributes.text).replaceAll('\n', '')).toBe(
        style.erd.name,
      );
      const lines = String(title?.attributes.text).split('\n');
      expect(lines).toHaveLength(title?.attributes.maxLines);
      expect(
        Math.max(...lines.map((line) => line.length)) *
          Number(title?.attributes.fontSize),
      ).toBeLessThanOrEqual(268);
      expect(
        lines.length * Number(title?.attributes.lineHeight),
      ).toBeLessThanOrEqual(56);
    },
  );

  it('removes field text but retains a compact field area', () => {
    const node = createNode();
    const container = {};
    const style = createStyle();
    style.erd.fields = [
      {
        id: 'field-id',
        label: 'Identifier',
        name: 'id',
        type: 'string',
      },
    ];
    node.render(style, container);
    node.upsert.mockClear();

    node.render({ ...style, compact: 1 }, container);

    expect(getLastShape(node, 'field-name-0')?.attributes).toBe(false);
    expect(getLastShape(node, 'field-type-0')?.attributes).toBe(false);
    expect(getShape(node, 'compact-fields-background')).toMatchObject({
      attributes: { height: 32, width: 298 },
      type: 'rect',
    });
  });
});

describe('ErdModelNode detail action', () => {
  beforeEach(() => registerMock.mockClear());

  it('renders a compact eye icon button instead of detail text', () => {
    const node = createNode();
    node.render(createStyle(), {});

    const button = getShape(node, 'details-button');
    const icon = getShape(node, 'details-icon');
    const pupil = getShape(node, 'details-icon-pupil');
    const aggregate = getShape(node, 'aggregate-action');

    expect(getShape(node, 'details-action')).toBeUndefined();
    expect(button).toMatchObject({
      attributes: {
        action: 'modelEdit',
        cursor: 'pointer',
        height: 24,
        tooltip: 'View detail',
        width: 24,
      },
      type: 'rect',
    });
    expect(icon).toMatchObject({
      attributes: { pointerEvents: 'none' },
      type: 'path',
    });
    expect(pupil).toMatchObject({
      attributes: { pointerEvents: 'none' },
      type: 'circle',
    });
    expect(button?.attributes.x - aggregate?.attributes.x).toBe(8);
  });

  it('keeps the icon readable on a selected dark node', () => {
    const node = createNode();
    const style = createStyle(true, true);
    node.render(style, {});

    expect(getShape(node, 'details-button')?.attributes).toMatchObject({
      fill: style.palette.onAccent,
      fillOpacity: 0.14,
      stroke: style.palette.onAccent,
    });
    expect(getShape(node, 'details-icon')?.attributes.stroke).toBe(
      style.palette.onAccent,
    );
    expect(getShape(node, 'details-icon-pupil')?.attributes.fill).toBe(
      style.palette.onAccent,
    );
  });

  it('removes every detail-button shape in compact mode', () => {
    const node = createNode();
    const container = {};
    node.render(createStyle(), container);
    node.upsert.mockClear();

    node.render(createStyle(false, false, 1), container);

    expect(node.upsert).toHaveBeenCalledWith(
      'details-button',
      'rect',
      false,
      container,
    );
    expect(node.upsert).toHaveBeenCalledWith(
      'details-icon',
      'path',
      false,
      container,
    );
    expect(node.upsert).toHaveBeenCalledWith(
      'details-icon-pupil',
      'circle',
      false,
      container,
    );
  });
});
