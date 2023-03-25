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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/type/index.tsx
var type_exports = {};
__export(type_exports, {
  RootInstance: () => RootInstance,
  arrangeShow: () => arrangeShow,
  createStore: () => createStore
});
module.exports = __toCommonJS(type_exports);
var import_mobx_keystone = require("mobx-keystone");
var import_mobx = require("mobx");
var import_lodash = require("lodash");
var import_model = require("./model");
var import_module = require("./module");
var import_sys = require("./sys");
var import_graph = require("./graph");
var import_data = require("../graph/data");
var import_label = require("../util/label");
var import_ui = require("./ui");
var import_intl = __toESM(require("../intl"));
var getLayerRootModel = (models, rootKey, roots = []) => {
  const rootModel = models.find((a) => a.name === rootKey);
  const rootsRes = rootModel ? [...roots, rootKey] : roots;
  const isRoot = rootModel.aggregateModelKey && rootModel.aggregateModelKey !== rootKey;
  const rootsResList = isRoot ? getLayerRootModel(models, rootModel.aggregateModelKey, rootsRes) : rootsRes;
  return rootsResList;
};
var arrangeShow = (ss, { model: model2 }) => {
  const roots = getLayerRootModel(ss.models, model2, []);
  const list = ss.models.filter((a) => a.key === model2 || roots.indexOf(a.aggregateModelKey) >= 0).map((a) => "model-" + a.key);
  return {
    ...ss,
    checkedKeys: list,
    currentModel: model2,
    isArrangeLayout: true
  };
};
function S4() {
  return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
}
function NewGuid() {
  return S4();
}
function MapProp() {
  return (0, import_mobx_keystone.prop)(() => (0, import_mobx_keystone.objectMap)());
}
var RootInstance = class extends (0, import_mobx_keystone.Model)({
  sys: (0, import_mobx_keystone.prop)(),
  Models: MapProp(),
  Modules: MapProp(),
  // Fields: MapProp<TField>(),
  graph: (0, import_mobx_keystone.prop)(() => new import_graph.TGraph({})),
  Ui: (0, import_mobx_keystone.prop)(() => new import_ui.TUi({}))
}) {
  constructor() {
    super(...arguments);
    this.Fields = /* @__PURE__ */ new Map();
    this.setCheckedKeys = (keys) => {
      if (!this.sys.tabOrTree) {
        this.sys.checkedKeys = keys;
      } else {
        const modelKeys = [...this.Models.values()].filter(
          (a) => !this.sys.currentModule || a.moduleId === this.sys.currentModule
        ).map((a) => a.id);
        const withoutKeys = (0, import_lodash.without)(modelKeys, ...keys);
        this.sys.checkedKeys = (0, import_lodash.union)(
          (0, import_lodash.without)(this.sys.checkedKeys, ...withoutKeys),
          keys
        );
      }
    };
  }
  setOnReload(onReload) {
    this.onReload = onReload;
  }
  intl(text) {
    const newText = this.onIntl && this.onIntl(text);
    if (newText) {
      return newText;
    }
    const intlmap = import_intl.default[this.sys.intl];
    if (intlmap)
      return intlmap[text] || text;
    else
      return text;
  }
  setUndoManager(undoManager) {
    this.undoManager = undoManager;
  }
  setFields(fields) {
    this.Fields = fields;
  }
  get moduleList() {
    return [...this.Modules.values()];
  }
  get Nodes() {
    const data = (0, import_data.createData)(this);
    return data;
  }
  get edges() {
    return (0, import_data.createLinks)(this);
  }
  arrangeShow(rootKey) {
    const models = [...this.Models.values()];
    const roots = getLayerRootModel(models, rootKey, []);
    const list = models.filter(
      (a) => a.name === rootKey || roots.indexOf(a.aggregateModelKey) >= 0
    ).map((a) => a.id);
    this.sys.setCheckedKeys(list);
  }
  findModelByName(name) {
    return [...this.Models.values()].find((a) => a.name === name);
  }
  renderModelTitle(model2) {
    return (0, import_label.renderModelTitle)(
      model2.label,
      this.sys.search,
      this.sys.showNameOrLabel,
      model2.name
    );
  }
  initData(models, modules, sys) {
    const t0 = +new Date();
    let moduleHas = {};
    modules.forEach((module2) => {
      const key = NewGuid().toString();
      this.Modules.set(
        key,
        new import_module.TModule({ id: key, label: module2.label, name: module2.name })
      );
      moduleHas[module2.name] = key;
      this.sys.expandedKeys.push(key);
    });
    const t1 = +new Date();
    let modelsKeys = [];
    let modelHas = {};
    models.forEach((model2) => {
      const key = NewGuid().toString();
      this.Models.set(
        key,
        new import_model.TModel({
          id: key,
          belongAggregate: model2.belongAggregate,
          aggregateModelKey: model2.aggregateModelKey,
          aggregateRoot: model2.aggregateRoot,
          label: model2.label,
          name: model2.name,
          moduleId: moduleHas[model2.module] || ""
        })
      );
      modelHas[model2.name] = key;
      modelsKeys.push(key);
    });
    models.forEach((model2) => {
      model2.fields.forEach((field) => {
        var _a;
        const _key = NewGuid().toString();
        const relationModel = (_a = field == null ? void 0 : field.typeMeta) == null ? void 0 : _a.relationModel;
        const tmodel = relationModel ? this.Models.get(modelHas[relationModel]) : void 0;
        this.Fields.set(_key, {
          id: _key,
          label: field.label,
          name: field.name,
          type: field.type || "string",
          modelId: modelHas[model2.name],
          typeMeta: field.typeMeta,
          relationModel: tmodel && (0, import_mobx_keystone.getSnapshot)(tmodel)
        });
        if (tmodel)
          console.log(tmodel.name);
      });
    });
    const t2 = +new Date();
    this.sys.setCheckedKeys(modelsKeys);
    if (sys == null ? void 0 : sys.height) {
      this.sys.height = sys.height;
    }
    const t = +new Date();
  }
  reload() {
    if (this.onReload) {
      const data = this.onReload();
      if (data) {
        this.Models.clear();
        this.Modules.clear();
        this.Fields.clear();
        this.initData(data.models, data.modules);
      }
    }
  }
  undo() {
    this.undoManager.undo();
  }
  redo() {
    this.undoManager.redo();
  }
  checkAllFun() {
    var _a, _b;
    const currentModule = this.sys.currentModule;
    const modelIds = currentModule ? (_b = (_a = this.Modules.get(currentModule)) == null ? void 0 : _a.models) == null ? void 0 : _b.map((a) => a.id) : [...this.Models.values()].map((a) => a.id);
    this.sys.checkedKeys = (0, import_lodash.union)(this.sys.checkedKeys, modelIds);
  }
  checkAllCancleFun() {
    var _a, _b;
    const currentModule = this.sys.currentModule;
    if (!currentModule)
      this.sys.checkedKeys = [];
    const modelIds = (_b = (_a = this.Modules.get(currentModule)) == null ? void 0 : _a.models) == null ? void 0 : _b.map((a) => a.id);
    this.sys.checkedKeys = [
      ...(0, import_lodash.without)([...this.sys.checkedKeys], ...modelIds || [])
    ];
  }
  onInit() {
    this.intl = this.intl.bind(this);
  }
};
__decorateClass([
  import_mobx.computed
], RootInstance.prototype, "moduleList", 1);
__decorateClass([
  import_mobx.computed
], RootInstance.prototype, "Nodes", 1);
__decorateClass([
  import_mobx.computed
], RootInstance.prototype, "edges", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], RootInstance.prototype, "arrangeShow", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], RootInstance.prototype, "findModelByName", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], RootInstance.prototype, "renderModelTitle", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], RootInstance.prototype, "initData", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], RootInstance.prototype, "reload", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], RootInstance.prototype, "undo", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], RootInstance.prototype, "redo", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], RootInstance.prototype, "checkAllFun", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], RootInstance.prototype, "checkAllCancleFun", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], RootInstance.prototype, "setCheckedKeys", 2);
RootInstance = __decorateClass([
  (0, import_mobx_keystone.model)("webpdm/RootStore")
], RootInstance);
var createStore = (props = { sys: {}, graph: {}, components: {}, Ui: {}, IconRenders: void 0, disableIcons: [] }) => {
  const ui = new import_ui.TUi(props.Ui);
  ui.registComponents(props.components, props.IconRenders, props.disableIcons);
  return new RootInstance({
    $modelId: "webpdm",
    sys: new import_sys.TSys({
      isArrangeLayout: false,
      layouting: true,
      search: "",
      ...props.sys
    }),
    Ui: ui,
    graph: new import_graph.TGraph({
      ...props.graph
    })
    // Ui: new TUi(Ui)
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RootInstance,
  arrangeShow,
  createStore
});
