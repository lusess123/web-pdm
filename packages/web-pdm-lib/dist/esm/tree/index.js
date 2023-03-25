function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { Dropdown, Menu, Tree as AntTree } from 'antd';
import React, { useState, useCallback } from 'react';
// import 'antd/dist/antd.less'
import "./style.scss";
// const click = () => alert()
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
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
  var menu = /*#__PURE__*/_jsx(Menu, {
    children: options.map(function (option) {
      return /*#__PURE__*/_jsx(Menu.Item, {
        children: /*#__PURE__*/_jsx("a", {
          onClick: option.click,
          children: option.title
        })
      }, option);
    })
  });
  return /*#__PURE__*/_jsxs("div", {
    className: "tree-node-title",
    onMouseEnter: onShowMenu(true),
    onMouseLeave: onShowMenu(false),
    children: [/*#__PURE__*/_jsx("span", {
      className: "tree-node-title-title",
      children: title
    }), !!options.length && showMenu && /*#__PURE__*/_jsx(Dropdown, {
      overlay: menu,
      children: /*#__PURE__*/_jsx("span", {
        className: "tree-node-title-options",
        children: "..."
      })
    })]
  });
};
// alert()
AntTree['OptionBuilder'] = OptionBuilder;
export var Tree = AntTree;