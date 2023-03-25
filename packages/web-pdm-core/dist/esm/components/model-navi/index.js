function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
import { EllipsisOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

// import { Tree } from '../../tree'

// import _ from 'lodash'
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Scroll from 'react-custom-scrollbars';
import { CreateComponent } from "../../util";
import { useMst } from "../../context";
import "./style.scss";
// import mst from '@antv/g6/lib/algorithm/mst';

console.log('hezk test =======');
var getTreeNodeTitle = function getTreeNodeTitle(model, root, OptionBuilder) {
  return /*#__PURE__*/React.createElement(OptionBuilder, {
    data: {
      title: root.renderModelTitle(model),
      options: [{
        title: /*#__PURE__*/React.createElement("span", null, " ", root.intl('定位模型')),
        key: 1,
        click: function click(e) {
          root.sys.centerCurrentModel([model.id]);
          e.stopPropagation();
        }
      }, {
        key: 2,
        title: /*#__PURE__*/React.createElement("span", null, " ", root.intl('查看')),
        click: function click(e) {
          root.sys.openModel(model.id);
          e.stopPropagation();
        }
      }
      // {
      //   title: <span> {intlLiteral('移除')}</span>
      // },
      ]
    }
  });
};

export default CreateComponent({
  render: function render(_) {
    var mst = useMst();
    var intl = mst.intl;
    var _ref = mst.Ui,
      Input = _ref.Input,
      Button = _ref.Button,
      Dropdown = _ref.Dropdown,
      Menu = _ref.Menu,
      Select = _ref.Select,
      Tree = _ref.Tree;
    var _ref2 = Tree,
      TreeNode = _ref2.TreeNode,
      OptionBuilder = _ref2.OptionBuilder;
    var treeNodes = useMemo(function () {
      return !mst.sys.tabOrTree ? mst.moduleList.map(function (m) {
        return /*#__PURE__*/React.createElement(TreeNode, {
          title: mst.sys.showNameOrLabel ? m.name : m.label,
          key: m.id
        }, _toConsumableArray(m.models.values()).filter(function (model) {
          return model.filterModel();
        }).map(function (model) {
          return /*#__PURE__*/React.createElement(TreeNode, {
            key: model.id,
            title: getTreeNodeTitle(model, mst, OptionBuilder)
          });
        }));
      }) : _toConsumableArray(mst.Models.values()).filter(function (model) {
        return (!mst.sys.currentModule || model.moduleId === mst.sys.currentModule) && model.filterModel();
      }).map(function (model) {
        return /*#__PURE__*/React.createElement(TreeNode, {
          key: model.id,
          title: getTreeNodeTitle(model, mst, OptionBuilder)
        });
      });
    }, [mst.sys.tabOrTree, mst.moduleList, mst.sys.showNameOrLabel, mst.sys.currentModule, mst.sys.search //打包后没有执行，添加search确保执行
    ]);

    useEffect(function () {}, [mst.Ui.update]);
    var _useLocal = useLocal(),
      search = _useLocal.search,
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
      style: {
        height: mst.sys.height
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "console-erd-search"
    }, /*#__PURE__*/React.createElement(Input, {
      allowClear: true,
      value: search,
      size: "small",
      onChange: function onChange(e) {
        return setSearch(e.target.value);
      },
      addonAfter: Sys.tabOrTree && /*#__PURE__*/React.createElement(Select, {
        size: "small",
        defaultValue: Sys.currentModule,
        value: Sys.currentModule,
        className: "select-after",
        onChange: changeModuleValue
      }, [/*#__PURE__*/React.createElement(Select.Option, {
        value: ''
      }, intl('所有'))].concat(_toConsumableArray(_toConsumableArray(mst.Modules.values()).map(function (module) {
        return /*#__PURE__*/React.createElement(Select.Option, {
          value: module.id,
          key: module.id
        }, module.label);
      }))))
    })), /*#__PURE__*/React.createElement("div", {
      className: "console-erd-search btns"
    }, mst.sys.tabOrTree && /*#__PURE__*/React.createElement(Button, {
      size: "small",
      type: "text",
      onClick: checkAllFun
    }, intl('选择所有')), mst.sys.tabOrTree && /*#__PURE__*/React.createElement(Button, {
      size: "small",
      type: "text",
      onClick: checkAllCancleFun
    }, intl('清除所有')), /*#__PURE__*/React.createElement(Button, {
      size: "small",
      type: "text",
      onClick: toggleShowNameOrLabel
    }, intl('显示'), !mst.sys.showNameOrLabel ? intl('名称') : intl('标签')), !Sys.onlyMode && /*#__PURE__*/React.createElement(Dropdown, {
      className: "right",
      overlay: /*#__PURE__*/React.createElement(Menu, null, /*#__PURE__*/React.createElement(Menu.Item, {
        key: "1",
        onClick: toggleTabOrTree
      }, !Sys.tabOrTree ? intl('分类') : intl('树形'), ' ', intl('模式')))
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(EllipsisOutlined, null))))), /*#__PURE__*/React.createElement("div", {
      className: "navitree-warp"
    }, /*#__PURE__*/React.createElement(Scroll, {
      autoHide: true,
      autoHeight: true,
      autoHideTimeout: 1000,
      autoHideDuration: 200,
      autoHeightMin: '100%',
      autoHeightMax: '100%'
    }, /*#__PURE__*/React.createElement(Tree, {
      showIcon: false,
      className: "console-models-tree-tree",
      onSelect: mst.sys.setCurrentModel.bind(mst.sys),
      selectedKeys: [mst.sys.currentModel],
      checkedKeys: _toConsumableArray(mst.sys.checkedKeys),
      onCheck: mst.setCheckedKeys.bind(mst),
      checkable: true,
      onExpand: onExpand,
      multiple: true,
      expandedKeys: _toConsumableArray(mst.sys.expandedKeys)
    }, treeNodes))));
  },
  displayName: 'navi'
});
var useLocal = function useLocal() {
  var mst = useMst();
  var _useState = useState(mst.sys.search),
    _useState2 = _slicedToArray(_useState, 2),
    text = _useState2[0],
    setText = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    texting = _useState4[0],
    setTexting = _useState4[1];
  // 重复setText 导致快速输入时inputValue显示异常
  // useEffect(() => {
  //     if (!texting) debounce(() => {
  //         setText(mst.sys.search);

  //     }, 1000)()//时间设置太长导致input框未能即使更新设置值
  // }, [mst.sys.search])

  var setSearch = useCallback(function (val) {
    setTexting(true);
    setText(val);
    debounce(function () {
      mst.sys.setSearch(val);
      setTexting(false);
    }, 500)();
  }, [mst.sys.setSearch, setText]);
  // const setSearch = mst.sys.setSearch;
  return {
    search: text,
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
    setSearch: setSearch
  };
};