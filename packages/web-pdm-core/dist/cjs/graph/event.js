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

// src/graph/event.tsx
var event_exports = {};
__export(event_exports, {
  default: () => event_default
});
module.exports = __toCommonJS(event_exports);
var import_lodash = require("lodash");
var event_default = (graph, mst) => {
  const setZoom = (0, import_lodash.debounce)((zoom) => {
    mst.graph.setZoom(zoom);
  }, 100);
  graph.on(
    "wheelzoom",
    (0, import_lodash.throttle)(() => {
      mst.graph.setZoom(graph.getZoom());
    }, 200)
  );
  graph.on(
    "beforepaint",
    (0, import_lodash.throttle)(() => {
      if (graph["isLayouting"]) {
        return;
      }
      const isExporting = graph["isExporting"];
      const gWidth = graph.get("width");
      const gHeight = graph.get("height");
      const topLeft = graph.getPointByCanvas(0, 0);
      const bottomRight = graph.getPointByCanvas(gWidth, gHeight);
      graph.getNodes().filter((a) => !a["isSys"]).forEach((node) => {
        const model = node.getModel();
        if (model.isSys)
          return;
        if (!model.visible) {
          graph.hideItem(node);
        }
        if (isExporting)
          return;
        const _data = model["data"];
        const config = model["config"];
        const h = (config.headerHeight + _data.fields.length * config.fieldHeight + 4) / 2;
        const w = config.width / 2;
        if (!model.selected && (model.x + w < topLeft.x - 200 || model.x - w > bottomRight.x || model.y + h < topLeft.y || model.y - h > bottomRight.y)) {
          node.getContainer().hide();
          node.getEdges().forEach((a) => a.hide());
        } else {
          node.getContainer().show();
          node.getEdges().forEach((a) => a.show());
        }
      });
      const endLayout = graph["endLayout"];
      if (endLayout || 1) {
        graph.getEdges().forEach((edge) => {
          let sourceNode = edge.get("sourceNode");
          let targetNode = edge.get("targetNode");
          const targetModel = targetNode.getModel();
          const edgeModel = edge.getModel();
          if ((targetModel.visible || sourceNode.getModel().visible) && graph.getZoom() >= 0.3) {
            if (!edgeModel.self && !edgeModel.isSys) {
              const isTo = sourceNode.getModel().x < targetNode.getModel().x;
              const i = edgeModel.fieldIndex;
              const l = edgeModel.fieldsLength;
              const sourceAnchor = !isTo ? i + 2 : 2 + i + l;
              graph.updateItem(edge, { sourceAnchor });
            }
          }
          if (!targetModel.visible || !sourceNode.getModel().visible) {
            edge.hide();
          }
          if (!sourceNode.getContainer().get("visible") && !targetNode.getContainer().get("visible")) {
            edge.hide();
          } else {
            edge.show();
          }
        });
      }
    }, 300)
  );
  graph.on("canvas:dragstart", () => {
    const canvasElement = graph.get("canvas").get("el");
    canvasElement.style.cursor = "grabbing";
  });
  graph.on("canvas:dragend", () => {
    const canvasElement = graph.get("canvas").get("el");
    canvasElement.style.cursor = "grab";
  });
  graph.on("node:click", (ev) => {
    var _a, _b, _c, _d;
    const { target } = ev;
    if (target.attr("click")) {
      const click = target.attr("click");
      if (click === "modelEdit") {
        if (mst.sys.onModelDetail) {
          mst.sys.onModelDetail(ev.item.getModel().data);
        }
      }
      if (click === "arrangeShow") {
        mst.arrangeShow(target.attr("arg"));
      }
      if ((_b = (_a = target.attr("arg")) == null ? void 0 : _a.relationModel) == null ? void 0 : _b.id) {
        mst.sys.centerCurrentModel([
          (_d = (_c = target.attr("arg")) == null ? void 0 : _c.relationModel) == null ? void 0 : _d.id
        ]);
      }
    } else {
      if (ev.item.getModel().id) {
        const id = ev.item.getModel().id;
        const modelId = id.replace("model-", "");
        mst.sys.setCurrentModel([modelId]);
      }
    }
  });
  graph.on("node:mouseout", (ev) => {
    const { item } = ev;
    const autoPaint = graph.get("autoPaint");
    graph.setAutoPaint(false);
    item.getContainer().findAll((sharp) => sharp.attr("fieldHover")).forEach((sharp) => {
      if (sharp.attr("fill-old")) {
        sharp.attr("fill", sharp.attr("fill-old"));
        sharp.attr("fill-old", void 0);
      }
      if (sharp.attr("opacity-old")) {
        sharp.attr("opacity", sharp.attr("opacity-old"));
        sharp.attr("opacity-old", void 0);
      }
    });
    graph.paint();
    graph.setAutoPaint(autoPaint);
  });
  graph.on("node:mousemove", (ev) => {
    const { target, item } = ev;
    const autoPaint = graph.get("autoPaint");
    graph.get("canvas").set("localRefresh", false);
    graph.setAutoPaint(false);
    const fieldName = target.attr("fieldName");
    item.getContainer().findAll((sharp) => sharp.attr("fieldHover")).forEach((sharp) => {
      if (sharp.attr("fill-old")) {
        sharp.attr("fill", sharp.attr("fill-old"));
        sharp.attr("fill-old", void 0);
      }
      if (sharp.attr("fieldHoverShow")) {
        sharp.attr("opacity", 0);
      }
      if (sharp.attr("fieldName") === fieldName) {
        sharp.attr("fill-old", sharp.attr("fill"));
        sharp.attr(
          "fill",
          sharp.attr("fieldBg") ? "rgb(204,204,204)" : "white"
        );
        if (sharp.attr("fieldHoverShow")) {
          sharp.attr("opacity-old", sharp.attr("opacity"));
          sharp.attr("opacity", 1);
        }
      }
    });
    graph.paint();
    graph.setAutoPaint(autoPaint);
  });
  graph.on("node:dragend", (ev) => {
    const node = ev.item;
    const edges = node.getEdges();
    edges.forEach((edge) => {
      let sourceNode = edge.get("sourceNode");
      let targetNode = edge.get("targetNode");
      const targetModel = targetNode.getModel();
      const edgeModel = edge.getModel();
      if ((targetModel.visible || sourceNode.getModel().visible) && graph.getZoom() >= 0.3) {
        if (!edgeModel.self && !edgeModel.isSys) {
          const isTo = sourceNode.getModel().x < targetNode.getModel().x;
          const i = edgeModel.fieldIndex;
          const l = edgeModel.fieldsLength;
          const sourceAnchor = !isTo ? i + 2 : 2 + i + l;
          graph.updateItem(edge, { sourceAnchor });
        }
      }
      if (!targetModel.visible || !sourceNode.getModel().visible) {
        edge.hide();
      }
      if (!sourceNode.getContainer().get("visible") && !targetNode.getContainer().get("visible")) {
        edge.hide();
      } else {
        edge.show();
      }
    });
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
