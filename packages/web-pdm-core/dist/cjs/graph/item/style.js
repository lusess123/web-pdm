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

// src/graph/item/style.tsx
var style_exports = {};
__export(style_exports, {
  initStyle: () => initStyle
});
module.exports = __toCommonJS(style_exports);
var import_g6_min = __toESM(require("@antv/g6/dist/g6.min.js"));
var initStyle = ({ primaryColor }) => {
  const colors = {
    blue: primaryColor,
    white: "#FFFFFF",
    head: primaryColor,
    black: "black"
  };
  const style = {
    naviWidth: 370,
    default: {
      node: {
        fill: "#FFFFFF",
        shadowColor: "rgba(0,0,0,0.2)",
        shadowBlur: 10,
        shadowOffsetX: 0.5,
        shadowOffsetY: 0.5,
        radius: 10,
        // stroke: undefined,
        lineWidth: 4,
        opacity: 0.9,
        stroke: "rgba(0,0,0,0.01)"
      },
      edge: {
        lineWidth: 2,
        size: 2,
        lineAppendWidth: 4,
        endArrow: {
          path: import_g6_min.default.Arrow.triangleRect(10, 10, 10, 2, 4)
          // fill: primaryColor,
        },
        startArrow: {
          path: import_g6_min.default.Arrow.circle(3, 3),
          // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
          //  fill: primaryColor,
          //  shadowColor: primaryColor,
          //  opacity: 1,
          d: 6
        },
        //  startArrow: {
        //   //  path: 'M 24,0 L -24,-12 L 8,0 L -24,12 Z',
        //   //  d: 2,
        //    fill: 'rgba(11,108,149)',
        //    shadowColor: 'rgba(0,0,0,0.1)',
        //   //  opacity: 1,
        //  },
        //  opacity: 0.2,
        radius: 5,
        labelCfg: {
          autoRotate: true,
          // 使文本随边旋转
          style: {
            fontSize: 34
          }
        },
        stroke: primaryColor
      }
    },
    selected: {
      node: {
        stroke: "rgba(11,108,149)",
        shadowColor: "rgba(11,108,149)"
      }
    },
    isNoModule: {
      node: {
        opacity: 0.2
      }
    },
    fieldRelation: {
      node: {
        fill: "#FFFFFF",
        shadowColor: "rgba(0,0,0,0.2)",
        shadowBlur: 10,
        shadowOffsetX: 0.5,
        shadowOffsetY: 0.5,
        radius: 10,
        // stroke: undefined,
        lineWidth: 4,
        opacity: 0.9,
        stroke: "rgba(0,0,0,0.01)"
      },
      edge: {
        lineWidth: 2,
        size: 2,
        lineAppendWidth: 4,
        endArrow: {
          path: import_g6_min.default.Arrow.triangle(5, 10, 10),
          d: 10
        },
        startArrow: {
          path: import_g6_min.default.Arrow.circle(3, 3),
          // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
          //  fill: primaryColor,
          //  shadowColor: primaryColor,
          //  opacity: 1,
          d: 6
        },
        //  startArrow: {
        //   //  path: 'M 24,0 L -24,-12 L 8,0 L -24,12 Z',
        //   //  d: 2,
        //    fill: 'rgba(11,108,149)',
        //    shadowColor: 'rgba(0,0,0,0.1)',
        //   //  opacity: 1,
        //  },
        //  opacity: 0.2,
        radius: 5,
        labelCfg: {
          autoRotate: true,
          // 使文本随边旋转
          style: {
            fontSize: 34
          }
        },
        stroke: primaryColor
      }
    }
  };
  return {
    colors,
    style
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initStyle
});
