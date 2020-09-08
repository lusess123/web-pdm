function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { getSnapshot } from 'mobx-keystone';
// import { mapToArrary } from '../util'
import { initStyle } from './item/style';

var getLength = function getLength(length) {
  return length >= 20 ? length : 20;
};

var _initStyle = initStyle({
  primaryColor: 'blue'
}),
    style = _initStyle.style;

export var createData = function createData(root) {
  var res = _toConsumableArray(root.Models.values()).map(function (m) {
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
        styleConfig: style
      },
      data: {
        moduleKey: m.moduleId,
        label: m.label,
        fields: m.fields.map(function (a) {
          return _objectSpread(_objectSpread({}, getSnapshot(a)), {}, {
            relationModel: getSnapshot(a.relationModel)
          });
        }),
        key: m.id,
        name: m.name,
        tag: 'aggregate',
        // aggregateRoot:  model.aggregateRoot,
        // aggregateModelKey: model.aggregateModelKey,
        // belongAggregate: model.belongAggregate,
        nodeSize: (48 + getLength(m.fields.length) * 48) / 6 * 6 / 6
      },
      size: (48 + getLength(m.fields.length) * 48) / 6 * 6
    };
  }).filter(function (a) {
    return a.visible;
  });

  console.log(res);
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
  lookup: '查找'
};
export var createLinks = function createLinks(root) {
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
      var _field$typeMeta;

      var isRelation = field.typeMeta && field.typeMeta.type === 'Relation' && ((_field$typeMeta = field.typeMeta) === null || _field$typeMeta === void 0 ? void 0 : _field$typeMeta.relationModel); // const { id } = field

      if (isRelation) {
        var relationModel = root.findModelByName(field.typeMeta.relationModel);
        if (!relationModel || !root.sys.checkedKeys.find(function (a) {
          return a === relationModel.id;
        })) return fPre;
        var isTo = true;
        var l = Object.keys(model.fields).length;
        var sourceAnchor = !isTo ? i + 2 : 2 + i + l;
        return [].concat(_toConsumableArray(fPre), [{
          key: 'model-' + model.id + '~' + 'model-' + relationModel.id,
          source: 'model-' + model.id,
          target: 'model-' + relationModel.id,
          sourceAnchor: sourceAnchor,
          // // targetAnchor: sourceAnchor,
          // targetAnchor:  model.key === field.typeMeta.relationModel ? (sourceAnchor - 1) : undefined,
          fieldIndex: i,
          // tooltip: `<div>从 <span class='text'>${relationModel?.label}</span> 到 <span class='text'>${model?.label}</span> ${Relation[field.type]||field.type} 关系</div>`
          // fieldsLength: l,
          style: style.default.edge,
          type: 'console-line',
          label: field.type,
          labelAutoRotate: true,
          loopCfg: {
            // position: 'top',
            clockwise: true,
            // dist: 200,
            dist: 100
          }
        }]);
      } else return fPre;
    }, []);
    return [].concat(_toConsumableArray(pre), _toConsumableArray(fieldLinks), [sysLink]);
  }, []);

  return links.filter(function (a) {
    return !!a;
  });
}; // export const getNodes = (models, styleConfig) => {
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