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

// src/type/sys.tsx
var sys_exports = {};
__export(sys_exports, {
  TSys: () => TSys
});
module.exports = __toCommonJS(sys_exports);
var import_mobx_keystone = require("mobx-keystone");
var import_graph = require("../util/graph");
var TSys = class extends (0, import_mobx_keystone.Model)({
  search: (0, import_mobx_keystone.prop)(""),
  layouting: (0, import_mobx_keystone.prop)(false),
  isArrangeLayout: (0, import_mobx_keystone.prop)(false),
  expandedKeys: (0, import_mobx_keystone.prop)(() => []),
  currentModel: (0, import_mobx_keystone.prop)(""),
  currentModule: (0, import_mobx_keystone.prop)(""),
  checkedKeys: (0, import_mobx_keystone.prop)(() => []),
  showNameOrLabel: (0, import_mobx_keystone.prop)(false),
  tabOrTree: (0, import_mobx_keystone.prop)(false),
  snapshot: (0, import_mobx_keystone.prop)(true),
  height: (0, import_mobx_keystone.prop)("100%"),
  dagreLayout: (0, import_mobx_keystone.prop)(false),
  intl: (0, import_mobx_keystone.prop)("CH"),
  disableMiniMap: (0, import_mobx_keystone.prop)(false),
  onlyMode: (0, import_mobx_keystone.prop)(false)
  // undoData: prop<UndoStore>(() => new UndoStore({})),
}) {
  constructor() {
    super(...arguments);
    this.setExpandedKeys = (keys) => {
      this.expandedKeys = keys;
    };
    this.setCheckedKeys = (keys) => {
      this.checkedKeys = keys;
    };
    this.toggleTabOrTree = () => {
      this.tabOrTree = !this.tabOrTree;
    };
    this.changeModuleValue = (module2) => {
      this.currentModule = module2;
    };
    this.setSearch = (search) => {
      this.search = search;
    };
    this.toggleShowNameOrLabel = () => {
      this.showNameOrLabel = !this.showNameOrLabel;
    };
  }
  setOnIgnoreEdge(onIgnoreEdge) {
    this.onIgnoreEdge = onIgnoreEdge;
  }
  setOnModelDetail(onModelDetail) {
    this.onModelDetail = onModelDetail;
  }
  toggleArrangeLayout() {
    this.isArrangeLayout = !this.isArrangeLayout;
  }
  setDisableMiniMap(disableMiniMap) {
    this.disableMiniMap = disableMiniMap;
  }
  setCurrentModel(keys) {
    const n0 = +new Date();
    const newKey = keys.length > 1 ? keys[1] : keys[0];
    const root = (0, import_mobx_keystone.getRoot)(this);
    const graph = root.graph.G6Graph;
    if (graph) {
      const item = graph.findById("model-" + newKey);
      if (item)
        item.toFront();
    }
    this.currentModel = newKey;
    const n1 = +new Date();
  }
  centerCurrentModel(keys) {
    const newKey = keys.length > 1 ? keys[1] : keys[0];
    this.currentModel = newKey;
    const root = (0, import_mobx_keystone.getRoot)(this);
    const graph = root.graph.G6Graph;
    if (graph) {
      const item = graph.findById("model-" + newKey);
      if (item)
        item.toFront();
      (0, import_graph.toCenter)(item, graph);
      root.graph.setZoom(graph.getZoom());
    }
  }
  openModel(key) {
    const root = (0, import_mobx_keystone.getRoot)(this);
    const graph = root.graph.G6Graph;
    if (graph) {
      const item = graph.findById("model-" + key);
      if (this.onModelDetail)
        this.onModelDetail(item.getModel().data);
    }
  }
  onInit() {
    this.toggleShowNameOrLabel = this.toggleShowNameOrLabel.bind(this);
  }
  setDagreLayout(dagreLayout) {
    this.dagreLayout = dagreLayout;
  }
};
__decorateClass([
  import_mobx_keystone.modelAction
], TSys.prototype, "toggleArrangeLayout", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], TSys.prototype, "setExpandedKeys", 2);
__decorateClass([
  import_mobx_keystone.modelAction
], TSys.prototype, "setCheckedKeys", 2);
__decorateClass([
  import_mobx_keystone.modelAction
], TSys.prototype, "setDisableMiniMap", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], TSys.prototype, "setCurrentModel", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], TSys.prototype, "centerCurrentModel", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], TSys.prototype, "openModel", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], TSys.prototype, "toggleTabOrTree", 2);
__decorateClass([
  import_mobx_keystone.modelAction
], TSys.prototype, "changeModuleValue", 2);
__decorateClass([
  import_mobx_keystone.modelAction
], TSys.prototype, "setSearch", 2);
__decorateClass([
  import_mobx_keystone.modelAction
], TSys.prototype, "toggleShowNameOrLabel", 2);
__decorateClass([
  import_mobx_keystone.modelAction
], TSys.prototype, "setDagreLayout", 1);
TSys = __decorateClass([
  (0, import_mobx_keystone.model)("webpdm/TSys")
], TSys);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TSys
});
