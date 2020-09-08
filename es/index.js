import React, { useEffect } from 'react';
import { applySnapshot, onSnapshot, withoutUndo } from 'mobx-keystone';
import { useMst } from './mst/context';
import { observer } from 'mobx-react-lite';
import { Provider, rootStore } from './mst/context';
import MSTPage from './mst/components';
export var Page = observer(function (_ref) {
  var models = _ref.models,
      modules = _ref.modules,
      key = _ref.key;
  var data = useMst();
  useEffect(function () {
    onSnapshot(data, function (snapshot) {
      sessionStorage.setItem('web-pdm' + key, JSON.stringify(snapshot));
    });
    var localdata = sessionStorage.getItem('web-pdm');

    if (!localdata) {
      withoutUndo(function () {
        return data.init({
          modelData: models,
          moduleData: modules
        });
      });
    } else {
      var sdata = JSON.parse(localdata);
      withoutUndo(function () {
        return applySnapshot(data, sdata);
      });
    }
  }, []);
  return /*#__PURE__*/React.createElement(MSTPage, null);
});
export default (function (_ref2) {
  var models = _ref2.models,
      modules = _ref2.modules,
      key = _ref2.key;
  return /*#__PURE__*/React.createElement(Provider, {
    value: rootStore
  }, /*#__PURE__*/React.createElement(Page, {
    models: models,
    modules: modules,
    key: key
  }));
});