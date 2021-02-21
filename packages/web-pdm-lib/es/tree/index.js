import "antd/es/tree/style/css";
import _Tree from "antd/es/tree";
import "antd/es/dropdown/style/css";
import _Dropdown from "antd/es/dropdown";
import "antd/es/menu/style/css";
import _Menu from "antd/es/menu";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState, useCallback } from 'react'; // import 'antd/dist/antd.less'

import './style.scss'; // const click = () => alert()

var OptionBuilder = function OptionBuilder(_ref) {
  var data = _ref.data;
  var title = data.title,
      _data$options = data.options,
      options = _data$options === void 0 ? [] : _data$options;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showMenu = _useState2[0],
      setShowMenu = _useState2[1];

  var onShowMenu = useCallback(function (val) {
    return function () {
      setShowMenu(val);
    };
  }, []);
  var menu = /*#__PURE__*/React.createElement(_Menu, null, options.map(function (option) {
    return /*#__PURE__*/React.createElement(_Menu.Item, {
      key: option
    }, /*#__PURE__*/React.createElement("a", {
      onClick: option.click
    }, option.title));
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: 'tree-node-title',
    onMouseEnter: onShowMenu(true),
    onMouseLeave: onShowMenu(false)
  }, /*#__PURE__*/React.createElement("span", {
    className: 'tree-node-title-title'
  }, title), !!options.length && showMenu && /*#__PURE__*/React.createElement(_Dropdown, {
    overlay: menu
  }, /*#__PURE__*/React.createElement("span", {
    className: 'tree-node-title-options'
  }, "...")));
}; // alert()


_Tree['OptionBuilder'] = OptionBuilder;
export var Tree = _Tree;