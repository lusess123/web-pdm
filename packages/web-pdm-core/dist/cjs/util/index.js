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

// src/util/index.tsx
var util_exports = {};
__export(util_exports, {
  CreateComponent: () => CreateComponent,
  ObComponent: () => ObComponent,
  changeTwoDecimal_f: () => changeTwoDecimal_f,
  defineComponent: () => defineComponent,
  intlLiteral: () => intlLiteral,
  json: () => json,
  mapToArrary: () => mapToArrary,
  renderJson: () => renderJson
});
module.exports = __toCommonJS(util_exports);
var import_react = __toESM(require("react"));
var import_mobx_react = require("mobx-react");
var import_react_element_to_jsx_string = __toESM(require("react-element-to-jsx-string"));
var defineComponent = ({ setup, displayName }) => {
  setup.displayName = displayName;
  return setup;
};
var ObComponent = ({ setup, displayName }) => {
  return (0, import_mobx_react.observer)(defineComponent({ setup, displayName }));
};
var CreateComponent = ({
  useLocal,
  useSetup,
  render,
  displayName
}) => {
  const Render = (0, import_mobx_react.observer)(render);
  const finnalRender = Render;
  finnalRender.displayName = displayName;
  return finnalRender;
};
var json = (obj, replacer, space) => {
  const _replacer = replacer || null;
  const _space = space || 2;
  return JSON.stringify(obj, _replacer, _space);
};
var handleCircular = () => {
  const cache = [];
  const keyCache = [];
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if ((0, import_react.isValidElement)(value)) {
        return (0, import_react_element_to_jsx_string.default)(value);
      }
      const index = cache.indexOf(value);
      if (index !== -1) {
        return `[Circular ${keyCache[index]}]`;
      }
      cache.push(value);
      keyCache.push(key || "root");
    }
    return value;
  };
};
var renderJson = (value, replacer, space) => {
  const _replacer = replacer || handleCircular();
  const _json = JSON.stringify(value, _replacer, space);
  const _res = JSON.parse(_json);
  return /* @__PURE__ */ import_react.default.createElement("pre", null, /* @__PURE__ */ import_react.default.createElement("code", null, json(_res)));
};
function mapToArrary(mapObj) {
  return [...mapObj.values()];
}
var intlLiteral = (text) => {
  return text;
};
var changeTwoDecimal_f = (x) => {
  let f_x = parseFloat(x);
  if (isNaN(f_x)) {
    return 0;
  }
  f_x = Math.round(x * 100) / 100;
  let s_x = f_x.toString();
  let pos_decimal = s_x.indexOf(".");
  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += ".";
  }
  while (s_x.length <= pos_decimal + 2) {
    s_x += "0";
  }
  if (s_x >= 100)
    return 100;
  return s_x;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateComponent,
  ObComponent,
  changeTwoDecimal_f,
  defineComponent,
  intlLiteral,
  json,
  mapToArrary,
  renderJson
});
