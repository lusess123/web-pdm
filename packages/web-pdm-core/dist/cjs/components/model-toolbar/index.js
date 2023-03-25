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

// src/components/model-toolbar/index.tsx
var model_toolbar_exports = {};
__export(model_toolbar_exports, {
  default: () => model_toolbar_default
});
module.exports = __toCommonJS(model_toolbar_exports);
var import_classnames = __toESM(require("classnames"));
var import_react = __toESM(require("react"));
var import_mobx_react = require("mobx-react");
var import_util = require("../../util");
var import_context = require("../../context");
var import_react_color = require("react-color");
var import_lodash = require("lodash");
var model_toolbar_default = (0, import_mobx_react.observer)(({ graph }) => {
  var _a;
  const mst = (0, import_context.useMst)();
  const intl = mst.intl;
  const undoManager = mst.undoManager;
  const { Tooltip, Popover } = mst.Ui;
  const _IconRenders = { ...mst.Ui.IconRenders };
  const [colorPabel, setColorPabel] = (0, import_react.useState)(false);
  const setColor = (0, import_react.useCallback)(
    (0, import_lodash.throttle)((color) => {
      mst.Ui.setThemeColor(color.hex);
    }, 200),
    [colorPabel]
  );
  const zoomNum = graph && (0, import_util.changeTwoDecimal_f)(parseFloat(((_a = mst.graph) == null ? void 0 : _a.zoom) * 100 + "") + "") || 0;
  if (!graph)
    return /* @__PURE__ */ import_react.default.createElement("div", { className: "console-erd-toolbar" }, intl("正在初始化中"), "....");
  return /* @__PURE__ */ import_react.default.createElement("div", { className: "console-erd-toolbar" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "right" }, /* @__PURE__ */ import_react.default.createElement(
    ButtonActon,
    {
      IconRenders: _IconRenders,
      key: 1,
      Tooltip,
      title: intl("撤销"),
      color: mst.Ui.darkness && undoManager.canUndo ? mst.Ui.themeColor : void 0,
      disable: !undoManager.canUndo,
      icon: "undo",
      onClick: mst.undo.bind(mst)
    }
  ), /* @__PURE__ */ import_react.default.createElement(
    ButtonActon,
    {
      IconRenders: _IconRenders,
      key: 2,
      Tooltip,
      title: intl("重做"),
      color: mst.Ui.darkness && undoManager.canRedo ? mst.Ui.themeColor : void 0,
      disable: !undoManager.canRedo,
      icon: "redo",
      onClick: mst.redo.bind(mst)
    }
  ), /* @__PURE__ */ import_react.default.createElement(
    ButtonActon,
    {
      IconRenders: _IconRenders,
      key: 3,
      Tooltip,
      title: intl("放大"),
      color: mst.Ui.darkness ? mst.Ui.themeColor : void 0,
      disable: zoomNum >= 100,
      icon: "max",
      onClick: mst.graph.maxZoom.bind(mst.graph, graph)
    }
  ), /* @__PURE__ */ import_react.default.createElement("span", { className: "zoomNum noselect" }, graph && `${zoomNum >= 100 ? 100 : zoomNum}%`), /* @__PURE__ */ import_react.default.createElement(
    ButtonActon,
    {
      IconRenders: _IconRenders,
      key: 4,
      Tooltip,
      title: intl("缩小"),
      color: mst.Ui.darkness ? mst.Ui.themeColor : void 0,
      disable: zoomNum < 5,
      icon: "min",
      onClick: mst.graph.minZoom.bind(mst.graph, graph)
    }
  ), /* @__PURE__ */ import_react.default.createElement(
    ButtonActon,
    {
      IconRenders: _IconRenders,
      key: 5,
      Tooltip,
      title: intl("全景"),
      color: mst.Ui.darkness ? mst.Ui.themeColor : void 0,
      icon: "full",
      onClick: mst.graph.container.bind(mst.graph, graph)
    }
  ), /* @__PURE__ */ import_react.default.createElement(
    ButtonActon,
    {
      IconRenders: _IconRenders,
      key: 6,
      Tooltip,
      title: intl(
        !mst.sys.disableMiniMap ? "显示小地图" : "屏蔽小地图"
      ),
      color: mst.Ui.darkness ? mst.Ui.themeColor : void 0,
      icon: mst.sys.disableMiniMap ? "miniMap" : "miniMapNo",
      onClick: mst.sys.setDisableMiniMap.bind(
        mst.sys,
        !mst.sys.disableMiniMap
      )
    }
  ), /* @__PURE__ */ import_react.default.createElement(
    ButtonActon,
    {
      IconRenders: _IconRenders,
      key: 7,
      Tooltip,
      title: intl("刷新数据"),
      color: mst.Ui.darkness ? mst.Ui.themeColor : void 0,
      icon: "reload",
      onClick: mst.reload.bind(mst)
    }
  ), /* @__PURE__ */ import_react.default.createElement(
    ButtonActon,
    {
      IconRenders: _IconRenders,
      key: 8,
      Tooltip,
      title: intl("下载图片"),
      color: mst.Ui.darkness ? mst.Ui.themeColor : void 0,
      icon: "image",
      onClick: mst.graph.downAsImage.bind(mst.graph, graph)
    }
  ), /* @__PURE__ */ import_react.default.createElement(
    ButtonActon,
    {
      IconRenders: _IconRenders,
      key: 9,
      Tooltip,
      title: mst.sys.dagreLayout ? intl("切换层次布局") : intl("切换关联布局"),
      icon: !mst.sys.dagreLayout ? "dagreLayout" : "relationLayout",
      color: mst.Ui.darkness ? mst.Ui.themeColor : void 0,
      onClick: mst.sys.setDagreLayout.bind(
        mst.sys,
        !mst.sys.dagreLayout
      )
    }
  ), /* @__PURE__ */ import_react.default.createElement(
    ButtonActon,
    {
      IconRenders: _IconRenders,
      key: 10,
      Tooltip,
      title: intl("切换底色"),
      icon: mst.Ui.darkness ? "darkness" : "light",
      color: mst.Ui.darkness ? mst.Ui.themeColor : void 0,
      onClick: mst.Ui.setDarkness.bind(mst.Ui, !mst.Ui.darkness)
    }
  ), /* @__PURE__ */ import_react.default.createElement(
    Popover,
    {
      placement: "rightTop",
      arrowPointAtCenter: true,
      footer: null,
      content: /* @__PURE__ */ import_react.default.createElement(
        import_react_color.SketchPicker,
        {
          color: mst.Ui.themeColor,
          onChange: setColor
        }
      ),
      visible: colorPabel
    },
    /* @__PURE__ */ import_react.default.createElement(
      ButtonActon,
      {
        IconRenders: _IconRenders,
        Tooltip,
        title: `${intl("点击")}${colorPabel ? intl("关闭") : intl("打开")} ${intl("颜色面板")}`,
        color: mst.Ui.themeColor,
        icon: colorPabel ? "colorClose" : "colorOpen",
        onClick: setColorPabel.bind(null, !colorPabel)
      }
    )
  )));
});
var ButtonActon = (0, import_util.CreateComponent)({
  render: (props) => {
    const mst = (0, import_context.useMst)();
    const { Tooltip } = props;
    if (mst.Ui.disableIcons.indexOf(props.icon) >= 0)
      return null;
    const IconRender = (0, import_react.isValidElement)(props.icon) ? props.icon : props.IconRenders[props.icon];
    return /* @__PURE__ */ import_react.default.createElement(Tooltip, { title: props.title }, /* @__PURE__ */ import_react.default.createElement(
      "span",
      {
        style: { color: props.color },
        className: (0, import_classnames.default)({
          enable: !props.disable,
          "command-btn": true
        }),
        onClick: !props.disable ? props.onClick : void 0
      },
      IconRender
    ));
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
