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

// src/graph/item/util.tsx
var util_exports = {};
__export(util_exports, {
  getBottomAnch: () => getBottomAnch,
  getEngGroup: () => getEngGroup,
  getLeftAnch: () => getLeftAnch,
  getLen: () => getLen,
  getLength: () => getLength,
  getRightAnch: () => getRightAnch,
  getSplitStrings: () => getSplitStrings,
  getTopAnch: () => getTopAnch,
  isEng: () => isEng,
  setNodeStateAttr: () => setNodeStateAttr
});
module.exports = __toCommonJS(util_exports);
var setNodeStateAttr = (state, s, cfg) => {
  if (cfg.config.styleConfig[state]) {
    Object.entries(cfg.config.styleConfig[state].node).forEach(([k, v]) => {
      s.attr(k, v);
    });
  }
};
var isEng = (str) => {
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode < 0 || charCode > 128) {
      return false;
    }
  }
  return true;
};
var getSplitStrings = (str) => {
  if (isEng(str))
    return getEngGroup(str);
  const reg = /.{5}/g;
  const rs = str.match(reg) || [str];
  rs.push(str.substring(rs.join("").length));
  return rs;
};
var getEngGroup = (str) => {
  const regExp = new RegExp("(?<!^)([A-Z]", "g");
  const strs = str.replace(regExp, `-$1`);
  return strs.split("-");
};
var getLen = (str) => {
  let realLength = 0, len = str.length, charCode = -1;
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128)
      realLength += 1;
    else
      realLength += 2;
  }
  return realLength;
};
var getTopAnch = (num, y = 0) => {
  let res = [];
  for (let i = 0; i < num; i++) {
    res.push([(i + 1) / num, y]);
  }
  return res;
};
var getBottomAnch = (num, y = 1) => {
  let res = [];
  for (let i = 0; i <= num; i++) {
    res.push([i / num, y]);
  }
  return res;
};
var getLeftAnch = (num, x = 0) => {
  let res = [];
  for (let i = 0; i < num; i++) {
    res.push([x, (i + 1) / num]);
  }
  return res;
};
var getRightAnch = (num, x = 1) => {
  let res = [];
  for (let i = 0; i <= num; i++) {
    res.push([x, i / num]);
  }
  return res;
};
var getLength = (length) => {
  return length >= 8 ? length : 8;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getBottomAnch,
  getEngGroup,
  getLeftAnch,
  getLen,
  getLength,
  getRightAnch,
  getSplitStrings,
  getTopAnch,
  isEng,
  setNodeStateAttr
});
