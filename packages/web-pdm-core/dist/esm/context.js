function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { createContext, useContext } from 'react';
import { undoMiddleware } from 'mobx-keystone';
import { createStore } from "./type";
var RootStoreContext = /*#__PURE__*/createContext(null);
export var Provider = RootStoreContext.Provider;
export function useMst() {
  var store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}

// export const rootStore = createStore()
// export const undoManager = undoMiddleware(rootStore)
export var createRootStore = function createRootStore(props) {
  var _props$sys, _props$sys2;
  var onIgnoreEdge = props === null || props === void 0 ? void 0 : (_props$sys = props.sys) === null || _props$sys === void 0 ? void 0 : _props$sys.onIgnoreEdge;
  var newProps = _objectSpread(_objectSpread({}, props), {}, {
    sys: _objectSpread(_objectSpread({}, props.sys), {}, {
      onIgnoreEdge: undefined,
      onModelDetail: props.onModelDetail
    })
  });
  var rootStore = createStore(newProps);
  rootStore.setOnReload(props.onReload);
  rootStore.onIntl = props.onIntl;
  rootStore.sys.setOnModelDetail(props === null || props === void 0 ? void 0 : (_props$sys2 = props.sys) === null || _props$sys2 === void 0 ? void 0 : _props$sys2.onModelDetail);
  //alert('createRootStore')
  if (onIgnoreEdge) rootStore.sys.onIgnoreEdge = onIgnoreEdge;
  rootStore.setUndoManager(undoMiddleware(rootStore));
  return rootStore;
};