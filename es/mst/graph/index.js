import React, { useEffect, useRef, useCallback } from 'react';
import G6 from '@antv/g6';
import { useMst } from '../context';
import register from './item';
import { observer } from 'mobx-react-lite';
import ToolBar from '../components/model-toolbar';
import './model.scss';
import GraphEvent from './event';
import { initStyle } from './item/style';
import { useUpdateItem } from './hooks';
// import mst from 'test/mst'
export default observer(function () {
  var _useLocal = useLocal(),
      setRef = _useLocal.setRef,
      erdGraph = _useLocal.erdGraph;

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ToolBar, {
    graph: erdGraph
  }), /*#__PURE__*/React.createElement("div", {
    ref: setRef,
    className: "graph"
  }));
});

var useLocal = function useLocal() {
  var mst = useMst(); // window.kkk = mst

  var containerRef = useRef(null);
  var erdGraphRef = useRef(null);
  useEffect(function () {
    register();
  }, []);
  useEffect(function () {
    // alert()
    var Nodes = mst.Nodes,
        edges = mst.edges;

    if (!erdGraphRef.current) {
      //  alert(mst.Nodes.length)
      // alert(mst === window.kkk)
      erdGraphRef.current = render(containerRef.current, mst.Nodes, mst.edges, mst); //  alert(mst.graph.$modelId)

      async(function () {
        mst.graph.setG6Graph(erdGraphRef.current); // layout(erdGraphRef.current,  Nodes , edges, mst)
      }); //  window.kkk1 = mst
    } else {
      // alert(mst.Nodes.length)
      layout(erdGraphRef.current, Nodes, edges, mst);
      erdGraphRef.current.fitView(0);
    }
  }, [mst.sys.checkedKeys, mst]);
  var setRef = useCallback(function (ref) {
    containerRef.current = ref;
  }, [containerRef]); // useEffect(() => {
  //   const graph = erdGraphRef.current
  //   if(graph) {
  //     const gwidth = graph.get('width')
  //     const gheight = graph.get('height')
  //     const point = graph.getCanvasByPoint(gwidth / 2, gheight / 2)
  //     graph.zoomTo(mst.graph.zoom, point)
  //   }
  // } , [mst.graph.zoom])

  useUpdateItem({
    currentModel: mst.sys.currentModel,
    graph: erdGraphRef.current,
    showNameOrLabel: mst.sys.showNameOrLabel,
    zoom: mst.graph.zoom
  });
  return {
    containerRef: containerRef,
    setRef: setRef,
    erdGraph: erdGraphRef.current
  };
}; // const MINZOOM = 0.01
// const toolbar = new G6.ToolBar();
// const edgeBundling = new G6.Bundling({
//   bundleThreshold: 0.6,
//   K: 100,
// });


var render = function render(container, nodes, edges, mst) {
  var height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 45; // alert(height)

  var styleConfig = initStyle({
    primaryColor: 'blue'
  }).style;
  var graph = new G6.Graph({
    height: height,
    width: container.offsetWidth - 20,
    container: container,
    fitView: true,
    fitCenter: true,
    enabledStack: true,
    animate: true,
    // animate: true,
    defaultEdge: styleConfig.default.edge,
    edgeStateStyles: {
      default: styleConfig.default.edge,
      active: {
        opacity: 1,
        size: 3
      }
    },
    minZoom: 0.001,
    maxZoom: 1.1,
    layout: {
      type: 'force',
      condense: true,
      cols: 3,
      workerEnabled: true,
      linkDistance: 0,
      alphaDecay: 0.2,
      preventOverlap: true,
      collideStrength: 0.5,
      nodeSpacing: -180,
      onLayoutEnd: function onLayoutEnd() {
        graph.isLayouting = false;
        graph.fitView(0); // alert()

        mst.graph.setZoom(graph.getZoom());
      }
    },
    modes: {
      default: ['drag-canvas', {
        type: 'zoom-canvas',
        minZoom: 0.0001,
        // enableOptimize: true,
        // optimizeZoom: true,
        maxZoom: 2.1 // enableOptimize: true,

      }, {
        type: 'drag-node' // enableDelegate: true,

      }, {
        type: 'edge-tooltip',
        formatText: function formatText(model) {
          return model.tooltip;
        },
        offset: 10
      } // {
      //   type: 'activate-relations',
      //   resetSelected: true,
      //   trigger: 'click'
      // },
      ]
    },
    plugins: [// toolbar,
    new G6.Minimap({
      type: 'delegate',
      viewportClassName: 'g6-minimap-viewport-erd',
      delegateStyle: {
        fill: 'rgba(0,0,0,0.10)'
      }
    })]
  }); // alert(mst === window.kkk)

  GraphEvent(graph, mst); // const x = nodes[0].x
  // edgeBundling.bundling({ nodes, edges });

  graph.data({
    nodes: nodes,
    edges: edges
  });
  graph.isLayouting = true;
  graph.render(); // layout(graph, nodes)

  return graph;
};

var layout = function layout(graph, nodes, edges, mst) {
  // graph.clear()
  graph.changeData({
    nodes: nodes,
    edges: edges
  }); // graph.getNodes().filter((a) => !a.isSys).forEach((node: any) => {
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

  graph.isLayouting = true;
  async(function () {
    return graph.updateLayout({
      type: 'force',
      condense: true,
      cols: 3,
      workerEnabled: true,
      linkDistance: 0,
      alphaDecay: 0.2,
      preventOverlap: true,
      collideStrength: 0.5,
      nodeSpacing: -180,
      onLayoutEnd: function onLayoutEnd() {
        graph.isLayouting = false;
        graph.fitView(0); // alert()

        mst.graph.setZoom(graph.getZoom());
      }
    });
  }); // graph.fitView(0)

  return graph;
};

var async = function async(fun) {
  setTimeout(fun, 500);
};