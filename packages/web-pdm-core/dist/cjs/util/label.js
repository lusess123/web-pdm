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

// src/util/label.tsx
var label_exports = {};
__export(label_exports, {
  renderModelTitle: () => renderModelTitle
});
module.exports = __toCommonJS(label_exports);
var import_react = __toESM(require("react"));
var renderModelTitle = (title, searchValue, showNameOrLabel, originalKey) => {
  if (showNameOrLabel) {
    return renderTitle(originalKey, searchValue);
  } else {
    return renderTitle(title, searchValue);
  }
};
var renderLabel = (isSpec, beforeStr, afterStr, searchValue) => {
  const greenStyle = isSpec ? { color: "green" } : {};
  const searchStyle = {
    color: "#f50"
  };
  return /* @__PURE__ */ import_react.default.createElement("span", null, /* @__PURE__ */ import_react.default.createElement("span", { style: greenStyle }, beforeStr), /* @__PURE__ */ import_react.default.createElement("span", { style: searchStyle }, searchValue), /* @__PURE__ */ import_react.default.createElement("span", { style: greenStyle }, afterStr));
};
var renderTitle = (title, searchValue = "", isSpec = false) => {
  if (!searchValue)
    return title;
  const index = title.indexOf(searchValue);
  const beforeStr = title.substr(0, index);
  const afterStr = title.substr(index + searchValue.length);
  const titleFilter = index > -1 ? renderLabel(isSpec, beforeStr, afterStr, searchValue) : renderTitleGreen(isSpec, title);
  return titleFilter;
};
var renderTitleGreen = (isSpec, title) => {
  const greenStyle = isSpec ? { color: "green" } : {};
  return /* @__PURE__ */ import_react.default.createElement("span", { style: greenStyle }, title);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  renderModelTitle
});
