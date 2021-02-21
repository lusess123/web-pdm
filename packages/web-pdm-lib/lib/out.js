"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;

require("antd/es/popover/style/css");

var _popover = _interopRequireDefault(require("antd/es/popover"));

require("antd/es/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/select/style/css");

var _select = _interopRequireDefault(require("antd/es/select"));

require("antd/es/menu/style/css");

var _menu = _interopRequireDefault(require("antd/es/menu"));

require("antd/es/dropdown/style/css");

var _dropdown = _interopRequireDefault(require("antd/es/dropdown"));

require("antd/es/button/style/css");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/input/style/css");

var _input = _interopRequireDefault(require("antd/es/input"));

var _react = _interopRequireDefault(require("react"));

var _webPdmCore = _interopRequireWildcard(require("web-pdm-core"));

Object.keys(_webPdmCore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _webPdmCore[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _webPdmCore[key];
    }
  });
});

var _icons = require("@ant-design/icons");

var _tree = require("./tree");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconRenders = {
  undo: /*#__PURE__*/_react.default.createElement(_icons.RollbackOutlined, null),
  redo: /*#__PURE__*/_react.default.createElement(_icons.RollbackOutlined, {
    style: {
      transform: 'scaleX(-1)'
    }
  }),
  min: /*#__PURE__*/_react.default.createElement(_icons.ZoomOutOutlined, null),
  max: /*#__PURE__*/_react.default.createElement(_icons.ZoomInOutlined, null),
  full: /*#__PURE__*/_react.default.createElement(_icons.BorderOutlined, null),
  miniMap: /*#__PURE__*/_react.default.createElement(_icons.PictureFilled, null),
  miniMapNo: /*#__PURE__*/_react.default.createElement(_icons.PictureOutlined, null),
  dagreLayout: /*#__PURE__*/_react.default.createElement(_icons.PartitionOutlined, null),
  relationLayout: /*#__PURE__*/_react.default.createElement(_icons.UngroupOutlined, null),
  reload: /*#__PURE__*/_react.default.createElement(_icons.ReloadOutlined, null),
  image: /*#__PURE__*/_react.default.createElement(_icons.DownloadOutlined, null),
  darkness: /*#__PURE__*/_react.default.createElement(_icons.SnippetsFilled, null),
  light: /*#__PURE__*/_react.default.createElement(_icons.SnippetsOutlined, null),
  colorClose: /*#__PURE__*/_react.default.createElement(_icons.BgColorsOutlined, null),
  colorOpen: /*#__PURE__*/_react.default.createElement(_icons.BgColorsOutlined, null)
};

var WebPdm = function WebPdm(props) {
  return /*#__PURE__*/_react.default.createElement(_webPdmCore.default, Object.assign({
    IconRenders: IconRenders,
    components: {
      Input: _input.default,
      Button: _button.default,
      Dropdown: _dropdown.default,
      Menu: _menu.default,
      Select: _select.default,
      Tooltip: _tooltip.default,
      Tree: _tree.Tree,
      Popover: _popover.default
    }
  }, props));
};

var _default = WebPdm;
exports.default = _default;