import React, { useEffect, useRef, useCallback } from 'react';
import G6 from '@antv/g6/dist/g6.min.js';
import { withoutUndo } from 'mobx-keystone';
import { useSize } from 'ahooks';
import { useMst } from "../context";
import register from "./item";
import { observer } from 'mobx-react';
import ToolBar from "../components/model-toolbar";
import "./model.scss";
import GraphEvent from "./event";
import { initStyle } from "./item/style";
import { useUpdateItem } from "./hooks";
// import { debounce } from 'lodash'
// import mst from 'test/mst'

export default observer(function () {
  // const mst = useMst()
  var _useLocal = useLocal(),
    setRef = _useLocal.setRef,
    erdGraph = _useLocal.erdGraph,
    containerRef = _useLocal.containerRef;
  // const size = useSize(containerRef);

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ToolBar, {
    graph: erdGraph
  }), /*#__PURE__*/React.createElement("div", {
    ref: setRef,
    className: "graph"
  }));
});
var useLocal = function useLocal() {
  var mst = useMst();
  // window.kkk = mst

  var containerRef = useRef(null);
  var erdGraphRef = useRef(null);
  var miniMapRef = useRef(null);
  useEffect(function () {
    register(mst);
  }, []);
  var checkRef = useRef(+new Date());
  var size = useSize(containerRef) || {};
  useEffect(function () {
    // alert()
    // const { Nodes , edges } = mst
    if (!erdGraphRef.current) {
      //  alert(mst.Nodes.length)
      // alert(mst === window.kkk)
      //alert('erdGraphRef.current = render')
      var Obj = render(containerRef.current, mst.Nodes, mst.edges, mst);
      erdGraphRef.current = Obj.graph;
      miniMapRef.current = Obj.miniMap;
      //alert('erdGraphRef.current')
      //  alert(mst.graph.$modelId)
      async(function () {
        mst.graph.setG6Graph(erdGraphRef.current);
        // layout(erdGraphRef.current,  Nodes , edges, mst)
      });

      //  window.kkk1 = mst
    } else {
      //alert('  layout(erdGraphRef.current,  mst.Nodes ' + mst.Nodes.length)
      layout(erdGraphRef.current, mst.Nodes, mst.edges, mst);
      // erdGraphRef.current.fitView(0)
    }
  }, [JSON.stringify(mst.sys.checkedKeys), mst]);
  useEffect(function () {
    if (erdGraphRef.current && size.width && size.height) {
      // alert(erdGraphRef.current['isLayouting'])
      if (!erdGraphRef.current['isLayouting']) {
        var documentHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var height = mst.sys.height === '100%' ? documentHeight - 45 : mst.sys.height - 45;
        erdGraphRef.current.changeSize(size.width, height);
        erdGraphRef.current.fitView(0);
      }
    }
  }, [size.height, size.width]);
  var setRef = useCallback(function (ref) {
    containerRef.current = ref;
  }, [containerRef]);
  useEffect(function () {
    // debounce(()=> {
    var graph = erdGraphRef.current;
    if (graph) {
      var gwidth = graph.get('width');
      var gheight = graph.get('height');
      var point = graph.getCanvasByPoint(gwidth / 2, gheight / 2);
      graph.zoomTo(mst.graph.zoom, point);
    }
    // }
    //  }, 100)()
  }, [mst.graph.zoom]);
  var reloadRef = useRef(false);
  useEffect(function () {
    // debounce(()=> {
    var graph = erdGraphRef.current;
    if (graph) {
      if (!reloadRef.current) {
        reloadRef.current = true;
        return;
      }
      // alert()
      // graph.clear()
      // graph.data({ nodes: mst.Nodes, edges: mst.edges })
      // graph.render()
      var isLargar = graph.getNodes().length > 50;
      graph.updateLayout({
        type: mst.sys.dagreLayout ? 'dagre' : 'fruchterman',
        // condense: true,
        // cols: 3,
        workerEnabled: true,
        linkDistance: 0,
        pixelRatio: 2,
        // alphaDecay: isLargar ? 0.3 : 0.15,
        // preventOverlap: true,
        // clustering: true,
        clusterGravity: 100,
        speed: 2,
        gravity: 100,
        gpuEnabled: true,
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
        onLayoutEnd: function onLayoutEnd() {
          async(function () {
            // alert()
            graph['isLayouting'] = false;
            // graph['isLayouting'] = false
            // alert('endlayout')
            graph.fitView(0);
            withoutUndo(function () {
              mst.graph.setZoom(graph.getZoom());
            });

            // alert('onLayoutEnd')
          }, 1000);
        }
      });
      if (mst.sys.dagreLayout) {
        async(function () {
          // alert()
          graph.fitView(0);
        }, 1000);
      }
    }
  }, [mst.sys.dagreLayout]);

  //  alert('useUpdateItem' + mst.graph.zoom)
  useUpdateItem({
    currentModel: mst.sys.currentModel,
    graph: erdGraphRef.current,
    showNameOrLabel: mst.sys.showNameOrLabel,
    zoom: mst.graph.zoom,
    checkNum: checkRef.current,
    themeColor: mst.Ui.themeColor,
    darkness: mst.Ui.darkness
  });
  useEffect(function () {
    if (erdGraphRef.current && miniMapRef.current) {
      // alert()
      if (!mst.sys.disableMiniMap) {
        var _erdGraphRef$current;
        (_erdGraphRef$current = erdGraphRef.current) === null || _erdGraphRef$current === void 0 ? void 0 : _erdGraphRef$current.removePlugin(miniMapRef.current);
      } else {
        var _erdGraphRef$current2;
        var miniMap = new G6.Minimap({
          type: 'delegate',
          viewportClassName: 'g6-minimap-viewport-erd',
          delegateStyle: {
            fill: 'rgba(0,0,0,0.10)'
          }
        });
        miniMapRef.current = miniMap;
        (_erdGraphRef$current2 = erdGraphRef.current) === null || _erdGraphRef$current2 === void 0 ? void 0 : _erdGraphRef$current2.addPlugin(miniMap);
      }
    }
  }, [mst.sys.disableMiniMap]);
  return {
    containerRef: containerRef,
    setRef: setRef,
    erdGraph: erdGraphRef.current
  };
};

// const MINZOOM = 0.01
// const toolbar = new G6.ToolBar();
// const edgeBundling = new G6.Bundling({
//   bundleThreshold: 0.6,
//   K: 100,
// });
var render = function render(container, nodes, edges, mst) {
  var documentHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  var height = mst.sys.height === '100%' ? documentHeight - 45 : mst.sys.height - 45;
  // const height = mst.sys.height
  // alert(height)
  // alert(height)
  var styleConfig = initStyle({
    primaryColor: mst.Ui.themeColor
  }).style;
  var isLargar = nodes.length > 50;
  // alert(isLargar)
  var miniMap = new G6.Minimap({
    type: 'delegate',
    viewportClassName: 'g6-minimap-viewport-erd',
    delegateStyle: {
      fill: 'rgba(0,0,0,0.10)'
    }
  });
  var graph = new G6.Graph({
    height: height,
    width: container.offsetWidth - 20,
    container: container,
    fitView: true,
    // workerEnabled: true,
    fitCenter: true,
    enabledStack: true,
    animate: true,
    gpuEnabled: true,
    pixelRatio: 2,
    // pixelRatio: 1,
    // animate: true,
    defaultEdge: styleConfig.default.edge,
    edgeStateStyles: {
      default: styleConfig.default.edge,
      active: {
        opacity: 1,
        size: 3
      }
    },
    minZoom: 0.01,
    maxZoom: 1.1,
    layout: {
      type: mst.sys.dagreLayout ? 'dagre' : 'force',
      condense: true,
      cols: 3,
      // gpuEnabled: true,
      workerEnabled: true,
      // workerScriptURL:'',
      linkDistance: 0,
      alphaDecay: isLargar ? 0.3 : undefined,
      preventOverlap: true,
      // collideStrength: 0.5,
      nodeSpacing: isLargar ? -100 : -180,
      onLayoutEnd: function onLayoutEnd() {
        graph['isLayouting'] = false;
        graph['endLayout'] = true;
        graph.fitView(0);
        graph['endLayout'] = false;
        withoutUndo(function () {
          mst.graph.setZoom(graph.getZoom());
        });
      }
    },
    modes: {
      default: ['drag-canvas', {
        type: 'zoom-canvas',
        minZoom: 0.0001,
        // enableOptimize: true,
        // optimizeZoom: true,
        maxZoom: 2.1
        // enableOptimize: true,
      }, {
        type: 'drag-node'
        // enableDelegate: true,
      }, {
        type: 'edge-tooltip',
        formatText: function formatText(model) {
          return model.tooltip;
        },
        offset: 10
      }
      // {
      //   type: 'activate-relations',
      //   resetSelected: true,
      //   trigger: 'click'
      // },
      ]
    },

    plugins: [
      // toolbar,
      // ...[mst.sys.disableMiniMap ? [] : [miniMap]]
    ]
  });
  // alert(mst === window.kkk)
  GraphEvent(graph, mst);
  // miniMap.init
  // const x = nodes[0].x
  // edgeBundling.bundling({ nodes, edges });
  graph.data({
    nodes: nodes,
    edges: edges
  });
  graph['isLayouting'] = true;
  graph.render();
  graph.fitView(0);
  if (mst.sys.dagreLayout) {
    async(function () {
      // alert()
      graph.fitView(0);
      withoutUndo(function () {
        mst.graph.setZoom(graph.getZoom());
      });
    });
  }
  // layout(graph, nodes)
  return {
    graph: graph,
    miniMap: miniMap
  };
};
var layout = function layout(graph, nodes, edges, mst) {
  // graph.clear()
  graph.changeData({
    nodes: nodes,
    edges: edges
  });

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
var async = function async(fun) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  setTimeout(fun, time);
};