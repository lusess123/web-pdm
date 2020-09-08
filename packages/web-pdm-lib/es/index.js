function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useEffect, useState } from 'react';
import { applySnapshot, onSnapshot, withoutUndo } from 'mobx-keystone';
import { useMst } from './context';
import { observer } from 'mobx-react-lite';
import { Provider, createRootStore } from './context';
import MSTPage from './components'; // import './style.scss'

export var Page = observer(function (_ref) {
  var models = _ref.models,
      modules = _ref.modules,
      key = _ref.key,
      className = _ref.className,
      style = _ref.style,
      height = _ref.height;
  var data = useMst();
  useEffect(function () {
    onSnapshot(data, function (snapshot) {
      sessionStorage.setItem('web-pdm' + key, JSON.stringify(snapshot));
    });
    var localdata = sessionStorage.getItem('web-pdm' + key);

    if (!localdata) {
      withoutUndo(function () {
        return data.initData(models, modules);
      });
    } else {
      var sdata = JSON.parse(localdata);
      sdata.sys.height = height;
      withoutUndo(function () {
        return applySnapshot(data, sdata);
      });
    }
  }, []);
  return /*#__PURE__*/React.createElement(MSTPage, {
    className: className,
    style: style
  });
});
export default (function (_ref2) {
  var models = _ref2.models,
      modules = _ref2.modules,
      key = _ref2.key,
      className = _ref2.className,
      style = _ref2.style,
      height = _ref2.height;

  var _useState = useState(function () {
    return createRootStore({
      sys: {
        height: height
      }
    });
  }),
      _useState2 = _slicedToArray(_useState, 1),
      rootStore = _useState2[0];

  return /*#__PURE__*/React.createElement(Provider, {
    value: rootStore
  }, /*#__PURE__*/React.createElement(Page, {
    models: models,
    modules: modules,
    key: key,
    className: className,
    style: style,
    height: height
  }));
});