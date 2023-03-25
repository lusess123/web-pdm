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

// src/graph/data.tsx
var data_exports = {};
__export(data_exports, {
  createData: () => createData,
  createLinks: () => createLinks
});
module.exports = __toCommonJS(data_exports);
var import_style = require("./item/style");
var getLength = (length) => {
  return length >= 20 ? length : 20;
};
var createData = (root) => {
  const t0 = +new Date();
  const { style, colors } = (0, import_style.initStyle)({ primaryColor: root.Ui.themeColor });
  const res = [...root.Models.values()].filter(
    (a) => !root.sys.dagreLayout || root.sys.dagreLayout && a.aggregateModelKey
  ).map((m) => {
    return {
      id: "model-" + m.id,
      type: "console-model-Node",
      isKeySharp: root.graph.zoom <= 0.4,
      visible: !!root.sys.checkedKeys.find((a) => a === m.id),
      selected: m.id === root.sys.currentModel,
      showNameOrLabel: root.sys.showNameOrLabel,
      config: {
        width: 300,
        headerHeight: 48,
        fieldHeight: 32,
        labelSize: 14,
        styleConfig: style,
        colors
      },
      data: {
        moduleKey: m.moduleId,
        label: m.label,
        fields: m.fields.map((a) => ({
          // ...getSnapshot(a) ,
          // relationModel: getSnapshot(a.relationModel)
          ...a,
          relationModel: a.relationModel
        })),
        key: m.id,
        name: m.name,
        tag: "aggregate",
        aggregateRoot: m.aggregateRoot,
        aggregateModelKey: m.aggregateModelKey,
        belongAggregate: m.belongAggregate,
        nodeSize: (48 + getLength(m.fields.length) * 48) / 6 * 6 / 6
      },
      themeColor: colors.blue,
      darkness: root.Ui.darkness,
      size: (48 + getLength(m.fields.length) * 48) / 6 * 6
    };
  }).filter((a) => a.visible);
  if (res.length > 0)
    return res.concat([createSysNode()]);
  return res;
};
var createSysNode = () => {
  return {
    id: "model-SYS-CENTER-POINT",
    type: "circle",
    isSys: true,
    visible: true,
    isKeySharp: true,
    size: 10,
    style: {
      opacity: 0
    }
  };
};
var Relation = {
  ToOne: "1:1",
  ToMany: "1:n",
  lookup: "查找",
  toOne: "1:1",
  toMany: "1:n",
  Lookup: "查找"
};
var createLinks = (root) => {
  const { style } = (0, import_style.initStyle)({ primaryColor: root.Ui.themeColor });
  const links = [...root.Models.values()].reduce((pre, model) => {
    if (!root.sys.checkedKeys.find((a) => a === model.id))
      return pre;
    const sysLink = {
      key: "model-" + model.id + "~model-SYS-CENTER-POINT",
      source: "model-" + model.id,
      // target: 'model-' + relationModel!.id,
      // visible: false,
      isSys: true,
      // style: {
      //   visible: false,
      // },
      target: "model-SYS-CENTER-POINT",
      type: "console-line",
      style: {
        opacity: 0
      }
    };
    const fieldLinks = model.fields.reduce((fPre, field, i) => {
      var _a;
      const tempfPre = fPre;
      if (Array.isArray(field.typeMeta)) {
        const arr = field.typeMeta.forEach((element) => {
          const isRelation = element.type === "Relation" && (element == null ? void 0 : element.relationModel);
          if (isRelation) {
            if (root.sys.onIgnoreEdge && root.sys.onIgnoreEdge(field))
              return fPre;
            const relationModel = root.findModelByName(
              element.relationModel
            );
            if (!relationModel || !root.sys.checkedKeys.find(
              (a) => a === relationModel.id
            ))
              return fPre;
            const isTo = true;
            const l = model.fields.length;
            const sourceAnchor = !isTo ? i + 2 : 2 + i + l;
            const targetTable = [...root.Models.values()].find(
              (pre2) => pre2.id === relationModel.id
            );
            let targetTableFieldIndex = (targetTable == null ? void 0 : targetTable.fields.findIndex(
              (item) => item.name === element.field
            )) + 2;
            const relationEdge = {
              key: "model-" + model.id + "~model-" + relationModel.id,
              source: "model-" + model.id,
              target: "model-" + relationModel.id,
              sourceAnchor,
              targetAnchor: targetTableFieldIndex,
              fieldIndex: i,
              tooltip: `<div>从 <span class='text'>${relationModel == null ? void 0 : relationModel.label}</span> 到 <span class='text'>${model == null ? void 0 : model.label}=> ${element.field}</span> ${Relation[field.type] || field.type} 关系</div>`,
              fieldsLength: l,
              style: style.fieldRelation.edge,
              type: "console-line",
              // label: field.type,
              labelAutoRotate: true,
              loopCfg: {
                // position: 'top',
                clockwise: true,
                // dist: 200,
                dist: 100
              }
            };
            tempfPre.push(relationEdge);
            return tempfPre;
          } else
            return tempfPre;
        });
      } else {
        const isRelation = field.typeMeta && field.typeMeta.type === "Relation" && ((_a = field.typeMeta) == null ? void 0 : _a.relationModel);
        if (isRelation) {
          if (root.sys.onIgnoreEdge && root.sys.onIgnoreEdge(field))
            return fPre;
          const relationModel = root.findModelByName(
            field.typeMeta.relationModel
          );
          if (!relationModel || !root.sys.checkedKeys.find((a) => a === relationModel.id))
            return fPre;
          const isTo = true;
          const l = model.fields.length;
          const sourceAnchor = !isTo ? i + 2 : 2 + i + l;
          return [
            ...fPre,
            {
              key: "model-" + model.id + "~model-" + relationModel.id,
              source: "model-" + model.id,
              target: "model-" + relationModel.id,
              sourceAnchor,
              // // targetAnchor: sourceAnchor,
              targetAnchor: model.id === relationModel.id ? sourceAnchor - 1 : void 0,
              fieldIndex: i,
              tooltip: `<div>从 <span class='text'>${relationModel == null ? void 0 : relationModel.label}</span> 到 <span class='text'>${model == null ? void 0 : model.label}</span> ${Relation[field.type] || field.type} 关系</div>`,
              fieldsLength: l,
              style: style.default.edge,
              type: "console-line",
              label: Relation[field.type] || field.type,
              labelAutoRotate: true,
              loopCfg: {
                // position: 'top',
                clockwise: true,
                // dist: 200,
                dist: 100
              },
              labelCfg: {
                style: {
                  stroke: "#fff",
                  lineWidth: 30
                }
              }
            }
          ];
        }
      }
      return fPre;
    }, []);
    return [...pre, ...fieldLinks, sysLink];
  }, []);
  return links.filter((a) => !!a);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createData,
  createLinks
});
