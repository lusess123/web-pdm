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

// src/type/model.tsx
var model_exports = {};
__export(model_exports, {
  TModel: () => TModel
});
module.exports = __toCommonJS(model_exports);
var import_mobx_keystone = require("mobx-keystone");
var import_label = require("../util/label");
var TModel = class extends (0, import_mobx_keystone.Model)({
  id: (0, import_mobx_keystone.prop)(),
  name: (0, import_mobx_keystone.prop)(),
  label: (0, import_mobx_keystone.prop)(""),
  moduleId: (0, import_mobx_keystone.prop)(""),
  aggregateRoot: (0, import_mobx_keystone.prop)(false),
  aggregateModelKey: (0, import_mobx_keystone.prop)(),
  belongAggregate: (0, import_mobx_keystone.prop)()
}) {
  // @computed
  get fields() {
    const root = (0, import_mobx_keystone.getRoot)(this);
    const fields = [...root.Fields.values()];
    return fields.filter((a) => a.modelId === this.id);
  }
  renderModelTitle() {
    const root = (0, import_mobx_keystone.getRoot)(this);
    return (0, import_label.renderModelTitle)(
      this.label,
      root.sys.search,
      root.sys.showNameOrLabel,
      this.name
    );
  }
  filterModel() {
    const root = (0, import_mobx_keystone.getRoot)(this);
    const search = root.sys.search;
    return !search || (root.sys.showNameOrLabel ? this.name.indexOf(search) >= 0 : this.label.indexOf(search) >= 0);
  }
};
__decorateClass([
  import_mobx_keystone.modelAction
], TModel.prototype, "renderModelTitle", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], TModel.prototype, "filterModel", 1);
TModel = __decorateClass([
  (0, import_mobx_keystone.model)("webpdm/Model")
], TModel);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TModel
});
