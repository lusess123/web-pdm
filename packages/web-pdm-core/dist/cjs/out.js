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
var import_mobx_keystone = require("mobx-keystone");
var import_context = require("./context");
var import_mobx_react = require("mobx-react");
var import_context2 = require("./context");
var import_components = __toESM(require("./components"));
__reExport(out_exports, require("./type/config"), module.exports);
var Page = (0, import_mobx_react.observer)(
  ({
    onIntl,
    onReload,
    onModelDetail,
    models,
    modules,
    erdkey,
    className,
    style,
    height,
    onIgnoreEdge,
    components,
    IconRenders
  }) => {
    const data = (0, import_context.useMst)();
    (0, import_react.useEffect)(() => {
      const localdata = sessionStorage.getItem("web-pdm" + erdkey);
      if (!localdata) {
        (0, import_mobx_keystone.withoutUndo)(() => data.initData(models, modules));
      } else {
        const sdata = JSON.parse(localdata);
        sdata.sys.height = height;
        (0, import_mobx_keystone.withoutUndo)(() => {
          const localFieldsdata = sessionStorage.getItem(
            "web-pdm-fields" + erdkey
          );
          if (localFieldsdata) {
            data.setFields(new Map(JSON.parse(localFieldsdata)));
          }
          (0, import_mobx_keystone.applySnapshot)(data, sdata);
          data.sys.setOnIgnoreEdge(onIgnoreEdge);
          data.sys.setOnModelDetail(onModelDetail);
          data.Ui.registComponents(components, IconRenders);
          data.setOnReload(onReload);
          data.onIntl = onIntl;
        });
      }
    }, []);
    (0, import_react.useEffect)(() => {
      data.Models.clear();
      data.Modules.clear();
      data.Fields.clear();
      (0, import_mobx_keystone.withoutUndo)(() => data.initData(models, modules));
    }, [models]);
    return /* @__PURE__ */ import_react.default.createElement(import_components.default, { className, style });
  }
);
var WebPDM = (props) => {
  const [rootStore] = (0, import_react.useState)(() => {
    return (0, import_context2.createRootStore)({
      sys: {
        height: props.height,
        onIgnoreEdge: props.onIgnoreEdge,
        onModelDetail: props.onModelDetail,
        intl: props.intl,
        onlyMode: props.onlyMode
      },
      Ui: {
        themeColor: props.themeColor,
        darkness: props.darkness
      },
      components: props.components,
      onReload: props.onReload,
      onIntl: props.onIntl,
      IconRenders: props.IconRenders,
      disableIcons: props.disableIcons
    });
  });
  return /* @__PURE__ */ import_react.default.createElement(import_context2.Provider, { value: rootStore }, rootStore && /* @__PURE__ */ import_react.default.createElement(Page, { ...props }));
};
var out_default = WebPDM;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
