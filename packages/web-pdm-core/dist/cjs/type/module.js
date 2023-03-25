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

// src/type/module.tsx
var module_exports = {};
__export(module_exports, {
  TModule: () => TModule
});
module.exports = __toCommonJS(module_exports);
var import_mobx_keystone = require("mobx-keystone");
var import_mobx = require("mobx");
var TModule = class extends (0, import_mobx_keystone.Model)({
  id: (0, import_mobx_keystone.prop)(),
  name: (0, import_mobx_keystone.prop)(),
  label: (0, import_mobx_keystone.prop)()
}) {
  get models() {
    const mst = (0, import_mobx_keystone.getRoot)(this);
    const models = [...mst.Models.values()].filter(
      (a) => a.moduleId === this.id
    );
    return models;
  }
};
__decorateClass([
  import_mobx.computed
], TModule.prototype, "models", 1);
TModule = __decorateClass([
  (0, import_mobx_keystone.model)("webpdm/TModule")
], TModule);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TModule
});
