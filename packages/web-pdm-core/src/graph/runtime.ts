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

const layoutNodeSize = (node: NodeData) => {
  const style = node.style as unknown as ErdNodeStyle;
  return getErdNodeSize({ compact: 0, erd: style.erd });
};

const createLayout = (hierarchy: boolean, nodes: NodeData[]) => {
  const sizes = nodes.map(layoutNodeSize);
  const maxWidth = Math.max(...sizes.map(([width]) => width), 300);
  const maxHeight = Math.max(...sizes.map(([, height]) => height), 80);

  return hierarchy
    ? {
        type: 'antv-dagre',
        rankdir: 'LR',
        align: 'UL',
        nodesep: 28,
        ranksep: 96,
        nodeSize: [maxWidth, maxHeight] as [number, number],
      }
    : {
        type: 'force',
        preventOverlap: true,
        nodeSize: Math.max(maxWidth, maxHeight),
        nodeSpacing: 32,
        linkDistance: 380,
        nodeStrength: 900,
        edgeStrength: 180,
        gravity: 8,
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
    bindGraphEvents(this.graph, root, container, () => this.disposed);
    this.container.dataset.g6Version = version;
    this.container.dataset.g6Status = 'initializing';
    this.container.dataset.g6Width = String(Math.round(this.width));
    this.container.dataset.g6Height = String(Math.round(this.height));
    this.updateDiagnostics();
  }

  render() {
    return this.enqueue(async () => {
      await this.graph.render();
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
        await this.fitRenderedGraph();
      } else {
        await this.graph.draw();
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
