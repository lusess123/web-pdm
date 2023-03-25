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

// src/type/ui.tsx
var ui_exports = {};
__export(ui_exports, {
  TUi: () => TUi
});
module.exports = __toCommonJS(ui_exports);
var import_mobx_keystone = require("mobx-keystone");
var TUi = class extends (0, import_mobx_keystone.Model)({
  update: (0, import_mobx_keystone.prop)(+new Date()),
  themeColor: (0, import_mobx_keystone.prop)("black"),
  selectedColor: (0, import_mobx_keystone.prop)("rgba(11,108,149)"),
  darkness: (0, import_mobx_keystone.prop)(true)
}) {
  constructor() {
    super(...arguments);
    this.IconRenders = {};
    this.isToogle = false;
    this.disableIcons = [];
  }
  registComponents(components, IconRenders, disableIcons) {
    if (components) {
      Object.keys(components).forEach((k) => {
        this[k] = components[k];
      });
    }
    if (IconRenders)
      this.IconRenders = { ...this.IconRenders, ...IconRenders };
    if (disableIcons)
      this.disableIcons = disableIcons;
  }
  toggle(components) {
    this.registComponents(this.isToogle ? void 0 : components);
    this.update = +new Date();
    this.isToogle = !this.isToogle;
  }
  setThemeColor(color) {
    this.themeColor = color;
  }
  setDarkness(darkness) {
    this.darkness = darkness;
  }
};
__decorateClass([
  import_mobx_keystone.modelAction
], TUi.prototype, "toggle", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], TUi.prototype, "setThemeColor", 1);
__decorateClass([
  import_mobx_keystone.modelAction
], TUi.prototype, "setDarkness", 1);
TUi = __decorateClass([
  (0, import_mobx_keystone.model)("webpdm/TUi")
], TUi);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TUi
});
