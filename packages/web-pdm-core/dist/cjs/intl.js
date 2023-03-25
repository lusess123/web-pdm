var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/intl.ts
var intl_exports = {};
__export(intl_exports, {
  default: () => intl_default
});
module.exports = __toCommonJS(intl_exports);
var intl_default = {
  EN: {
    定位模型: "location model",
    查看: "detail",
    所有: "all",
    选择所有: "select all",
    清除所有: "clear all",
    显示: "display",
    名称: "name",
    标签: "label",
    分类: "category",
    模式: "model",
    撤销: "undo",
    重做: "redo",
    放大: "max",
    缩小: "min",
    全景: "full screen",
    刷新数据: "refresh data",
    下载图片: "download image",
    切换层次布局: "togglr dagre layout",
    切换关联布局: "toggle relation layout",
    切换底色: "toggle color",
    点击: "clock",
    关闭: "close",
    打开: "open",
    颜色面板: "color panel"
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
