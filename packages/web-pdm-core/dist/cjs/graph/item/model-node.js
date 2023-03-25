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

// src/graph/item/model-node.tsx
var model_node_exports = {};
__export(model_node_exports, {
  register: () => register
});
module.exports = __toCommonJS(model_node_exports);
var import_g6_min = __toESM(require("@antv/g6/dist/g6.min.js"));
var import_type = require("./type");
var import_util = require("./util");
var register = (mst) => {
  import_g6_min.default.registerNode(
    "console-model-Node",
    {
      getAnchorPoints(cfg) {
        const { config, data } = cfg;
        const { fields } = data;
        const h = config.headerHeight + (0, import_util.getLength)(fields.length) * config.fieldHeight;
        return [
          [0, config.headerHeight / 2 / h],
          // 左上方
          [1, config.headerHeight / 2 / h],
          // 右上方
          ...fields.map((_, index) => {
            const x = 0;
            const l = config.headerHeight + config.fieldHeight * (index + 1) - config.fieldHeight / 2;
            const y = l / h;
            return [x, y];
          }),
          ...fields.map((_, index) => {
            const x = 1;
            const l = config.headerHeight + config.fieldHeight * (index + 1) - config.fieldHeight / 2;
            const y = l / h;
            return [x, y];
          }),
          ...(0, import_util.getTopAnch)(50),
          ...(0, import_util.getBottomAnch)(50),
          ...(0, import_util.getLeftAnch)(100),
          ...(0, import_util.getRightAnch)(100)
        ];
      },
      update(cfg, item) {
        const whiteBg = "rgba(7,10,26,0.06)";
        const {
          isKeySharp,
          active,
          selected,
          into,
          inactive,
          isCardSharp,
          out,
          isNoModule,
          showNameOrLabel,
          config,
          themeColor,
          darkness
        } = cfg;
        const { colors } = config;
        const group = item.getContainer();
        const children = group.get("children");
        const bg = darkness ? themeColor : whiteBg;
        const font = darkness ? colors.white : themeColor;
        const mFront = darkness ? colors.white : themeColor;
        children.forEach((s) => {
          const id = s.attr("id");
          switch (id) {
            case "keySharp":
              (0, import_util.setNodeStateAttr)("default", s, cfg);
              inactive && (0, import_util.setNodeStateAttr)("inactive", s, cfg);
              active && (0, import_util.setNodeStateAttr)("active", s, cfg);
              into && (0, import_util.setNodeStateAttr)("into", s, cfg);
              out && (0, import_util.setNodeStateAttr)("out", s, cfg);
              if (isCardSharp) {
                (0, import_util.setNodeStateAttr)("cardSharp", s, cfg);
                if (!s.attr("old_fill")) {
                  s.attr("old_fill", s.attr("fill"));
                }
              } else {
                if (s.attr("old_fill")) {
                  s.attr("fill", s.attr("old_fill"));
                }
              }
              if (cfg.data.aggregateModelKey || cfg.data.aggregateRoot) {
                s.attr("stroke", themeColor);
                s.attr("shadowColor", themeColor);
              }
              selected && (0, import_util.setNodeStateAttr)("selected", s, cfg);
              break;
            case "headerlabel1.1":
            case "headerlabel1.2":
              s.set(
                "visible",
                !cfg.isKeySharp && active && !cfg.isCardSharp
              );
              break;
            case "headerlabel0":
            case "headerlabel1":
              const fieldLable1 = s.attr("fieldLable");
              if (fieldLable1) {
                s.attr(
                  "text",
                  showNameOrLabel ? fieldLable1 : s.attr("nameLable")
                );
              }
              s.set(
                "visible",
                !cfg.isKeySharp && !cfg.isCardSharp
              );
              s.attr(
                "fill",
                selected && !darkness ? cfg.config.styleConfig.selected.node.stroke : font
              );
              break;
            case "header":
              s.attr(
                "fill",
                selected && darkness ? cfg.config.styleConfig.selected.node.stroke : bg
              );
              s.set(
                "visible",
                !cfg.isCardSharp && !cfg.isKeySharp
              );
              break;
            case "headerlabel2":
            case "headerlabel3":
              const _showNameOrLabel = s.get("showNameOrLabel");
              s.attr("fill", themeColor);
              if (_showNameOrLabel && showNameOrLabel) {
                s.set("visible", cfg.isKeySharp && !isCardSharp);
              } else {
                if (!_showNameOrLabel && !showNameOrLabel)
                  s.set(
                    "visible",
                    cfg.isKeySharp && !isCardSharp
                  );
                else {
                  s.set("visible", false);
                }
              }
              break;
            case "field":
              const isInactive = inactive && !into && !out && !active ? 0.2 : 1;
              const isO = !cfg.isKeySharp && !s.attr("fieldHoverShow") ? isInactive : 0;
              s.set("visible", !cfg.isKeySharp);
              const fieldLable = s.attr("fieldLable");
              if (fieldLable) {
                s.attr(
                  "text",
                  showNameOrLabel ? fieldLable : s.attr("nameLable")
                );
              }
              if (!!s.get("themeColor")) {
                s.attr(
                  "fill",
                  selected ? cfg.config.styleConfig.selected.node.stroke : themeColor
                );
              }
              break;
            case "field-text":
              s.set("visible", !cfg.isKeySharp);
            case "field-line":
              s.set("visible", !cfg.isKeySharp);
              break;
            case "themeColor":
              s.attr(
                "fill",
                selected ? cfg.config.styleConfig.selected.node.stroke : themeColor
              );
              break;
            default:
              break;
          }
        });
        if (cfg.hide) {
          item.hide();
        } else {
          item.show();
        }
      },
      render(cfg, group) {
        const {
          config,
          data,
          selected,
          showNameOrLabel,
          themeColor,
          darkness
        } = cfg;
        const whiteBg = "rgba(7,10,26,0.06)";
        const { colors } = config;
        const bg = darkness ? themeColor : whiteBg;
        const font = darkness ? colors.white : themeColor;
        const mFront = darkness ? colors.white : themeColor;
        const nodeColors = { bg, font, mFront };
        group.addShape("rect", {
          visible: !cfg.isKeySharp,
          name: data.key,
          draggable: true,
          attrs: {
            y: -((0, import_util.getLength)(data.fields.length) * config.fieldHeight / 2) - config.headerHeight / 2,
            x: -(config.width / 2),
            width: config.width,
            height: config.headerHeight,
            radius: [10, 10, 0, 0],
            // text: data.label,
            id: "header",
            // fontSize: config.fieldHeight - 12,
            // opacity: !cfg.isKeySharp ? 1 : 0,
            className: "header",
            shadowColor: "rgba(0,0,0,0.06)",
            cursor: "move",
            // shadowBlur: 1,
            // shadowOffsetX: 1,
            // shadowOffsetY: 2,
            // radius: [2, 4],
            fill: selected ? config.styleConfig.selected.node.stroke : bg
          }
        });
        group.addShape("text", {
          visible: !cfg.isKeySharp,
          name: data.key,
          fontFamily: "",
          draggable: true,
          attrs: {
            // fontFamily: 'iconFont',
            x: -(config.width / 2) + 20,
            y: -((0, import_util.getLength)(data.fields.length) * config.fieldHeight / 2),
            text: showNameOrLabel ? data.name : data.label,
            fieldLable: data.name,
            nameLable: data.label,
            // text: '\ue6b2',
            id: "headerlabel1",
            cursor: "move",
            fontSize: config.fieldHeight / 2,
            // opacity: !cfg.isKeySharp ? 1 : 0,
            className: "headerlabel",
            textBaseline: "middle",
            textAlign: "left",
            fontWeight: 20,
            // radius: [2, 4],
            fill: nodeColors.mFront
          }
        });
        cfg.data.aggregateModelKey && group.addShape("text", {
          visible: cfg.data.aggregateModelKey,
          name: data.key,
          fontFamily: "",
          draggable: true,
          attrs: {
            fontFamily: "iconFont",
            x: config.width / 2 - 100,
            y: -((0, import_util.getLength)(data.fields.length) * config.fieldHeight / 2),
            text: "聚合关系",
            arg: cfg.data.aggregateModelKey,
            // text: cfg.data.aggregateModelKey,
            // text: '\ue6b2',
            id: "headerlabel1",
            cursor: "pointer",
            click: "arrangeShow",
            // cursor: 'move',
            fontSize: config.labelSize,
            // opacity: !cfg.isKeySharp ? 1 : 0,
            className: "headerlabel",
            textBaseline: "middle",
            textAlign: "left",
            // radius: [2, 4],
            fill: nodeColors.font
          }
        });
        group.addShape("text", {
          visible: !cfg.isKeySharp,
          name: data.key,
          fontFamily: "",
          draggable: true,
          attrs: {
            fontFamily: "iconFont",
            x: config.width / 2 - 40,
            y: -((0, import_util.getLength)(data.fields.length) * config.fieldHeight / 2),
            text: "查看",
            // text: '\ue6b2',
            id: "headerlabel1",
            cursor: "pointer",
            click: "modelEdit",
            // cursor: 'move',
            fontSize: config.labelSize,
            // opacity: !cfg.isKeySharp ? 1 : 0,
            className: "headerlabel",
            textBaseline: "middle",
            textAlign: "left",
            // radius: [2, 4],
            fill: nodeColors.font
          }
        });
        const nameList = [data.label];
        const height = config.headerHeight + (data.fields.length >= 12 ? data.fields.length : 12) * config.fieldHeight;
        const nameLength = nameList.length;
        nameList.forEach((nameText, index) => {
          group.addShape("text", {
            visible: cfg.isKeySharp && !showNameOrLabel && !cfg.isCardSharp,
            name: nameText,
            showNameOrLabel: false,
            draggable: true,
            attrs: {
              x: 0,
              y: -height / 2 + height / (nameLength + 1) * (index + 1),
              fontSize: config.width / 5,
              text: nameText,
              // opacity: index === nameLength - 1 ? 1 : 0.3,
              id: "headerlabel2",
              className: "headerlabel",
              textBaseline: "middle",
              textAlign: "center",
              // radius: [2, 4],
              fill: themeColor
            }
          });
        });
        const nameList1 = [data.name];
        const height1 = config.headerHeight + (data.fields.length >= 12 ? data.fields.length : 12) * config.fieldHeight;
        const nameLength1 = nameList.length;
        nameList1.forEach((nameText, index) => {
          group.addShape("text", {
            visible: cfg.isKeySharp && showNameOrLabel && !cfg.isCardSharp,
            showNameOrLabel: true,
            name: nameText,
            draggable: true,
            attrs: {
              x: 0,
              y: -height1 / 2 + height1 / (nameLength1 + 1) * (index + 1),
              fontSize: config.width / 5,
              text: nameText,
              // opacity: index === nameLength - 1 ? 1 : 0.3,
              id: "headerlabel2",
              className: "headerlabel",
              textBaseline: "middle",
              textAlign: "center",
              // radius: [2, 4],
              fill: themeColor
            }
          });
        });
        data.fields.forEach((field, index) => {
          var _a, _b, _c, _d, _e, _f, _g;
          const isForeign = field.typeMeta;
          const relationModel = (_a = field == null ? void 0 : field.typeMeta) == null ? void 0 : _a.relationModel;
          const y = -((config.headerHeight + (0, import_util.getLength)(data.fields.length) * config.fieldHeight) / 2) + config.headerHeight + config.fieldHeight * index + config.fieldHeight / 2 - 2;
          group.addShape("rect", {
            visible: !cfg.isKeySharp,
            name: field.id,
            draggable: true,
            attrs: {
              x: -(config.width / 2) + 2,
              fieldName: field.id,
              name: field.id,
              draggable: true,
              fieldBg: true,
              arg: field.name,
              fieldHover: true,
              y: -((config.headerHeight + (0, import_util.getLength)(data.fields.length) * config.fieldHeight) / 2) + config.headerHeight + config.fieldHeight * index,
              // stroke: 'black',
              width: config.width - 4,
              id: "field",
              height: config.fieldHeight,
              fill: "white",
              cursor: "move"
            }
          });
          group.addShape("path", {
            visible: !cfg.isKeySharp,
            draggable: true,
            name: field.id,
            attrs: {
              draggable: true,
              fieldName: field.id,
              id: "field-line",
              name: field.id,
              path: [
                ["M", -config.width / 2 + 20, y + 2],
                ["L", config.width / 2 - 40, y + 2]
              ],
              stroke: "rgba(0,0,0,0.60)",
              lineWidth: 1,
              lineDash: [5, 5],
              opacity: 0.1
            }
          });
          const showCircle = isForeign;
          showCircle && group.addShape("circle", {
            visible: true,
            name: field.id,
            draggable: true,
            themeColor: true,
            attrs: {
              x: -(config.width / 2) + 10,
              fieldName: field.id,
              name: field.id,
              draggable: true,
              arg: field.name,
              fieldHover: true,
              y: -((config.headerHeight + (0, import_util.getLength)(data.fields.length) * config.fieldHeight) / 2) + config.headerHeight + config.fieldHeight * index + config.fieldHeight / 2 - 2,
              id: "field",
              r: 2,
              fill: themeColor,
              cursor: "move"
            }
          });
          group.addShape("text", {
            visible: !cfg.isKeySharp,
            name: field.id,
            draggable: true,
            themeColor: isForeign,
            attrs: {
              x: -config.width / 2 + 20,
              fieldHover: true,
              name: field.id,
              draggable: true,
              // click: 'fieldEdit',
              y: -((config.headerHeight + (0, import_util.getLength)(data.fields.length) * config.fieldHeight) / 2) + config.headerHeight + config.fieldHeight * index + config.fieldHeight / 2,
              text: showNameOrLabel ? field.name : field.label,
              fieldLable: field.name,
              nameLable: field.label,
              fieldName: field.id,
              arg: field.name,
              fontSize: config.labelSize,
              textBaseline: "middle",
              cursor: "move",
              id: "field",
              textAlign: "start",
              fill: isForeign ? themeColor : "rgba(0,0,0,0.60)"
              // fill: 'rgb(153,153,153)',
            }
          });
          const relationModelText = showNameOrLabel ? (_b = field == null ? void 0 : field.relationModel) == null ? void 0 : _b.name : (_c = field == null ? void 0 : field.relationModel) == null ? void 0 : _c.label;
          group.addShape("text", {
            visible: !cfg.isKeySharp,
            name: field.id,
            draggable: true,
            themeColor: isForeign,
            attrs: {
              x: config.width / 2 - 20,
              fieldHover: !isForeign,
              // click: 'fieldEdit',
              y: -((config.headerHeight + (0, import_util.getLength)(data.fields.length) * config.fieldHeight) / 2) + config.headerHeight + config.fieldHeight * index + config.fieldHeight / 2,
              text: isForeign && relationModelText ? relationModelText : `${field.type || ""}`,
              fieldLable: isForeign ? field.type && import_type.Relation[field.type] ? `${(_d = field == null ? void 0 : field.relationModel) == null ? void 0 : _d.name}(${import_type.Relation[field.type] || ""})` : (_e = field == null ? void 0 : field.relationModel) == null ? void 0 : _e.name : `${field.type || ""}`,
              nameLable: isForeign ? field.type && import_type.Relation[field.type] ? `${(_f = field == null ? void 0 : field.relationModel) == null ? void 0 : _f.label}(${import_type.Relation[field.type] || ""})` : (_g = field == null ? void 0 : field.relationModel) == null ? void 0 : _g.label : `${field.type || ""}`,
              id: "field",
              textBaseline: "middle",
              fieldName: field.id,
              arg: field,
              fontSize: config.labelSize,
              click: isForeign ? "fieldSelect" : void 0,
              textAlign: "right",
              cursor: isForeign ? "pointer" : "undefined",
              fill: isForeign ? themeColor : "rgba(0,0,0,0.30)"
            }
          });
          isForeign && group.addShape("circle", {
            visible: true,
            name: field.id,
            draggable: true,
            themeColor: true,
            attrs: {
              x: config.width / 2 - 10,
              fieldName: field.id,
              name: field.id,
              draggable: true,
              arg: field.name,
              fieldHover: true,
              y: -((config.headerHeight + (0, import_util.getLength)(data.fields.length) * config.fieldHeight) / 2) + config.headerHeight + config.fieldHeight * index + config.fieldHeight / 2 - 2,
              id: "field",
              r: 2,
              fill: themeColor,
              cursor: "move"
            }
          });
        });
        const diffLength = (0, import_util.getLength)(data.fields.length) - data.fields.length;
        if (diffLength) {
          for (let i = 0; i < diffLength; i++) {
            group.addShape("rect", {
              name: i,
              draggable: true,
              visible: !cfg.isKeySharp,
              attrs: {
                x: -(config.width / 2) + 2,
                y: -((config.headerHeight + (0, import_util.getLength)(data.fields.length) * config.fieldHeight) / 2) + config.headerHeight + config.fieldHeight * (data.fields.length + i),
                // stroke: 'black',
                width: config.width - 4,
                id: "field",
                height: config.fieldHeight,
                fill: "white",
                cursor: "move"
              }
              // ---
            });
          }
        }
      },
      draw(cfg, group) {
        const { config, data, selected } = cfg;
        const height = config.headerHeight + (0, import_util.getLength)(data.fields.length) * config.fieldHeight;
        let keyShape = group.addShape("rect", {
          name: data.key,
          draggable: true,
          // visible: false,
          attrs: {
            id: "keySharp",
            x: -(config.width / 2),
            y: -height / 2,
            width: config.width,
            cursor: "move",
            // fill:'red',
            height: height + 10,
            ...cfg.config.styleConfig.default.node,
            stroke: selected ? cfg.config.styleConfig.selected.node.stroke : cfg.config.styleConfig.default.node.stroke
          }
        });
        this.render(cfg, group);
        return keyShape;
      }
    },
    "single-shape"
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  register
});
