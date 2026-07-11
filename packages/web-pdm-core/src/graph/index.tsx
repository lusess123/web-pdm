import { useSize } from 'ahooks';
import { withoutUndo } from 'mobx-keystone';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ToolBar from '../components/model-toolbar';
import { useMst } from '../context';
import type { WebPdmPalette } from '../theme';
import { RootInstance } from '../type';
import GraphEvent from './event';
import G6, { type Graph } from './g6';
import { useUpdateItem } from './hooks';
import register from './item';
import { initStyle } from './item/style';
import './model.scss';
// import mst from 'test/mst'

const createMiniMap = (palette: WebPdmPalette) =>
  new G6.Minimap({
    type: 'delegate',
    viewportClassName: 'g6-minimap-viewport-erd',
    delegateStyle: {
      fill: palette.minimap,
      stroke: palette.borderStrong,
    },
  });

export default observer(() => {
  const { setRef, erdGraph } = useLocal();

  return (
    <>
      <ToolBar graph={erdGraph} />
      <div ref={setRef} className="graph" />
    </>
  );
});

const useLocal = () => {
  const mst = useMst();

  const containerRef = useRef(null);
  const erdGraphRef = useRef<Graph>(null);
  const miniMapRef = useRef<any>(null);
  const [erdGraph, setErdGraph] = useState<Graph | null>(null);
  const checkedKeys = mst.sys.checkedKeys.join('|');

  useEffect(() => {
    register();
    return () => {
      erdGraphRef.current?.destroy();
      erdGraphRef.current = null;
    };
  }, []);

  const size = useSize(containerRef) || {};

  useEffect(() => {
    const container = containerRef.current;
    const nodes = mst.Nodes;
    const edges = mst.edges;
    if (!container) return;

    if (!erdGraphRef.current) {
      const result = render(container, nodes, edges, mst);
      erdGraphRef.current = result.graph;
      miniMapRef.current = result.miniMap;
      mst.graph.setG6Graph(result.graph);
      setErdGraph(result.graph);
    } else {
      layout(erdGraphRef.current, nodes, edges, mst);
    }
  }, [checkedKeys, mst, mst.sys.intl]);

  useEffect(() => {
    if (erdGraphRef.current && size.width && size.height) {
      if (!erdGraphRef.current['isLayouting']) {
        erdGraphRef.current.changeSize(size.width, size.height);
        erdGraphRef.current.fitView(0);
      }
    }
  }, [size.height, size.width]);
  const setRef = useCallback(
    (ref) => {
      containerRef.current = ref;
    },
    [containerRef],
  );
  useEffect(() => {
    // debounce(()=> {
    const graph = erdGraphRef.current;
    if (graph) {
      const gwidth = graph.get('width');
      const gheight = graph.get('height');
      const point = graph.getCanvasByPoint(gwidth / 2, gheight / 2);

      graph.zoomTo(mst.graph.zoom, point);
    }
    // }
    //  }, 100)()
  }, [mst.graph.zoom]);
  const reloadRef = useRef(false);
  useEffect(() => {
    // debounce(()=> {
    const graph = erdGraphRef.current;
    if (graph) {
      if (!reloadRef.current) {
        reloadRef.current = true;
        return;
      }
      // alert()
      // graph.clear()
      // graph.data({ nodes: mst.Nodes, edges: mst.edges })
      // graph.render()
      const isLargar = graph.getNodes().length > 50;
      graph.updateLayout({
        type: mst.sys.dagreLayout ? 'dagre' : 'fruchterman',
        // condense: true,
        // cols: 3,
        workerEnabled: isLargar,
        linkDistance: 0,
        // alphaDecay: isLargar ? 0.3 : 0.15,
        // preventOverlap: true,
        // clustering: true,
        clusterGravity: 100,
        speed: 2,
        gravity: 100,
        // collideStrength: 0.5,
        //   type: 'dagre',
        //   // controlPoints: true,
        //   // nodeSize: [40, 20],
        // nodesep: 1,
        // ranksep: 1,
        // align: 'DL',
        // nodesep: 100, // 节点水平间距(px)
        // ranksep: 200, // 每一层节点之间间距

        // nodeSpacing: isLargar ? -100 : -180,
        onLayoutEnd: () => {
          async(() => {
            // alert()
            graph['isLayouting'] = false;
            // graph['isLayouting'] = false
            // alert('endlayout')
            graph.fitView(0);

            withoutUndo(() => {
              mst.graph.setZoom(graph.getZoom());
            });

            // alert('onLayoutEnd')
          }, 1000);
        },
      });
      if (mst.sys.dagreLayout) {
        async(() => {
          // alert()
          graph.fitView(0);
        }, 1000);
      }
    }
  }, [mst.sys.dagreLayout]);

  useUpdateItem({
    currentModel: mst.sys.currentModel,
    graph: erdGraph as any,
    showNameOrLabel: mst.sys.showNameOrLabel,
    zoom: mst.graph.zoom,
    themeColor: mst.Ui.themeColor,
    darkness: mst.Ui.darkness,
  });

  useEffect(() => {
    const graph = erdGraphRef.current;
    if (!graph) return;

    if (miniMapRef.current) graph.removePlugin(miniMapRef.current);
    const miniMap = createMiniMap(mst.Ui.palette);
    miniMapRef.current = miniMap;
    if (mst.sys.disableMiniMap) graph.addPlugin(miniMap);
  }, [erdGraph, mst.sys.disableMiniMap, mst.Ui.darkness, mst.Ui.themeColor]);

  useEffect(() => {
    const graph = erdGraphRef.current;
    if (!graph) return;
    const palette = mst.Ui.palette;

    graph.getEdges().forEach((edge: any) => {
      const model: any = edge.getModel();
      if (model.isSys) return;
      graph.updateItem(edge, {
        labelCfg: {
          ...model.labelCfg,
          style: {
            ...model.labelCfg?.style,
            fill: palette.fieldText,
            lineWidth: 6,
            stroke: palette.edgeLabelHalo,
          },
        },
        style: {
          ...model.style,
          stroke: palette.accent,
          endArrow: {
            ...model.style?.endArrow,
            fill: palette.accent,
            stroke: palette.accent,
          },
          startArrow: {
            ...model.style?.startArrow,
            fill: palette.accent,
            stroke: palette.accent,
          },
        },
      });
    });
    graph.paint();
  }, [erdGraph, mst.Ui.darkness, mst.Ui.themeColor]);

  return {
    setRef,
    erdGraph,
  };
};

// const MINZOOM = 0.01
// const toolbar = new G6.ToolBar();
// const edgeBundling = new G6.Bundling({
//   bundleThreshold: 0.6,
//   K: 100,
// });
const render = (container: any, nodes: any, edges: any, mst: RootInstance) => {
  const width = Math.max(container.clientWidth, 1);
  const height = Math.max(container.clientHeight, 1);
  const { palette, style: styleConfig } = initStyle({
    primaryColor: mst.Ui.themeColor,
    darkness: mst.Ui.darkness,
  });
  const isLargar = nodes.length > 50;
  // alert(isLargar)
  const miniMap = createMiniMap(palette);
  const graph = new G6.Graph({
    height,
    width,
    container,
    fitView: true,
    // workerEnabled: true,
    fitCenter: true,
    enabledStack: true,
    animate: true,
    pixelRatio: 2,
    // pixelRatio: 1,
    // animate: true,
    defaultEdge: styleConfig.default.edge,
    edgeStateStyles: {
      default: styleConfig.default.edge,
      active: {
        opacity: 1,
        size: 3,
      },
    },

    minZoom: 0.01,
    maxZoom: 2.1,
    layout: {
      type: mst.sys.dagreLayout ? 'dagre' : 'force',
      condense: true,
      cols: 3,
      // gpuEnabled: true,
      workerEnabled: isLargar,
      // workerScriptURL:'',
      linkDistance: 0,
      alphaDecay: isLargar ? 0.3 : undefined,

      preventOverlap: true,
      // collideStrength: 0.5,
      nodeSpacing: isLargar ? -100 : -180,
      onLayoutEnd: () => {
        graph['isLayouting'] = false;
        graph['endLayout'] = true;
        graph.fitView(0);
        graph['endLayout'] = false;
        withoutUndo(() => {
          mst.graph.setZoom(graph.getZoom());
        });
      },
    },

    modes: {
      default: [
        'drag-canvas',
        {
          type: 'zoom-canvas',
          minZoom: 0.0001,
          // enableOptimize: true,
          // optimizeZoom: true,
          maxZoom: 2.1,
          // enableOptimize: true,
        },
        {
          type: 'drag-node',
          // enableDelegate: true,
        },
        {
          type: 'edge-tooltip',
          formatText: (model) => {
            return model.tooltip as string;
          },
          offset: 10,
        },
        // {
        //   type: 'activate-relations',
        //   resetSelected: true,
        //   trigger: 'click'
        // },
      ],
    },
    plugins: [
      // toolbar,
      // ...[mst.sys.disableMiniMap ? [] : [miniMap]]
    ],
  });
  // alert(mst === window.kkk)
  GraphEvent(graph, mst);
  // miniMap.init
  // const x = nodes[0].x
  // edgeBundling.bundling({ nodes, edges });
  graph.data({ nodes, edges });
  graph['isLayouting'] = true;
  graph.render();
  graph.fitView(0);
  if (mst.sys.dagreLayout) {
    async(() => {
      // alert()
      graph.fitView(0);
      withoutUndo(() => {
        mst.graph.setZoom(graph.getZoom());
      });
    });
  }
  // layout(graph, nodes)
  return { graph, miniMap };
};

const layout = (graph: Graph, nodes: any, edges, mst: RootInstance) => {
  // graph.clear()
  graph.changeData({ nodes, edges });

  // graph.getNodes().filter((a) => !a.isSys).forEach((node: any) => {
  //   // node.x = undefined
  //   // node.y = undefined
  //   const model = node.getModel()
  //   if (!model.visible) {
  //     // node.getContainer().hide()
  //     graph.hideItem(node)
  //     // return
  //   }
  // })

  // const _edges = graph.getEdges()
  // _edges.forEach((edge: any) => {
  //   let sourceNode = edge.get('sourceNode')
  //   let targetNode = edge.get('targetNode')
  //   const targetModel = targetNode.getModel()
  //   if (!targetModel.visible || !sourceNode.getModel().visible) {
  //     edge.hide()
  //     // return
  //   }
  // })

  // alert(graph.getNodes().length)
  // const isLargar = graph.getNodes().length > 50
  // // alert(isLargar)
  // graph.isLayouting = true
  // async(() => graph.updateLayout({

  //   type: 'force',
  //   condense: true,
  //   // cols: 3,
  //   workerEnabled: true,
  //   linkDistance: 0,
  //   alphaDecay: isLargar ? 0.1 : 0.3,
  //   // preventOverlap: false,
  //   // collideStrength: 0.5,
  //   // nodeSpacing: -1000,
  //   onLayoutEnd: () => {
  //     graph.isLayouting = false
  //     // graph.fitView(0)
  //     alert()
  //     // mst.graph.setZoom(graph.getZoom())
  //   }

  // }))

  // graph.fitView(0)

  return graph;
};

const async = (fun, time = 500) => {
  setTimeout(fun, time);
};
