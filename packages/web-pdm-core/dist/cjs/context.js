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

// src/context.tsx
var context_exports = {};
__export(context_exports, {
  Provider: () => Provider,
  createRootStore: () => createRootStore,
  useMst: () => useMst
});
module.exports = __toCommonJS(context_exports);
var import_react = require("react");
var import_mobx_keystone = require("mobx-keystone");
var import_type = require("./type");
var RootStoreContext = (0, import_react.createContext)(null);
var Provider = RootStoreContext.Provider;
function useMst() {
  const store = (0, import_react.useContext)(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
var createRootStore = (props) => {
  var _a, _b;
  const onIgnoreEdge = (_a = props == null ? void 0 : props.sys) == null ? void 0 : _a.onIgnoreEdge;
  const newProps = {
    ...props,
    sys: {
      ...props.sys,
      onIgnoreEdge: void 0,
      onModelDetail: props.onModelDetail
    }
  };
  const rootStore = (0, import_type.createStore)(newProps);
  rootStore.setOnReload(props.onReload);
  rootStore.onIntl = props.onIntl;
  rootStore.sys.setOnModelDetail((_b = props == null ? void 0 : props.sys) == null ? void 0 : _b.onModelDetail);
  if (onIgnoreEdge)
    rootStore.sys.onIgnoreEdge = onIgnoreEdge;
  rootStore.setUndoManager((0, import_mobx_keystone.undoMiddleware)(rootStore));
  return rootStore;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Provider,
  createRootStore,
  useMst
});
