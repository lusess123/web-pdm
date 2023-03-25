function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
export * from 'web-pdm-core';
import WebPdmCore from 'web-pdm-core';
import { Input, Button, Dropdown, Menu, Select, Tooltip, Popover } from 'antd';
import {
// FileMarkdownOutlined,
ReloadOutlined,
// CloseCircleFilled,
PictureOutlined, PictureFilled, SnippetsFilled, SnippetsOutlined, DownloadOutlined, PartitionOutlined, UngroupOutlined, RollbackOutlined, BgColorsOutlined,
// UnlockOutlined,
// LockOutlined,
ZoomOutOutlined, ZoomInOutlined, BorderOutlined
// ArrowUpOutlined,
// ArrowDownOutlined,
// ArrowLeftOutlined,
// ArrowRightOutlined,
// RetweetOutlined
} from '@ant-design/icons';
import { Tree } from "./tree";
import { jsx as _jsx } from "react/jsx-runtime";
var IconRenders = {
  undo: /*#__PURE__*/_jsx(RollbackOutlined, {}),
  redo: /*#__PURE__*/_jsx(RollbackOutlined, {
    style: {
      transform: 'scaleX(-1)'
    }
  }),
  min: /*#__PURE__*/_jsx(ZoomOutOutlined, {}),
  max: /*#__PURE__*/_jsx(ZoomInOutlined, {}),
  full: /*#__PURE__*/_jsx(BorderOutlined, {}),
  miniMap: /*#__PURE__*/_jsx(PictureFilled, {}),
  miniMapNo: /*#__PURE__*/_jsx(PictureOutlined, {}),
  dagreLayout: /*#__PURE__*/_jsx(PartitionOutlined, {}),
  relationLayout: /*#__PURE__*/_jsx(UngroupOutlined, {}),
  reload: /*#__PURE__*/_jsx(ReloadOutlined, {}),
  image: /*#__PURE__*/_jsx(DownloadOutlined, {}),
  darkness: /*#__PURE__*/_jsx(SnippetsFilled, {}),
  light: /*#__PURE__*/_jsx(SnippetsOutlined, {}),
  colorClose: /*#__PURE__*/_jsx(BgColorsOutlined, {}),
  colorOpen: /*#__PURE__*/_jsx(BgColorsOutlined, {})
};
var WebPdm = function WebPdm(props) {
  return /*#__PURE__*/_jsx(WebPdmCore, _objectSpread({
    IconRenders: IconRenders,
    components: {
      Input: Input,
      Button: Button,
      Dropdown: Dropdown,
      Menu: Menu,
      Select: Select,
      Tooltip: Tooltip,
      Tree: Tree,
      Popover: Popover
    }
  }, props));
};
export default WebPdm;