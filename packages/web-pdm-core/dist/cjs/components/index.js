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

// src/components/index.tsx
var components_exports = {};
__export(components_exports, {
  default: () => components_default
});
module.exports = __toCommonJS(components_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_util = require("../util");
var import_model_navi = __toESM(require("./model-navi"));
var import_graph = __toESM(require("../graph"));
var import_context = require("../context");
var components_default = (0, import_util.CreateComponent)({
  displayName: "page",
  render(props) {
    const mst = (0, import_context.useMst)();
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: (0, import_classnames.default)("console-g6-page", props.className),
        style: { height: mst.sys.height }
      },
      /* @__PURE__ */ import_react.default.createElement("div", { className: "console-erd-fps" }),
      /* @__PURE__ */ import_react.default.createElement("div", { className: "g6-modelnavi" }, /* @__PURE__ */ import_react.default.createElement(import_model_navi.default, null)),
      /* @__PURE__ */ import_react.default.createElement("div", { className: "g6-graph" }, /* @__PURE__ */ import_react.default.createElement(import_graph.default, null))
    );
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
