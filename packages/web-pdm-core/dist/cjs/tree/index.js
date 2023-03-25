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

// src/tree/index.tsx
var tree_exports = {};
__export(tree_exports, {
  Tree: () => Tree
});
module.exports = __toCommonJS(tree_exports);
var import_antd = require("antd");
var import_react = __toESM(require("react"));
var import_style = require("./style.scss");
var OptionBuilder = ({ data }) => {
  const { title, options = [] } = data;
  const [showMenu, setShowMenu] = (0, import_react.useState)(false);
  const onShowMenu = (0, import_react.useCallback)(
    (val) => () => {
      setShowMenu(val);
    },
    []
  );
  const menu = /* @__PURE__ */ import_react.default.createElement(import_antd.Menu, null, options.map((option) => {
    return /* @__PURE__ */ import_react.default.createElement(import_antd.Menu.Item, { key: option }, /* @__PURE__ */ import_react.default.createElement("a", { onClick: option.click }, option.title));
  }));
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: "tree-node-title",
      onMouseEnter: onShowMenu(true),
      onMouseLeave: onShowMenu(false)
    },
    /* @__PURE__ */ import_react.default.createElement("span", { className: "tree-node-title-title" }, title),
    !!options.length && showMenu && /* @__PURE__ */ import_react.default.createElement(import_antd.Dropdown, { overlay: menu }, /* @__PURE__ */ import_react.default.createElement("span", { className: "tree-node-title-options" }, "..."))
  );
};
import_antd.Tree["OptionBuilder"] = OptionBuilder;
var Tree = import_antd.Tree;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Tree
});
