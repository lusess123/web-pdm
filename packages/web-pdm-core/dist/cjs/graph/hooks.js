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

// src/graph/hooks.tsx
var hooks_exports = {};
__export(hooks_exports, {
  useUpdateItem: () => useUpdateItem
});
module.exports = __toCommonJS(hooks_exports);
var import_react = require("react");
var import_lodash = require("lodash");
var useUpdateItem = ({
  currentModel,
  graph,
  showNameOrLabel,
  zoom,
  themeColor,
  darkness
}) => {
  (0, import_react.useEffect)(() => {
    const modelId = "model-" + currentModel;
    if (graph) {
      const gnodes = graph.getNodes();
      if (!gnodes.length)
        return;
      const t0 = +new Date();
      const isKeySharp = zoom <= 0.4;
      const isCardSharp = zoom <= 0.1;
      gnodes.forEach((node) => {
        if (!node.isSys) {
          const nodeModel = node.getModel();
          const nodeId = nodeModel.id;
          const data = nodeModel ? nodeModel.data : void 0;
          const isNoModule = (modelId || "").indexOf("module-") >= 0 && (data && data.moduleKey) !== modelId;
          const currStates = {
            selected: nodeModel.selected,
            noSelected: nodeModel.noSelected,
            isNoModule: nodeModel.isNoModule,
            isKeySharp: nodeModel.isKeySharp,
            isCardSharp: nodeModel.isCardSharp,
            showNameOrLabel: nodeModel.showNameOrLabel,
            themeColor: nodeModel.themeColor,
            darkness: nodeModel.darkness
          };
          const nextStates = {
            selected: nodeId === modelId,
            noSelected: nodeId !== modelId,
            isNoModule,
            isKeySharp,
            isCardSharp,
            showNameOrLabel,
            themeColor,
            darkness
          };
          const change = !(0, import_lodash.isEqual)(currStates, nextStates);
          if (change) {
            graph.updateItem(node, nextStates);
          }
        }
      });
      const t1 = +new Date();
    }
  }, [
    currentModel,
    showNameOrLabel,
    zoom >= 0.4,
    zoom >= 0.1,
    zoom !== 0,
    themeColor,
    darkness
  ]);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useUpdateItem
});
