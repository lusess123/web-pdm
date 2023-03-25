var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/model-navi/index.tsx
var model_navi_exports = {};
__export(model_navi_exports, {
  default: () => model_navi_default
});
module.exports = __toCommonJS(model_navi_exports);
var import_icons = require("@ant-design/icons");
var import_lodash = require("lodash");
var import_react = __toESM(require("react"));
var import_react_custom_scrollbars = __toESM(require("react-custom-scrollbars"));
var import_util = require("../../util");
var import_context = require("../../context");
var import_style = require("./style.scss");
console.log("hezk test =======");
var getTreeNodeTitle = (model, root, OptionBuilder) => {
  return /* @__PURE__ */ import_react.default.createElement(
    OptionBuilder,
    {
      data: {
        title: root.renderModelTitle(model),
        options: [
          {
            title: /* @__PURE__ */ import_react.default.createElement("span", null, " ", root.intl("定位模型")),
            key: 1,
            click: (e) => {
              root.sys.centerCurrentModel([model.id]);
              e.stopPropagation();
            }
          },
          {
            key: 2,
            title: /* @__PURE__ */ import_react.default.createElement("span", null, " ", root.intl("查看")),
            click: (e) => {
              root.sys.openModel(model.id);
              e.stopPropagation();
            }
          }
          // {
          //   title: <span> {intlLiteral('移除')}</span>
          // },
        ]
      }
    }
  );
};
var model_navi_default = (0, import_util.CreateComponent)({
  render(_) {
    const mst = (0, import_context.useMst)();
    const intl = mst.intl;
    const { Input, Button, Dropdown, Menu, Select, Tree } = mst.Ui;
    const { TreeNode, OptionBuilder } = Tree;
    const treeNodes = (0, import_react.useMemo)(
      () => !mst.sys.tabOrTree ? mst.moduleList.map((m) => {
        return /* @__PURE__ */ import_react.default.createElement(
          TreeNode,
          {
            title: mst.sys.showNameOrLabel ? m.name : m.label,
            key: m.id
          },
          [...m.models.values()].filter((model) => model.filterModel()).map((model) => {
            return /* @__PURE__ */ import_react.default.createElement(
              TreeNode,
              {
                key: model.id,
                title: getTreeNodeTitle(
                  model,
                  mst,
                  OptionBuilder
                )
              }
            );
          })
        );
      }) : [...mst.Models.values()].filter(
        (model) => (!mst.sys.currentModule || model.moduleId === mst.sys.currentModule) && model.filterModel()
      ).map((model) => {
        return /* @__PURE__ */ import_react.default.createElement(
          TreeNode,
          {
            key: model.id,
            title: getTreeNodeTitle(
              model,
              mst,
              OptionBuilder
            )
          }
        );
      }),
      [
        mst.sys.tabOrTree,
        mst.moduleList,
        mst.sys.showNameOrLabel,
        mst.sys.currentModule,
        mst.sys.search
        //打包后没有执行，添加search确保执行
      ]
    );
    (0, import_react.useEffect)(() => {
    }, [mst.Ui.update]);
    const {
      search,
      onExpand,
      checkAllFun,
      checkAllCancleFun,
      toggleShowNameOrLabel,
      toggleTabOrTree,
      Sys,
      changeModuleValue,
      setSearch
    } = useLocal();
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: "console-models-tree",
        style: { height: mst.sys.height }
      },
      /* @__PURE__ */ import_react.default.createElement("div", { className: "header" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "console-erd-search" }, /* @__PURE__ */ import_react.default.createElement(
        Input,
        {
          allowClear: true,
          value: search,
          size: "small",
          onChange: (e) => setSearch(e.target.value),
          addonAfter: Sys.tabOrTree && /* @__PURE__ */ import_react.default.createElement(
            Select,
            {
              size: "small",
              defaultValue: Sys.currentModule,
              value: Sys.currentModule,
              className: "select-after",
              onChange: changeModuleValue
            },
            [
              /* @__PURE__ */ import_react.default.createElement(Select.Option, { value: "" }, intl("所有")),
              ...[...mst.Modules.values()].map(
                (module2) => {
                  return /* @__PURE__ */ import_react.default.createElement(
                    Select.Option,
                    {
                      value: module2.id,
                      key: module2.id
                    },
                    module2.label
                  );
                }
              )
            ]
          )
        }
      )), /* @__PURE__ */ import_react.default.createElement("div", { className: "console-erd-search btns" }, mst.sys.tabOrTree && /* @__PURE__ */ import_react.default.createElement(
        Button,
        {
          size: "small",
          type: "text",
          onClick: checkAllFun
        },
        intl("选择所有")
      ), mst.sys.tabOrTree && /* @__PURE__ */ import_react.default.createElement(
        Button,
        {
          size: "small",
          type: "text",
          onClick: checkAllCancleFun
        },
        intl("清除所有")
      ), /* @__PURE__ */ import_react.default.createElement(
        Button,
        {
          size: "small",
          type: "text",
          onClick: toggleShowNameOrLabel
        },
        intl("显示"),
        !mst.sys.showNameOrLabel ? intl("名称") : intl("标签")
      ), !Sys.onlyMode && /* @__PURE__ */ import_react.default.createElement(
        Dropdown,
        {
          className: "right",
          overlay: /* @__PURE__ */ import_react.default.createElement(Menu, null, /* @__PURE__ */ import_react.default.createElement(
            Menu.Item,
            {
              key: "1",
              onClick: toggleTabOrTree
            },
            !Sys.tabOrTree ? intl("分类") : intl("树形"),
            " ",
            intl("模式")
          ))
        },
        /* @__PURE__ */ import_react.default.createElement("span", null, /* @__PURE__ */ import_react.default.createElement(import_icons.EllipsisOutlined, null))
      ))),
      /* @__PURE__ */ import_react.default.createElement("div", { className: "navitree-warp" }, /* @__PURE__ */ import_react.default.createElement(
        import_react_custom_scrollbars.default,
        {
          autoHide: true,
          autoHeight: true,
          autoHideTimeout: 1e3,
          autoHideDuration: 200,
          autoHeightMin: "100%",
          autoHeightMax: "100%"
        },
        /* @__PURE__ */ import_react.default.createElement(
          Tree,
          {
            showIcon: false,
            className: "console-models-tree-tree",
            onSelect: mst.sys.setCurrentModel.bind(mst.sys),
            selectedKeys: [mst.sys.currentModel],
            checkedKeys: [...mst.sys.checkedKeys],
            onCheck: mst.setCheckedKeys.bind(mst),
            checkable: true,
            onExpand,
            multiple: true,
            expandedKeys: [...mst.sys.expandedKeys]
          },
          treeNodes
        )
      ))
    );
  },
  displayName: "navi"
});
var useLocal = () => {
  const mst = (0, import_context.useMst)();
  const [text, setText] = (0, import_react.useState)(mst.sys.search);
  const [texting, setTexting] = (0, import_react.useState)(false);
  const setSearch = (0, import_react.useCallback)(
    (val) => {
      setTexting(true);
      setText(val);
      (0, import_lodash.debounce)(() => {
        mst.sys.setSearch(val);
        setTexting(false);
      }, 500)();
    },
    [mst.sys.setSearch, setText]
  );
  return {
    search: text,
    get modules() {
      return mst.moduleList;
    },
    onExpand(expandedKeys) {
      mst.sys.setExpandedKeys(expandedKeys);
    },
    get expandedKeys() {
      return mst.sys.expandedKeys;
    },
    checkAllFun() {
      return mst.checkAllFun();
    },
    checkAllCancleFun() {
      return mst.checkAllCancleFun();
    },
    toggleShowNameOrLabel: mst.sys.toggleShowNameOrLabel,
    toggleTabOrTree: mst.sys.toggleTabOrTree.bind(mst.sys),
    get Sys() {
      return mst.sys;
    },
    changeModuleValue: mst.sys.changeModuleValue.bind(mst.sys),
    setSearch
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
