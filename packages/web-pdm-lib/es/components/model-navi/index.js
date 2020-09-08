import "antd/es/dropdown/style/css";
import _Dropdown from "antd/es/dropdown";
import "antd/es/menu/style/css";
import _Menu from "antd/es/menu";
import "antd/es/button/style/css";
import _Button from "antd/es/button";
import "antd/es/input/style/css";
import _Input from "antd/es/input";
import "antd/es/select/style/css";
import _Select from "antd/es/select";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { EllipsisOutlined } from '@ant-design/icons'; // import { debounce } from 'lodash'

import { Tree } from '../../tree';
// import _ from 'lodash'
import React, { useCallback } from 'react';
import Scroll from 'react-custom-scrollbars';
import { CreateComponent, intlLiteral } from '../../util';
import { useMst } from '../../context';
import './style.scss';
var TreeNode = Tree.TreeNode,
    OptionBuilder = Tree.OptionBuilder;

var getTreeNodeTitle = function getTreeNodeTitle(model, root) {
  return /*#__PURE__*/React.createElement(OptionBuilder, {
    data: {
      title: root.renderModelTitle(model),
      options: [{
        title: /*#__PURE__*/React.createElement("span", null, " ", intlLiteral('定位模型')),
        click: function click(e) {
          root.sys.centerCurrentModel([model.id]);
          e.stopPropagation();
        }
      }, {
        title: /*#__PURE__*/React.createElement("span", null, " ", intlLiteral('查看'))
      } // {
      //   title: <span> {intlLiteral('移除')}</span>
      // },
      ]
    }
  });
};

export default CreateComponent({
  render: function render(_) {
    var mst = useMst();

    var _useLocal = useLocal(),
        onExpand = _useLocal.onExpand,
        checkAllFun = _useLocal.checkAllFun,
        checkAllCancleFun = _useLocal.checkAllCancleFun,
        toggleShowNameOrLabel = _useLocal.toggleShowNameOrLabel,
        toggleTabOrTree = _useLocal.toggleTabOrTree,
        Sys = _useLocal.Sys,
        changeModuleValue = _useLocal.changeModuleValue,
        setSearch = _useLocal.setSearch;

    return /*#__PURE__*/React.createElement("div", {
      className: "console-models-tree",
      height: mst.sys.height,
      style: {
        height: mst.sys.height
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "console-erd-search"
    }, /*#__PURE__*/React.createElement(_Input, {
      allowClear: true,
      value: mst.sys.search,
      size: "small",
      onChange: setSearch,
      addonAfter: Sys.tabOrTree && /*#__PURE__*/React.createElement(_Select, {
        defaultValue: Sys.currentModule,
        value: Sys.currentModule,
        className: "select-after",
        onChange: changeModuleValue
      }, [/*#__PURE__*/React.createElement(_Select.Option, {
        value: ''
      }, "\u6240\u6709")].concat(_toConsumableArray(_toConsumableArray(mst.Modules.values()).map(function (module) {
        return /*#__PURE__*/React.createElement(_Select.Option, {
          value: module.id,
          key: module.id
        }, module.label);
      }))))
    })), /*#__PURE__*/React.createElement("div", {
      className: "console-erd-search btns"
    }, mst.sys.tabOrTree && /*#__PURE__*/React.createElement(_Button, {
      size: "small",
      type: "link",
      onClick: checkAllFun
    }, "\u9009\u62E9\u6240\u6709"), mst.sys.tabOrTree && /*#__PURE__*/React.createElement(_Button, {
      size: "small",
      type: "link",
      onClick: checkAllCancleFun
    }, "\u6E05\u9664\u6240\u6709"), /*#__PURE__*/React.createElement(_Button, {
      size: "small",
      type: "link",
      onClick: toggleShowNameOrLabel
    }, "\u663E\u793A", !mst.sys.showNameOrLabel ? '名称' : '标签'), /*#__PURE__*/React.createElement(_Dropdown, {
      className: "right",
      overlay: /*#__PURE__*/React.createElement(_Menu, null, /*#__PURE__*/React.createElement(_Menu.Item, {
        key: "1",
        onClick: toggleTabOrTree
      }, Sys.tabOrTree ? '分类' : '树形', "\u6A21\u5F0F"))
    }, /*#__PURE__*/React.createElement(_Button, {
      size: "small",
      type: "link",
      icon: /*#__PURE__*/React.createElement(EllipsisOutlined, null)
    })))), /*#__PURE__*/React.createElement("div", {
      className: "navitree-warp"
    }, /*#__PURE__*/React.createElement(Scroll, {
      autoHide: true,
      autoHeight: true,
      autoHideTimeout: 1000,
      autoHideDuration: 200,
      autoHeightMin: '100%',
      autoHeightMax: '100%'
    }, /*#__PURE__*/React.createElement(Tree, {
      className: "console-models-tree-tree",
      onSelect: mst.sys.setCurrentModel.bind(mst.sys),
      selectedKeys: [mst.sys.currentModel],
      checkedKeys: _toConsumableArray(mst.sys.checkedKeys),
      onCheck: mst.setCheckedKeys.bind(mst),
      checkable: true,
      onExpand: onExpand,
      multiple: true,
      expandedKeys: _toConsumableArray(mst.sys.expandedKeys)
    }, !mst.sys.tabOrTree && mst.moduleList.map(function (m) {
      return /*#__PURE__*/React.createElement(TreeNode, {
        title: m.name,
        key: m.id
      }, _toConsumableArray(m.models.values()).filter(function (model) {
        return model.filterModel();
      }).map(function (model) {
        return /*#__PURE__*/React.createElement(TreeNode, {
          key: model.id,
          title: getTreeNodeTitle(model, mst)
        });
      }));
    }), mst.sys.tabOrTree && _toConsumableArray(mst.Models.values()).filter(function (model) {
      return (!mst.sys.currentModule || model.moduleId === mst.sys.currentModule) && model.filterModel();
    }).map(function (model) {
      return /*#__PURE__*/React.createElement(TreeNode, {
        key: model.id,
        title: getTreeNodeTitle(model, mst)
      });
    })))));
  },
  displayName: 'navi'
});

var useLocal = function useLocal() {
  var mst = useMst(); // const setSearch = useCallback( debounce(mst.sys.setSearch, 300), []);

  var setSearch = mst.sys.setSearch;
  return {
    get modules() {
      return mst.moduleList;
    },

    onExpand: function onExpand(expandedKeys) {
      mst.sys.setExpandedKeys(expandedKeys);
    },

    get expandedKeys() {
      return mst.sys.expandedKeys;
    },

    checkAllFun: function checkAllFun() {
      return mst.checkAllFun();
    },
    checkAllCancleFun: function checkAllCancleFun() {
      return mst.checkAllCancleFun();
    },
    toggleShowNameOrLabel: mst.sys.toggleShowNameOrLabel,
    toggleTabOrTree: mst.sys.toggleTabOrTree.bind(mst.sys),

    get Sys() {
      return mst.sys;
    },

    changeModuleValue: mst.sys.changeModuleValue.bind(mst.sys),
    setSearch: useCallback(function (e) {
      setSearch(e.target.value);
    }, [])
  };
};