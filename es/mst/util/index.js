function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import React, { isValidElement } from 'react';
import { observer } from 'mobx-react-lite';
export var defineComponent = function defineComponent(_ref) {
  var setup = _ref.setup,
      displayName = _ref.displayName;
  setup.displayName = displayName;
  return setup;
};
export var ObComponent = function ObComponent(_ref2) {
  var setup = _ref2.setup,
      displayName = _ref2.displayName;
  // const useSetUp = setup
  // const render = () => {
  //    return <
  // }
  return observer(defineComponent({
    setup: setup,
    displayName: displayName
  }));
};
export var CreateComponent = function CreateComponent(_ref3) {
  var useLocal = _ref3.useLocal,
      useSetup = _ref3.useSetup,
      render = _ref3.render,
      displayName = _ref3.displayName;
  var Render = observer(render); //  const Render = render
  //  const setUp = useSetup
  //  const useLocalState = (props) => {
  //      return useLocalStore(setUp, props)
  //  }

  var finnalRender = Render;
  finnalRender.displayName = displayName;
  return finnalRender;
};
export var json = function json(obj, replacer, space) {
  var _replacer = replacer || null;

  var _space = space || 2;

  return JSON.stringify(obj, _replacer, _space);
};

var handleCircular = function handleCircular() {
  var cache = [];
  var keyCache = [];
  return function (key, value) {
    if (_typeof(value) === 'object' && value !== null) {
      if (isValidElement(value)) {
        return reactString(value);
      }

      var index = cache.indexOf(value);

      if (index !== -1) {
        return "[Circular ".concat(keyCache[index], "]");
      }

      cache.push(value);
      keyCache.push(key || 'root');
    }

    return value;
  };
};

export var renderJson = function renderJson(value, replacer, space) {
  var _replacer = replacer || handleCircular();

  var _json = JSON.stringify(value, _replacer, space);

  var _res = JSON.parse(_json);

  return /*#__PURE__*/React.createElement("pre", null, /*#__PURE__*/React.createElement("code", null, json(_res)));
};
export function mapToArrary(mapObj) {
  return _toConsumableArray(mapObj.values());
}
export var intlLiteral = function intlLiteral(text) {
  return text;
};
export var changeTwoDecimal_f = function changeTwoDecimal_f(x) {
  var f_x = parseFloat(x);

  if (isNaN(f_x)) {
    return 0;
  }

  f_x = Math.round(x * 100) / 100;
  var s_x = f_x.toString();
  var pos_decimal = s_x.indexOf('.');

  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += '.';
  }

  while (s_x.length <= pos_decimal + 2) {
    s_x += '0';
  }

  if (s_x >= 100) return 100;
  return s_x;
};