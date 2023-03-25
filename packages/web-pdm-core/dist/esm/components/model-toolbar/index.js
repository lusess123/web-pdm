function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// import { Tooltip } from 'antd'

import classNames from 'classnames';
import React, { isValidElement, useState, useCallback } from 'react';
import { observer } from 'mobx-react';
import { changeTwoDecimal_f, CreateComponent } from "../../util";
import { useMst } from "../../context";
import { SketchPicker } from 'react-color';
import { throttle } from 'lodash';

// import StateStack from '../../state-stack'
// import { undoManager } from '../../context'
//<SnippetsOutlined />
//<Snip/** @type {*} */

// type TIconRenders = typeof IconRenders
// export type TIconRendersKeys = keyof TIconRenders

export default observer(function (_ref) {
  var _mst$graph;
  var graph = _ref.graph;
  var mst = useMst();
  var intl = mst.intl;
  var undoManager = mst.undoManager;
  var _ref2 = mst.Ui,
    Tooltip = _ref2.Tooltip,
    Popover = _ref2.Popover;
  var _IconRenders = _objectSpread({}, mst.Ui.IconRenders);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    colorPabel = _useState2[0],
    setColorPabel = _useState2[1];
  var setColor = useCallback(throttle(function (color) {
    mst.Ui.setThemeColor(color.hex);
    //  setColorPabel(false)
  }, 200), [colorPabel]);
  var zoomNum = graph && changeTwoDecimal_f(parseFloat(((_mst$graph = mst.graph) === null || _mst$graph === void 0 ? void 0 : _mst$graph.zoom) * 100 + '') + '') || 0;
  if (!graph) return /*#__PURE__*/React.createElement("div", {
    className: "console-erd-toolbar"
  }, intl('正在初始化中'), "....");
  return /*#__PURE__*/React.createElement("div", {
    className: "console-erd-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "right"
  }, /*#__PURE__*/React.createElement(ButtonActon, {
    IconRenders: _IconRenders,
    key: 1,
    Tooltip: Tooltip,
    title: intl('撤销'),
    color: mst.Ui.darkness && undoManager.canUndo ? mst.Ui.themeColor : undefined,
    disable: !undoManager.canUndo,
    icon: "undo",
    onClick: mst.undo.bind(mst)
  }), /*#__PURE__*/React.createElement(ButtonActon, {
    IconRenders: _IconRenders,
    key: 2,
    Tooltip: Tooltip,
    title: intl('重做'),
    color: mst.Ui.darkness && undoManager.canRedo ? mst.Ui.themeColor : undefined,
    disable: !undoManager.canRedo,
    icon: "redo",
    onClick: mst.redo.bind(mst)
  }), /*#__PURE__*/React.createElement(ButtonActon, {
    IconRenders: _IconRenders,
    key: 3,
    Tooltip: Tooltip,
    title: intl('放大'),
    color: mst.Ui.darkness ? mst.Ui.themeColor : undefined,
    disable: zoomNum >= 100,
    icon: "max",
    onClick: mst.graph.maxZoom.bind(mst.graph, graph)
  }), /*#__PURE__*/React.createElement("span", {
    className: "zoomNum noselect"
  }, graph && "".concat(zoomNum >= 100 ? 100 : zoomNum, "%")), /*#__PURE__*/React.createElement(ButtonActon, {
    IconRenders: _IconRenders,
    key: 4,
    Tooltip: Tooltip,
    title: intl('缩小'),
    color: mst.Ui.darkness ? mst.Ui.themeColor : undefined,
    disable: zoomNum < 5,
    icon: "min",
    onClick: mst.graph.minZoom.bind(mst.graph, graph)
  }), /*#__PURE__*/React.createElement(ButtonActon, {
    IconRenders: _IconRenders,
    key: 5,
    Tooltip: Tooltip,
    title: intl('全景'),
    color: mst.Ui.darkness ? mst.Ui.themeColor : undefined,
    icon: "full",
    onClick: mst.graph.container.bind(mst.graph, graph)
  }), /*#__PURE__*/React.createElement(ButtonActon, {
    IconRenders: _IconRenders,
    key: 6,
    Tooltip: Tooltip,
    title: intl(!mst.sys.disableMiniMap ? '显示小地图' : '屏蔽小地图'),
    color: mst.Ui.darkness ? mst.Ui.themeColor : undefined,
    icon: mst.sys.disableMiniMap ? 'miniMap' : 'miniMapNo',
    onClick: mst.sys.setDisableMiniMap.bind(mst.sys, !mst.sys.disableMiniMap)
  }), /*#__PURE__*/React.createElement(ButtonActon, {
    IconRenders: _IconRenders,
    key: 7,
    Tooltip: Tooltip,
    title: intl('刷新数据'),
    color: mst.Ui.darkness ? mst.Ui.themeColor : undefined,
    icon: "reload",
    onClick: mst.reload.bind(mst)
  }), /*#__PURE__*/React.createElement(ButtonActon, {
    IconRenders: _IconRenders,
    key: 8,
    Tooltip: Tooltip,
    title: intl('下载图片'),
    color: mst.Ui.darkness ? mst.Ui.themeColor : undefined,
    icon: "image",
    onClick: mst.graph.downAsImage.bind(mst.graph, graph)
  }), /*#__PURE__*/React.createElement(ButtonActon, {
    IconRenders: _IconRenders,
    key: 9,
    Tooltip: Tooltip,
    title: mst.sys.dagreLayout ? intl('切换层次布局') : intl('切换关联布局'),
    icon: !mst.sys.dagreLayout ? 'dagreLayout' : 'relationLayout',
    color: mst.Ui.darkness ? mst.Ui.themeColor : undefined,
    onClick: mst.sys.setDagreLayout.bind(mst.sys, !mst.sys.dagreLayout)
  }), /*#__PURE__*/React.createElement(ButtonActon, {
    IconRenders: _IconRenders,
    key: 10,
    Tooltip: Tooltip,
    title: intl('切换底色'),
    icon: mst.Ui.darkness ? 'darkness' : 'light',
    color: mst.Ui.darkness ? mst.Ui.themeColor : undefined,
    onClick: mst.Ui.setDarkness.bind(mst.Ui, !mst.Ui.darkness)
  }), /*#__PURE__*/React.createElement(Popover, {
    placement: "rightTop",
    arrowPointAtCenter: true,
    footer: null,
    content: /*#__PURE__*/React.createElement(SketchPicker, {
      color: mst.Ui.themeColor,
      onChange: setColor
    }),
    visible: colorPabel
  }, /*#__PURE__*/React.createElement(ButtonActon, {
    IconRenders: _IconRenders,
    Tooltip: Tooltip,
    title: "".concat(intl('点击')).concat(colorPabel ? intl('关闭') : intl('打开'), " ").concat(intl('颜色面板')),
    color: mst.Ui.themeColor,
    icon: colorPabel ? 'colorClose' : 'colorOpen',
    onClick: setColorPabel.bind(null, !colorPabel)
  }))));
});
var ButtonActon = CreateComponent({
  render: function render(props) {
    var mst = useMst();
    // const disableIcons = mst.Ui.disableIcons.reduce((pre, cur) => ({ ...pre, [cur]: true }), {})

    var Tooltip = props.Tooltip;
    if (mst.Ui.disableIcons.indexOf(props.icon) >= 0) return null;
    var IconRender = /*#__PURE__*/isValidElement(props.icon) ? props.icon : props.IconRenders[props.icon];
    return /*#__PURE__*/React.createElement(Tooltip, {
      title: props.title
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: props.color
      },
      className: classNames({
        enable: !props.disable,
        'command-btn': true
      }),
      onClick: !props.disable ? props.onClick : undefined
    }, IconRender));
  }
});