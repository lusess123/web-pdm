var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/graph/index.tsx
var graph_exports = {};
__export(graph_exports, {
  default: () => graph_default
});
module.exports = __toCommonJS(graph_exports);
var import_react = __toESM(require("react"));
var import_g6_min = __toESM(require("@antv/g6/dist/g6.min.js"));
var import_mobx_keystone = require("mobx-keystone");
var import_ahooks = require("ahooks");
var import_context = require("../context");
var import_item = __toESM(require("./item"));
var import_mobx_react = require("mobx-react");
var import_model_toolbar = __toESM(require("../components/model-toolbar"));
var import_model = require("./model.scss");
var import_event = __toESM(require("./event"));
var import_style = require("./item/style");
var import_hooks = require("./hooks");
var graph_default = (0, import_mobx_react.observer)(() => {
  const { setRef, erdGraph, containerRef } = useLocal();
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_model_toolbar.default, { graph: erdGraph }), /* @__PURE__ */ import_react.default.createElement("div", { ref: setRef, className: "graph" }));
});
var useLocal = () => {
  const mst = (0, import_context.useMst)();
  const containerRef = (0, import_react.useRef)(null);
  const erdGraphRef = (0, import_react.useRef)(null);
  const miniMapRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    (0, import_item.default)(mst);
  }, []);
  const checkRef = (0, import_react.useRef)(+new Date());
  const size = (0, import_ahooks.useSize)(containerRef) || {};
  (0, import_react.useEffect)(() => {
    if (!erdGraphRef.current) {
      const Obj = render(containerRef.current, mst.Nodes, mst.edges, mst);
      erdGraphRef.current = Obj.graph;
      miniMapRef.current = Obj.miniMap;
      async(() => {
        mst.graph.setG6Graph(erdGraphRef.current);
      });
    } else {
      layout(erdGraphRef.current, mst.Nodes, mst.edges, mst);
    }
  }, [JSON.stringify(mst.sys.checkedKeys), mst]);
  (0, import_react.useEffect)(() => {
    if (erdGraphRef.current && size.width && size.height) {
      if (!erdGraphRef.current["isLayouting"]) {
        const documentHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const height = mst.sys.height === "100%" ? documentHeight - 45 : mst.sys.height - 45;
        erdGraphRef.current.changeSize(size.width, height);
        erdGraphRef.current.fitView(0);
      }
    }
  }, [size.height, size.width]);
  const setRef = (0, import_react.useCallback)(
    (ref) => {
      containerRef.current = ref;
    },
    [containerRef]
  );
  (0, import_react.useEffect)(() => {
    const graph = erdGraphRef.current;
    if (graph) {
      const gwidth = graph.get("width");
      const gheight = graph.get("height");
      const point = graph.getCanvasByPoint(gwidth / 2, gheight / 2);
      graph.zoomTo(mst.graph.zoom, point);
    }
  }, [mst.graph.zoom]);
  const reloadRef = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    const graph = erdGraphRef.current;
    if (graph) {
      if (!reloadRef.current) {
        reloadRef.current = true;
        return;
      }
      const isLargar = graph.getNodes().length > 50;
      graph.updateLayout({
        type: mst.sys.dagreLayout ? "dagre" : "fruchterman",
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
        onLayoutEnd: () => {
          async(() => {
            graph["isLayouting"] = false;
            graph.fitView(0);
            (0, import_mobx_keystone.withoutUndo)(() => {
              mst.graph.setZoom(graph.getZoom());
            });
          }, 1e3);
        }
      });
      if (mst.sys.dagreLayout) {
        async(() => {
          graph.fitView(0);
        }, 1e3);
      }
    }
  }, [mst.sys.dagreLayout]);
  (0, import_hooks.useUpdateItem)({
    currentModel: mst.sys.currentModel,
    graph: erdGraphRef.current,
    showNameOrLabel: mst.sys.showNameOrLabel,
    zoom: mst.graph.zoom,
    checkNum: checkRef.current,
    themeColor: mst.Ui.themeColor,
    darkness: mst.Ui.darkness
  });
  (0, import_react.useEffect)(() => {
    var _a, _b;
    if (erdGraphRef.current && miniMapRef.current) {
      if (!mst.sys.disableMiniMap) {
        (_a = erdGraphRef.current) == null ? void 0 : _a.removePlugin(miniMapRef.current);
      } else {
        const miniMap = new import_g6_min.default.Minimap({
          type: "delegate",
          viewportClassName: "g6-minimap-viewport-erd",
          delegateStyle: {
            fill: "rgba(0,0,0,0.10)"
          }
        });
        miniMapRef.current = miniMap;
        (_b = erdGraphRef.current) == null ? void 0 : _b.addPlugin(miniMap);
      }
    }
  }, [mst.sys.disableMiniMap]);
  return {
    containerRef,
    setRef,
    erdGraph: erdGraphRef.current
  };
};
var render = (container, nodes, edges, mst) => {
  const documentHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const height = mst.sys.height === "100%" ? documentHeight - 45 : mst.sys.height - 45;
  const styleConfig = (0, import_style.initStyle)({ primaryColor: mst.Ui.themeColor }).style;
  const isLargar = nodes.length > 50;
  const miniMap = new import_g6_min.default.Minimap({
    type: "delegate",
    viewportClassName: "g6-minimap-viewport-erd",
    delegateStyle: {
      fill: "rgba(0,0,0,0.10)"
    }
  });
  const graph = new import_g6_min.default.Graph({
    height,
    width: container.offsetWidth - 20,
    container,
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
      type: mst.sys.dagreLayout ? "dagre" : "force",
      condense: true,
      cols: 3,
      // gpuEnabled: true,
      workerEnabled: true,
      // workerScriptURL:'',
      linkDistance: 0,
      alphaDecay: isLargar ? 0.3 : void 0,
      preventOverlap: true,
      // collideStrength: 0.5,
      nodeSpacing: isLargar ? -100 : -180,
      onLayoutEnd: () => {
        graph["isLayouting"] = false;
        graph["endLayout"] = true;
        graph.fitView(0);
        graph["endLayout"] = false;
        (0, import_mobx_keystone.withoutUndo)(() => {
          mst.graph.setZoom(graph.getZoom());
        });
      }
    },
    modes: {
      default: [
        "drag-canvas",
        {
          type: "zoom-canvas",
          minZoom: 1e-4,
          // enableOptimize: true,
          // optimizeZoom: true,
          maxZoom: 2.1
          // enableOptimize: true,
        },
        {
          type: "drag-node"
          // enableDelegate: true,
        },
        {
          type: "edge-tooltip",
          formatText: (model) => {
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
  (0, import_event.default)(graph, mst);
  graph.data({ nodes, edges });
  graph["isLayouting"] = true;
  graph.render();
  graph.fitView(0);
  if (mst.sys.dagreLayout) {
    async(() => {
      graph.fitView(0);
      (0, import_mobx_keystone.withoutUndo)(() => {
        mst.graph.setZoom(graph.getZoom());
      });
    });
  }
  return { graph, miniMap };
};
var layout = (graph, nodes, edges, mst) => {
  graph.changeData({ nodes, edges });
  return graph;
};
var async = (fun, time = 500) => {
  setTimeout(fun, time);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
