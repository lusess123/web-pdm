function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// import mst from '@antv/g6/lib/algorithm/mst'

// import { mapToArrary } from '../util'
import { initStyle } from "./item/style";
var getLength = function getLength(length) {
  return length >= 20 ? length : 20;
};
export var createData = function createData(root) {
  //alert('createData')
  var t0 = +new Date();
  var _initStyle = initStyle({
      primaryColor: root.Ui.themeColor
    }),
    style = _initStyle.style,
    colors = _initStyle.colors;
  var res = _toConsumableArray(root.Models.values()).filter(function (a) {
    return !root.sys.dagreLayout || root.sys.dagreLayout && a.aggregateModelKey;
  }).map(function (m) {
    return {
      id: 'model-' + m.id,
      type: 'console-model-Node',
      isKeySharp: root.graph.zoom <= 0.4,
      visible: !!root.sys.checkedKeys.find(function (a) {
        return a === m.id;
      }),
      selected: m.id === root.sys.currentModel,
      showNameOrLabel: root.sys.showNameOrLabel,
      config: {
        width: 300,
        headerHeight: 48,
        fieldHeight: 32,
        labelSize: 14,
        styleConfig: style,
        colors: colors
      },
      data: {
        moduleKey: m.moduleId,
        label: m.label,
        fields: m.fields.map(function (a) {
          return _objectSpread(_objectSpread({}, a), {}, {
            relationModel: a.relationModel
          });
        }),
        key: m.id,
        name: m.name,
        tag: 'aggregate',
        aggregateRoot: m.aggregateRoot,
        aggregateModelKey: m.aggregateModelKey,
        belongAggregate: m.belongAggregate,
        nodeSize: (48 + getLength(m.fields.length) * 48) / 6 * 6 / 6
      },
      themeColor: colors.blue,
      darkness: root.Ui.darkness,
      size: (48 + getLength(m.fields.length) * 48) / 6 * 6
    };
  }).filter(function (a) {
    return a.visible;
  });
  //const t1 = +new Date()
  // console.log(res)
  //alert(res.length +  '   ' + (t1 - t0))
  if (res.length > 0) return res.concat([createSysNode()]);
  return res;
};
var createSysNode = function createSysNode() {
  return {
    id: 'model-SYS-CENTER-POINT',
    type: 'circle',
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
  ToOne: '1:1',
  ToMany: '1:n',
  lookup: '查找',
  toOne: '1:1',
  toMany: '1:n',
  Lookup: '查找'
};
export var createLinks = function createLinks(root) {
  var _initStyle2 = initStyle({
      primaryColor: root.Ui.themeColor
    }),
    style = _initStyle2.style;
  var links = _toConsumableArray(root.Models.values()).reduce(function (pre, model) {
    if (!root.sys.checkedKeys.find(function (a) {
      return a === model.id;
    })) return pre;
    var sysLink = {
      key: 'model-' + model.id + '~' + 'model-SYS-CENTER-POINT',
      source: 'model-' + model.id,
      // target: 'model-' + relationModel!.id,
      // visible: false,
      isSys: true,
      // style: {
      //   visible: false,
      // },
      target: 'model-SYS-CENTER-POINT',
      type: 'console-line',
      style: {
        opacity: 0
      }
    };
    var fieldLinks = model.fields.reduce(function (fPre, field, i) {
      var tempfPre = fPre;
      // const { id } = field
      if (Array.isArray(field.typeMeta)) {
        var arr = field.typeMeta.forEach(function (element) {
          var isRelation = element.type === 'Relation' && (element === null || element === void 0 ? void 0 : element.relationModel);
          if (isRelation) {
            if (root.sys.onIgnoreEdge && root.sys.onIgnoreEdge(field)) return fPre;
            var relationModel = root.findModelByName(element.relationModel);
            if (!relationModel || !root.sys.checkedKeys.find(function (a) {
              return a === relationModel.id;
            })) return fPre;
            var isTo = true;
            var l = model.fields.length;
            var sourceAnchor = !isTo ? i + 2 : 2 + i + l;
            var targetTable = _toConsumableArray(root.Models.values()).find(function (pre) {
              return pre.id === relationModel.id;
            });
            var targetTableFieldIndex = (targetTable === null || targetTable === void 0 ? void 0 : targetTable.fields.findIndex(function (item) {
              return item.name === element.field;
            })) + 2;
            var relationEdge = {
              key: 'model-' + model.id + '~' + 'model-' + relationModel.id,
              source: 'model-' + model.id,
              target: 'model-' + relationModel.id,
              sourceAnchor: sourceAnchor,
              targetAnchor: targetTableFieldIndex,
              fieldIndex: i,
              tooltip: "<div>\u4ECE <span class='text'>".concat(relationModel === null || relationModel === void 0 ? void 0 : relationModel.label, "</span> \u5230 <span class='text'>").concat(model === null || model === void 0 ? void 0 : model.label, "=> ").concat(element.field, "</span> ").concat(Relation[field.type] || field.type, " \u5173\u7CFB</div>"),
              fieldsLength: l,
              style: style.fieldRelation.edge,
              type: 'console-line',
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
          } else return tempfPre;
        });
      } else {
        var _field$typeMeta;
        var isRelation = field.typeMeta && field.typeMeta.type === 'Relation' && ((_field$typeMeta = field.typeMeta) === null || _field$typeMeta === void 0 ? void 0 : _field$typeMeta.relationModel);
        if (isRelation) {
          if (root.sys.onIgnoreEdge && root.sys.onIgnoreEdge(field)) return fPre;
          //if(field?.typeMeta?.relationModel === 'base_User' && (confirmEnding(field.name, 'createdBy') || confirmEnding(field.name,'updatedBy')  ) ) return fPre
          var relationModel = root.findModelByName(field.typeMeta.relationModel);
          if (!relationModel || !root.sys.checkedKeys.find(function (a) {
            return a === relationModel.id;
          })) return fPre;
          var isTo = true;
          var l = model.fields.length;
          var sourceAnchor = !isTo ? i + 2 : 2 + i + l;
          return [].concat(_toConsumableArray(fPre), [{
            key: 'model-' + model.id + '~' + 'model-' + relationModel.id,
            source: 'model-' + model.id,
            target: 'model-' + relationModel.id,
            sourceAnchor: sourceAnchor,
            // // targetAnchor: sourceAnchor,
            targetAnchor: model.id === relationModel.id ? sourceAnchor - 1 : undefined,
            fieldIndex: i,
            tooltip: "<div>\u4ECE <span class='text'>".concat(relationModel === null || relationModel === void 0 ? void 0 : relationModel.label, "</span> \u5230 <span class='text'>").concat(model === null || model === void 0 ? void 0 : model.label, "</span> ").concat(Relation[field.type] || field.type, " \u5173\u7CFB</div>"),
            fieldsLength: l,
            style: style.default.edge,
            type: 'console-line',
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
                stroke: '#fff',
                lineWidth: 30
              }
            }
          }]);
        }
      }
      return fPre;
    }, []);
    return [].concat(_toConsumableArray(pre), _toConsumableArray(fieldLinks), [sysLink]);
  }, []);
  return links.filter(function (a) {
    return !!a;
  });
};

// export const getNodes = (models, styleConfig) => {
//     // const _key = stateConfig.model_keys.key
//     const nodeRes = models
//       .map((model, i) => {
//         return {
//           id: 'model-' + model.key,
//           hide: checkedKeys.indexOf('model-' + model.key) === -1,
//           // groupId: `module-${model.moduleKey}`,
//           config: {
//             width: 300,
//             headerHeight: 48,
//             fieldHeight: 32,
//             labelSize: 14 ,
//             hide: checkedKeys.indexOf('model-' + model.key) === -1,
//             styleConfig,
//           },
//           data: {
//             moduleKey: `module-${model.moduleKey}`,
//             label: showLable(model),
//             fields: fields(model, models),
//             key: model.key,
//             name: model.name || model.key,
//             tag: 'aggregate',
//             aggregateRoot:  model.aggregateRoot,
//             aggregateModelKey: model.aggregateModelKey,
//             belongAggregate: model.belongAggregate,
//             nodeSize:  ((48 +  getLength(model.fields.length) * 48) / 6) *
//             6  / 6,
//           },
//           type: 'console-model-Node',
//           isKeySharp: true,
//           size:   ((48 +  getLength(model.fields.length) * 48) / 6) *
//           6 ,
//         }
//       })

//     return nodeRes.length > 0 ? nodeRes.concat([createSysNode()]) : nodeRes

//     // })
//   }