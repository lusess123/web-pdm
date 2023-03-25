function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useEffect, useState } from 'react';
import { applySnapshot, withoutUndo } from 'mobx-keystone';
import { useMst } from "./context";
import { observer } from 'mobx-react';
import { Provider, createRootStore } from "./context";
import MSTPage from "./components";
// import { TIconRendersKeys } from './components/model-toolbar'

export * from "./type/config";
// import './style.scss'

// type FF = InstanceType<typeof {aa:}>

var Page = observer(function (_ref) {
  var onIntl = _ref.onIntl,
    onReload = _ref.onReload,
    onModelDetail = _ref.onModelDetail,
    models = _ref.models,
    modules = _ref.modules,
    erdkey = _ref.erdkey,
    className = _ref.className,
    style = _ref.style,
    height = _ref.height,
    onIgnoreEdge = _ref.onIgnoreEdge,
    components = _ref.components,
    IconRenders = _ref.IconRenders;
  var data = useMst();
  useEffect(function () {
    // onSnapshot(data, snapshot => {
    //     sessionStorage.setItem(
    //         'web-pdm' + erdkey,
    //         JSON.stringify(snapshot)
    //     )
    //     sessionStorage.setItem(
    //         'web-pdm-fields' + erdkey,
    //         JSON.stringify(Array.from(data.Fields.entries()))
    //     )
    // })
    var localdata = sessionStorage.getItem('web-pdm' + erdkey);
    if (!localdata) {
      withoutUndo(function () {
        return data.initData(models, modules);
      });
    } else {
      var sdata = JSON.parse(localdata);
      sdata.sys.height = height;
      withoutUndo(function () {
        var localFieldsdata = sessionStorage.getItem('web-pdm-fields' + erdkey);
        if (localFieldsdata) {
          data.setFields(new Map(JSON.parse(localFieldsdata)));
        }
        applySnapshot(data, sdata);
        data.sys.setOnIgnoreEdge(onIgnoreEdge);
        data.sys.setOnModelDetail(onModelDetail);
        data.Ui.registComponents(components, IconRenders);
        data.setOnReload(onReload);
        data.onIntl = onIntl;
      });
    }
  }, []);
  useEffect(function () {
    data.Models.clear();
    data.Modules.clear();
    data.Fields.clear();
    withoutUndo(function () {
      return data.initData(models, modules);
    });
  }, [models]);
  return /*#__PURE__*/React.createElement(MSTPage, {
    className: className,
    style: style
  });
});
/**
 *组件定义
 *
 * @param {*} props 属性接口
 * @return {*}
 */
var WebPDM = function WebPDM(props) {
  var _useState = useState(function () {
      return createRootStore({
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
    }),
    _useState2 = _slicedToArray(_useState, 1),
    rootStore = _useState2[0];
  return /*#__PURE__*/React.createElement(Provider, {
    value: rootStore
  }, rootStore && /*#__PURE__*/React.createElement(Page, props));
};
export default WebPDM;