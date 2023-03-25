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

// src/util/graph.tsx
var graph_exports = {};
__export(graph_exports, {
  toCenter: () => toCenter
});
module.exports = __toCommonJS(graph_exports);
var toCenter = (item, graph) => {
  if (!item)
    return;
  graph.getNodes().filter((a) => !a.isSys).forEach((node) => {
    node.getContainer().show();
  });
  graph.zoomTo(0.8);
  graph.focusItem(item);
  let height = graph.get("height");
  const itemHight = item.getKeyShape().attr("height");
  const graphHeight = height / 2;
  graph.translate(0, -graphHeight + itemHight / 2 + 120);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  toCenter
});
