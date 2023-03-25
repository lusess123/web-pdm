var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/type/graph.tsx
var graph_exports = {};
__export(graph_exports, {
  TGraph: () => TGraph
});
module.exports = __toCommonJS(graph_exports);
var import_mobx_keystone = require("mobx-keystone");
var TGraph = class extends (0, import_mobx_keystone.Model)({
  zoom: (0, import_mobx_keystone.prop)(0)
}) {
  //  @modelAction
  setG6Graph(graph) {
    this.G6Graph = graph;
  }
  setZoom(zoom) {
    this.zoom = zoom;
  }
  minZoom(graph) {
    const zoom = this.zoom;
    if (zoom > 0.2) {
      this.zoom = zoom - 0.1;
    } else {
      this.zoom = zoom - 0.02;
    }
  }
  maxZoom(graph) {
    const zoom = this.zoom;
    if (zoom > 0.2) {
      this.zoom = zoom + 0.1;
    } else {
      this.zoom = zoom + 0.02;
    }
  }
  container(graph) {
    graph.fitView(0);
    this.zoom = graph.getZoom();
  }
  downAsImage() {
    const _graph = this.G6Graph;
    if (!_graph)
      return;
    const oldZoom = this.G6Graph.getZoom();
    _graph.isExporting = true;
    _graph.getNodes().filter((a) => !a.isSys).forEach((node) => {
      node.getContainer().show();
      _graph.updateItem(node, {
        isKeySharp: false,
        isCardSharp: false
      });
    });
    const gwidth = _graph.get("width");
    const gheight = _graph.get("height");
    const point = _graph.getCanvasByPoint(gwidth / 2, gheight / 2);
    _graph.zoomTo(0.8);
    _graph.downloadFullImage("模型图", void 0, {
      backgroundColor: "rgb(245, 247, 255)"
    });
    _graph.isExporting = void 0;
    _graph.zoomTo(oldZoom);
    this.setZoom(oldZoom);
    _graph.getNodes().filter((a) => !a.isSys).forEach((node) => {
      node.getContainer().show();
      _graph.updateItem(node, {
        isKeySharp: oldZoom < 0.4,
        isCardSharp: false
      });
    });
  }
  actionEdges(currentModel) {
    if (!this.G6Graph)
      return;
    this.G6Graph.getEdges().forEach((edge) => {
      const edgeData = edge.getModel();
      if (edgeData.target !== "model-SYS-CENTER-POINT") {
        edge.setState("active", false);
        if (edgeData.source === "model-" + currentModel || edgeData.target === "model-" + currentModel) {
          edge.setState("active", true);
          edge.toFront();
        }
      }
    });
  }
};
__decorateClass([
  import_mobx_keystone.modelAction
], TGraph.prototype, "setZoom", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], TGraph.prototype, "minZoom", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], TGraph.prototype, "maxZoom", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], TGraph.prototype, "container", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], TGraph.prototype, "downAsImage", 1);
TGraph = __decorateClass([
  (0, import_mobx_keystone.model)("webpdm/TGraph")
], TGraph);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TGraph
});
