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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/out.tsx
var out_exports = {};
__export(out_exports, {
  default: () => out_default
});
module.exports = __toCommonJS(out_exports);
var import_react = __toESM(require("react"));
__reExport(out_exports, require("web-pdm-core"), module.exports);
var import_web_pdm_core = __toESM(require("web-pdm-core"));
var import_antd = require("antd");
var import_icons = require("@ant-design/icons");
var import_tree = require("./tree");
var IconRenders = {
  undo: /* @__PURE__ */ import_react.default.createElement(import_icons.RollbackOutlined, null),
  redo: /* @__PURE__ */ import_react.default.createElement(import_icons.RollbackOutlined, { style: { transform: "scaleX(-1)" } }),
  min: /* @__PURE__ */ import_react.default.createElement(import_icons.ZoomOutOutlined, null),
  max: /* @__PURE__ */ import_react.default.createElement(import_icons.ZoomInOutlined, null),
  full: /* @__PURE__ */ import_react.default.createElement(import_icons.BorderOutlined, null),
  miniMap: /* @__PURE__ */ import_react.default.createElement(import_icons.PictureFilled, null),
  miniMapNo: /* @__PURE__ */ import_react.default.createElement(import_icons.PictureOutlined, null),
  dagreLayout: /* @__PURE__ */ import_react.default.createElement(import_icons.PartitionOutlined, null),
  relationLayout: /* @__PURE__ */ import_react.default.createElement(import_icons.UngroupOutlined, null),
  reload: /* @__PURE__ */ import_react.default.createElement(import_icons.ReloadOutlined, null),
  image: /* @__PURE__ */ import_react.default.createElement(import_icons.DownloadOutlined, null),
  darkness: /* @__PURE__ */ import_react.default.createElement(import_icons.SnippetsFilled, null),
  light: /* @__PURE__ */ import_react.default.createElement(import_icons.SnippetsOutlined, null),
  colorClose: /* @__PURE__ */ import_react.default.createElement(import_icons.BgColorsOutlined, null),
  colorOpen: /* @__PURE__ */ import_react.default.createElement(import_icons.BgColorsOutlined, null)
};
var WebPdm = (props) => {
  return /* @__PURE__ */ import_react.default.createElement(
    import_web_pdm_core.default,
    {
      IconRenders,
      components: { Input: import_antd.Input, Button: import_antd.Button, Dropdown: import_antd.Dropdown, Menu: import_antd.Menu, Select: import_antd.Select, Tooltip: import_antd.Tooltip, Tree: import_tree.Tree, Popover: import_antd.Popover },
      ...props
    }
  );
};
var out_default = WebPdm;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
