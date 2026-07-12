import type { RootInstance } from '../type';
import type { ModelConfig } from '../type/config';
import { bindGraphEvents } from './event';
import {
  Graph,
  version,
  type EdgeData,
  type GraphOptions,
  type NodeData,
  type PluginOptions,
} from './g6';
import { getErdNodeSize, type ErdNodeStyle } from './item/type';

const MINIMAP_KEY = 'web-pdm-minimap';
const TOOLTIP_KEY = 'web-pdm-edge-tooltip';
const MINIMAP_RENDER_DELAY = 128;
const OVERLAP_CELL_SIZE = 384;
const OVERLAP_MAX_PASSES = 64;
const OVERLAP_EPSILON = 0.01;

type PositionedNode = {
  height: number;
  index: number;
  width: number;
  x: number;
  y: number;
};

const compareNodePositions = (
  first: PositionedNode,
  second: PositionedNode,
) => {
  if (first.y !== second.y) return first.y - second.y;
  if (first.x !== second.x) return first.x - second.x;
  return first.index - second.index;
};

export const layoutNodeSize = (node: NodeData) => {
  const style = node.style as unknown as ErdNodeStyle;
  return getErdNodeSize({ compact: 0, erd: style.erd });
};

const forceIterationOptions = (nodeCount: number) => {
  if (nodeCount <= 100) return { maxIteration: 2000, minMovement: 0 };
  if (nodeCount <= 300) return { maxIteration: 1000, minMovement: 0.15 };
  return { maxIteration: 400, minMovement: 0.25 };
};

const spatialPairs = (nodes: PositionedNode[]) => {
  const cells = new Map<string, number[]>();
  const seen = new Set<number>();
  const pairs: [number, number][] = [];

  nodes.forEach((node, nodeIndex) => {
    const halfWidth = node.width / 2;
    const halfHeight = node.height / 2;
    const minColumn = Math.floor((node.x - halfWidth) / OVERLAP_CELL_SIZE);
    const maxColumn = Math.floor((node.x + halfWidth) / OVERLAP_CELL_SIZE);
    const minRow = Math.floor((node.y - halfHeight) / OVERLAP_CELL_SIZE);
    const maxRow = Math.floor((node.y + halfHeight) / OVERLAP_CELL_SIZE);

    for (let column = minColumn; column <= maxColumn; column += 1) {
      for (let row = minRow; row <= maxRow; row += 1) {
        const key = `${column}:${row}`;
        const cell = cells.get(key);
        if (cell) cell.push(nodeIndex);
        else cells.set(key, [nodeIndex]);
      }
    }
  });

  cells.forEach((cell) => {
    for (let left = 0; left < cell.length; left += 1) {
      for (let right = left + 1; right < cell.length; right += 1) {
        const first = Math.min(cell[left], cell[right]);
        const second = Math.max(cell[left], cell[right]);
        const key = first * nodes.length + second;
        if (seen.has(key)) continue;
        seen.add(key);
        pairs.push([first, second]);
      }
    }
  });

  return pairs;
};

const sweepRemainingOverlaps = (nodes: PositionedNode[]) => {
  const columns = new Map<number, PositionedNode[]>();
  let moved = false;

  [...nodes].sort(compareNodePositions).forEach((node) => {
    const halfWidth = node.width / 2;
    const minColumn = Math.floor((node.x - halfWidth) / OVERLAP_CELL_SIZE);
    const maxColumn = Math.floor((node.x + halfWidth) / OVERLAP_CELL_SIZE);
    const candidates = new Set<PositionedNode>();
    for (let column = minColumn; column <= maxColumn; column += 1) {
      columns.get(column)?.forEach((candidate) => candidates.add(candidate));
    }

    candidates.forEach((candidate) => {
      const overlapX =
        (node.width + candidate.width) / 2 - Math.abs(node.x - candidate.x);
      if (overlapX <= 0) return;
      const nextY =
        candidate.y + (candidate.height + node.height) / 2 + OVERLAP_EPSILON;
      if (node.y >= nextY) return;
      node.y = nextY;
      moved = true;
    });

    for (let column = minColumn; column <= maxColumn; column += 1) {
      const items = columns.get(column);
      if (items) items.push(node);
      else columns.set(column, [node]);
    }
  });

  return moved;
};

export const resolveNodeOverlaps = (nodes: NodeData[]): NodeData[] => {
  const positions = nodes.flatMap((node, index): PositionedNode[] => {
    const x = Number(node.style?.x);
    const y = Number(node.style?.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return [];
    const [width, height] = layoutNodeSize(node);
    return [{ height, index, width, x, y }];
  });
  if (positions.length < 2) return nodes;
  const originalCenter = positions.reduce(
    (center, position) => ({
      x: center.x + position.x / positions.length,
      y: center.y + position.y / positions.length,
    }),
    { x: 0, y: 0 },
  );

  let changed = false;
  for (let pass = 0; pass < OVERLAP_MAX_PASSES; pass += 1) {
    let moved = false;

    spatialPairs(positions).forEach(([firstIndex, secondIndex]) => {
      const first = positions[firstIndex];
      const second = positions[secondIndex];
      const deltaX = second.x - first.x;
      const deltaY = second.y - first.y;
      const overlapX = (first.width + second.width) / 2 - Math.abs(deltaX);
      const overlapY = (first.height + second.height) / 2 - Math.abs(deltaY);
      if (overlapX <= 0 || overlapY <= 0) return;

      if (overlapX <= overlapY) {
        const direction = deltaX === 0 ? 1 : Math.sign(deltaX);
        const distance = (overlapX + OVERLAP_EPSILON) / 2;
        first.x -= direction * distance;
        second.x += direction * distance;
      } else {
        const direction = deltaY === 0 ? 1 : Math.sign(deltaY);
        const distance = (overlapY + OVERLAP_EPSILON) / 2;
        first.y -= direction * distance;
        second.y += direction * distance;
      }
      moved = true;
      changed = true;
    });

    if (!moved) break;
  }

  if (sweepRemainingOverlaps(positions)) changed = true;

  if (!changed) return nodes;
  const resolvedCenter = positions.reduce(
    (center, position) => ({
      x: center.x + position.x / positions.length,
      y: center.y + position.y / positions.length,
    }),
    { x: 0, y: 0 },
  );
  positions.forEach((position) => {
    position.x += originalCenter.x - resolvedCenter.x;
    position.y += originalCenter.y - resolvedCenter.y;
  });
  const positionsByIndex = new Map(
    positions.map((position) => [position.index, position]),
  );
  return nodes.map((node, index) => {
    const position = positionsByIndex.get(index);
    if (!position) return node;
    return {
      ...node,
      style: { ...node.style, x: position.x, y: position.y },
    };
  });
};

const portOnSide = (port: string | undefined, side: 'left' | 'right') =>
  port?.replace(/-(?:left|right)$/u, `-${side}`);

export const orientRelationPorts = (
  nodes: NodeData[],
  edges: EdgeData[],
): EdgeData[] => {
  const xByNode = new Map(
    nodes.flatMap((node) => {
      const x = Number(node.style?.x);
      return Number.isFinite(x) ? [[node.id, x] as const] : [];
    }),
  );

  return edges.map((edge) => {
    const sourceX = xByNode.get(edge.source);
    const targetX = xByNode.get(edge.target);
    if (sourceX === undefined || targetX === undefined) return edge;
    const sourceIsLeft = edge.source === edge.target || sourceX <= targetX;
    const sourcePort = portOnSide(
      edge.style?.sourcePort,
      sourceIsLeft ? 'right' : 'left',
    );
    const targetPort = portOnSide(
      edge.style?.targetPort,
      sourceIsLeft ? 'left' : 'right',
    );
    if (
      sourcePort === edge.style?.sourcePort &&
      targetPort === edge.style?.targetPort
    ) {
      return edge;
    }
    return {
      ...edge,
      style: { ...edge.style, sourcePort, targetPort },
    };
  });
};

export const createLayout = (hierarchy: boolean, nodes: NodeData[]) => {
  if (!hierarchy) {
    return {
      type: 'force',
      preventOverlap: true,
      nodeSize: (node: NodeData) => Math.hypot(...layoutNodeSize(node)),
      nodeSpacing: 80,
      collideStrength: 1,
      linkDistance: 360,
      nodeStrength: 1200,
      edgeStrength: 100,
      gravity: 3,
      ...forceIterationOptions(nodes.length),
      damping: 0.82,
      maxSpeed: 100,
      interval: 0.015,
    };
  }

  const sizes = nodes.map(layoutNodeSize);
  const maxWidth = Math.max(...sizes.map(([width]) => width), 300);
  const maxHeight = Math.max(...sizes.map(([, height]) => height), 80);

  return {
    type: 'antv-dagre',
    rankdir: 'LR',
    align: 'UL',
    nodesep: 28,
    ranksep: 96,
    nodeSize: [maxWidth, maxHeight] as [number, number],
  };
};

const downloadDataUrl = (dataUrl: string, filename: string) => {
  const anchor = document.createElement('a');
  anchor.href = dataUrl;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
};

const addImageBackground = (dataUrl: string, background: string) =>
  new Promise<string>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d');
      if (!context) {
        reject(new Error('Unable to create the image export canvas.'));
        return;
      }
      context.fillStyle = background;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    image.onerror = () =>
      reject(new Error('Unable to prepare the graph image.'));
    image.src = dataUrl;
  });

const waitForCanvasPaint = () =>
  new Promise<void>((resolve) =>
    window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => resolve()),
    ),
  );

export class ErdGraphRuntime {
  readonly graph: Graph;

  private operation: Promise<void> = Promise.resolve();
  private disposed = false;
  private height: number;
  private minimapCreated: boolean;
  private minimapEnabled: boolean;
  private hierarchy: boolean;
  private width: number;

  constructor(
    private readonly container: HTMLElement,
    private readonly root: RootInstance,
    nodes: NodeData[],
    edges: EdgeData[],
  ) {
    this.hierarchy = root.sys.dagreLayout;
    this.height = container.clientHeight;
    this.minimapEnabled = root.sys.disableMiniMap;
    this.minimapCreated = this.minimapEnabled;
    this.width = container.clientWidth;

    const options: GraphOptions = {
      animation: false,
      autoResize: false,
      background: 'rgba(0, 0, 0, 0)',
      behaviors: [
        { type: 'drag-canvas', key: 'web-pdm-drag-canvas' },
        {
          type: 'zoom-canvas',
          key: 'web-pdm-zoom-canvas',
          animation: false,
        },
        {
          type: 'drag-element',
          key: 'web-pdm-drag-element',
          animation: false,
          hideEdge: 'none',
        },
      ],
      container,
      data: { nodes, edges },
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      edge: {
        state: {
          active: {
            lineWidth: 2.5,
            opacity: 1,
          },
        },
      },
      layout: nodes.length ? createLayout(this.hierarchy, nodes) : undefined,
      padding: 32,
      plugins: this.createPlugins(this.minimapCreated),
      zoomRange: [0.04, 2.1],
    };

    this.graph = new Graph(options);
    bindGraphEvents(
      this.graph,
      root,
      container,
      () => this.disposed,
      () => this.refreshRelationPorts(),
    );
    this.container.dataset.g6Version = version;
    this.container.dataset.g6Status = 'initializing';
    this.container.dataset.g6Width = String(Math.round(this.width));
    this.container.dataset.g6Height = String(Math.round(this.height));
    this.updateDiagnostics();
  }

  render() {
    return this.enqueue(async () => {
      await this.graph.render();
      await this.settleLayout();
      await this.fitRenderedGraph();
      this.markReady();
    });
  }

  replaceData(
    nodes: NodeData[],
    edges: EdgeData[],
    options: { relayout?: boolean } = {},
  ) {
    return this.enqueue(async () => {
      const relayout = options.relayout ?? true;
      const nextNodes = relayout ? nodes : this.keepNodePositions(nodes);

      this.graph.setData({ nodes: nextNodes, edges });
      if (relayout) {
        this.graph.setLayout(
          nodes.length ? createLayout(this.hierarchy, nodes) : [],
        );
        await this.graph.render();
        await this.settleLayout();
        await this.fitRenderedGraph();
      } else {
        await this.settleLayout(true);
      }
      this.markReady();
    });
  }

  resize(width: number, height: number) {
    if (
      width <= 0 ||
      height <= 0 ||
      this.disposed ||
      this.graph.destroyed ||
      (this.width === width && this.height === height)
    )
      return;
    this.width = width;
    this.height = height;
    return this.enqueue(async () => {
      if (this.width !== width || this.height !== height) return;
      this.graph.resize(width, height);
      if (this.minimapCreated && this.minimapEnabled) {
        await this.graph.draw();
      }
      this.container.dataset.g6Width = String(Math.round(width));
      this.container.dataset.g6Height = String(Math.round(height));
    });
  }

  setLayout(hierarchy: boolean) {
    if (this.hierarchy === hierarchy) return Promise.resolve();
    this.hierarchy = hierarchy;
    return this.enqueue(async () => {
      const nodes = this.graph.getNodeData();
      if (nodes.length === 0) {
        this.updateDiagnostics();
        return;
      }
      this.graph.setLayout(createLayout(hierarchy, nodes));
      await this.graph.layout();
      await this.settleLayout();
      await this.fitRenderedGraph();
      this.container.dataset.g6LastAction = 'set-layout';
      this.markReady();
    });
  }

  setMinimap(enabled: boolean) {
    if (this.minimapEnabled === enabled) return Promise.resolve();
    this.minimapEnabled = enabled;
    return this.enqueue(async () => {
      // G6 5.1.1 的 Minimap 销毁后仍可能执行未取消的延迟渲染，
      // 因此创建后保持实例常驻，仅切换可见性并在重新显示时刷新。
      if (enabled && !this.minimapCreated) {
        this.minimapCreated = true;
        this.graph.setPlugins(this.createPlugins(true));
        await this.graph.render();
      } else if (enabled) {
        await this.graph.draw();
      }
      this.container.dataset.g6LastAction = 'set-minimap';
      this.updateDiagnostics();
    });
  }

  updateTheme() {
    return this.enqueue(async () => {
      if (this.minimapCreated) {
        this.graph.updatePlugin({
          key: MINIMAP_KEY,
          ...this.createMinimapTheme(),
        });
      }
      await this.graph.draw();
      this.markReady();
    });
  }

  zoomIn() {
    return this.enqueue(async () => {
      await this.graph.zoomBy(1.15, false);
      this.syncZoom();
      this.container.dataset.g6LastAction = 'zoom-in';
    });
  }

  zoomOut() {
    return this.enqueue(async () => {
      await this.graph.zoomBy(1 / 1.15, false);
      this.syncZoom();
      this.container.dataset.g6LastAction = 'zoom-out';
    });
  }

  zoomTo(zoom: number) {
    return this.enqueue(async () => {
      await this.graph.zoomTo(zoom, false);
      this.syncZoom();
      this.container.dataset.g6LastAction = 'zoom-to';
    });
  }

  fitView() {
    return this.enqueue(async () => {
      if (this.graph.getNodeData().length > 0) {
        await this.graph.fitView({ direction: 'both', when: 'always' }, false);
        this.syncZoom();
      }
      this.container.dataset.g6LastAction = 'fit-view';
    });
  }

  focusModel(modelId: string) {
    return this.enqueue(async () => {
      const id = `model-${modelId}`;
      if (!this.graph.hasNode(id)) return;
      await this.graph.frontElement(id);
      await this.graph.focusElement(id, false);
      this.syncZoom();
      this.container.dataset.g6LastAction = 'focus-model';
    });
  }

  frontModel(modelId: string) {
    return this.enqueue(async () => {
      const id = `model-${modelId}`;
      if (this.graph.hasNode(id)) await this.graph.frontElement(id);
    });
  }

  getModelConfig(modelId: string): ModelConfig | undefined {
    if (this.disposed || this.graph.destroyed) return undefined;
    const id = `model-${modelId}`;
    if (!this.graph.hasNode(id)) return undefined;
    return this.graph.getNodeData(id).data?.modelConfig as
      ModelConfig | undefined;
  }

  highlightModel(modelId: string) {
    return this.enqueue(async () => {
      const id = `model-${modelId}`;
      const states: Record<string, string[]> = {};
      this.graph.getEdgeData().forEach((edge) => {
        if (!edge.id || edge.data?.isSystem) return;
        states[edge.id] =
          edge.source === id || edge.target === id ? ['active'] : [];
      });
      if (Object.keys(states).length) await this.graph.setElementState(states);
    });
  }

  exportImage(filename: string) {
    return this.enqueue(async () => {
      const originalNodes = this.graph.getNodeData();
      const restoreNodes = originalNodes.map((node) => ({
        id: node.id,
        style: { ...node.style },
      }));
      const expandedNodes = originalNodes.map((node) => {
        const style = node.style as unknown as ErdNodeStyle;
        return {
          id: node.id,
          style: {
            ...node.style,
            compact: 0,
            size: getErdNodeSize({ compact: 0, erd: style.erd }),
          },
        } satisfies NodeData;
      });

      this.container.dataset.g6ExportStatus = 'exporting';
      try {
        this.graph.updateNodeData(expandedNodes);
        await this.graph.draw();
        const graphDataUrl = await this.graph.toDataURL({
          encoderOptions: 1,
          mode: originalNodes.length ? 'overall' : 'viewport',
          type: 'image/png',
        });
        const dataUrl = await addImageBackground(
          graphDataUrl,
          this.root.Ui.palette.canvas,
        );
        downloadDataUrl(dataUrl, `${filename}.png`);
        this.container.dataset.g6LastAction = 'export-image';
      } finally {
        try {
          this.graph.updateNodeData(restoreNodes);
          await this.graph.draw();
          this.updateDiagnostics();
        } finally {
          this.container.dataset.g6ExportStatus = 'complete';
        }
      }
    });
  }

  destroy() {
    if (this.disposed) return;
    this.disposed = true;
    this.container.dataset.g6Status = 'destroyed';

    // G6 5 的 render/layout 都是异步操作。等当前操作自然结束后再销毁，
    // 避免路由切换时 Graph 内部仍在读取已经释放的 model。
    void this.operation
      .then(
        () =>
          new Promise((resolve) =>
            window.setTimeout(resolve, MINIMAP_RENDER_DELAY + 32),
          ),
      )
      .then(() => {
        if (!this.graph.destroyed) this.graph.destroy();
      });
  }

  private createPlugins(minimapEnabled: boolean): PluginOptions {
    const plugins: PluginOptions = [
      {
        type: 'tooltip',
        key: TOOLTIP_KEY,
        trigger: 'hover',
        enable: (event) => event.targetType === 'edge',
        getContent: async (_event, items) =>
          String(items[0]?.data?.tooltip ?? ''),
        onOpenChange: () => undefined,
      },
    ];

    if (minimapEnabled) {
      plugins.push({
        type: 'minimap',
        key: MINIMAP_KEY,
        shape: 'key',
        position: 'right-bottom',
        size: [220, 132],
        className: 'web-pdm-minimap',
        delay: MINIMAP_RENDER_DELAY,
        filter: (id) => id !== 'model-SYS-CENTER-POINT',
        ...this.createMinimapTheme(),
      });
    }

    return plugins;
  }

  private createMinimapTheme() {
    const palette = this.root.Ui.palette;
    return {
      containerStyle: {
        background: palette.surface,
        border: `1px solid ${palette.border}`,
        borderRadius: '6px',
      },
      maskStyle: {
        background: palette.minimap,
        border: `1px solid ${palette.borderStrong}`,
      },
    };
  }

  private async fitRenderedGraph() {
    if (this.graph.getNodeData().length === 0) {
      this.syncZoom();
      return;
    }

    // G6 的自定义节点包围盒会在绘制后的下一帧稳定。等待后再适配可确保
    // 初始视图使用最终 ER 卡片尺寸，而不是布局阶段的碰撞代理尺寸。
    await waitForCanvasPaint();
    await this.graph.fitView({ direction: 'both', when: 'always' }, false);
    this.syncZoom();
  }

  private async settleLayout(drawWhenUnchanged = false) {
    const nodes = this.graph.getNodeData();
    const resolved = this.hierarchy ? nodes : resolveNodeOverlaps(nodes);
    const nodeUpdates = resolved.flatMap((node, index) => {
      const previous = nodes[index];
      if (
        node.style?.x === previous.style?.x &&
        node.style?.y === previous.style?.y
      )
        return [];
      return [
        {
          id: node.id,
          style: { x: node.style?.x, y: node.style?.y },
        },
      ];
    });
    if (nodeUpdates.length > 0) this.graph.updateNodeData(nodeUpdates);

    const edges = this.graph.getEdgeData();
    const edgeUpdates = orientRelationPorts(resolved, edges).filter(
      (edge, index) => edge !== edges[index] && edge.id,
    );
    if (edgeUpdates.length > 0) this.graph.updateEdgeData(edgeUpdates);

    if (drawWhenUnchanged || nodeUpdates.length > 0 || edgeUpdates.length > 0) {
      await this.graph.draw();
    }
  }

  private refreshRelationPorts() {
    return this.enqueue(async () => {
      const nodes = this.graph.getNodeData();
      const edges = this.graph.getEdgeData();
      const updates = orientRelationPorts(nodes, edges).filter(
        (edge, index) => edge !== edges[index] && edge.id,
      );
      if (updates.length === 0) return;
      this.graph.updateEdgeData(updates);
      await this.graph.draw();
    });
  }

  private keepNodePositions(nodes: NodeData[]): NodeData[] {
    const positions = new Map(
      this.graph
        .getNodeData()
        .map((node) => [node.id, { x: node.style?.x, y: node.style?.y }]),
    );

    return nodes.map((node) => {
      const position = positions.get(node.id);
      if (position?.x === undefined || position.y === undefined) return node;
      return {
        ...node,
        style: { ...node.style, x: position.x, y: position.y },
      };
    });
  }

  private enqueue(operation: () => Promise<void>) {
    const next = this.operation.then(async () => {
      if (this.disposed || this.graph.destroyed) return;
      await operation();
    });
    this.operation = next.catch((error) => {
      if (this.disposed || this.graph.destroyed) return;
      this.container.dataset.g6Status = 'error';
      this.container.dataset.g6Error =
        error instanceof Error ? error.message : String(error);
      console.error('[web-pdm] G6 operation failed', error);
    });
    return this.operation;
  }

  private markReady() {
    if (this.disposed || this.graph.destroyed) return;
    this.container.dataset.g6Status = 'ready';
    delete this.container.dataset.g6Error;
    this.updateDiagnostics();
    this.container.dispatchEvent(
      new CustomEvent('web-pdm:graph-ready', {
        detail: this.getDiagnostics(),
      }),
    );
  }

  private syncZoom() {
    if (this.disposed || this.graph.destroyed) return;
    const zoom = this.graph.getZoom();
    this.root.graph.setZoom(zoom);
    this.container.dataset.g6Zoom = zoom.toFixed(4);
  }

  private getDiagnostics() {
    if (this.disposed || this.graph.destroyed) {
      return {
        compactNodeCount: 0,
        edgeCount: 0,
        layout: this.hierarchy ? 'antv-dagre' : 'force',
        minimap: this.minimapEnabled,
        nodeCount: 0,
        zoom: 1,
      };
    }
    const nodes = this.graph
      .getNodeData()
      .filter((node) => !node.data?.isSystem);
    const edges = this.graph
      .getEdgeData()
      .filter((edge) => !edge.data?.isSystem);
    return {
      compactNodeCount: nodes.filter(
        (node) => Number(node.style?.compact ?? 0) > 0,
      ).length,
      edgeCount: edges.length,
      layout: this.hierarchy ? 'antv-dagre' : 'force',
      minimap: this.minimapEnabled,
      nodeCount: nodes.length,
      zoom: this.graph.rendered ? this.graph.getZoom() : 1,
    };
  }

  private updateDiagnostics() {
    if (this.disposed || this.graph.destroyed) return;
    const diagnostics = this.getDiagnostics();
    this.container.dataset.g6NodeCount = String(diagnostics.nodeCount);
    this.container.dataset.g6EdgeCount = String(diagnostics.edgeCount);
    this.container.dataset.g6CompactNodeCount = String(
      diagnostics.compactNodeCount,
    );
    this.container.dataset.g6Layout = diagnostics.layout;
    this.container.dataset.g6Minimap = String(diagnostics.minimap);
    this.container.dataset.g6Zoom = diagnostics.zoom.toFixed(4);
  }
}
