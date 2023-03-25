function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class, _class2, _descriptor;
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
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
import { model, Model, prop, modelAction, objectMap, getSnapshot } from 'mobx-keystone';
import { computed } from 'mobx';
import { without, union } from 'lodash';
import { TModel } from "./model";
import { TModule } from "./module";
// import { TField ,MetaType  } from './field'
import { TSys } from "./sys";
import { TGraph } from "./graph";
import { createData, createLinks } from "../graph/data";
import { renderModelTitle as _renderModelTitle } from "../util/label";
// import StateStack from '../state-stack'
// import { undoManager } from '../context'

import { TUi } from "./ui";
import IntlMap from "../intl";
var getLayerRootModel = function getLayerRootModel(models, rootKey) {
  var roots = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var rootModel = models.find(function (a) {
    return a.name === rootKey;
  });
  var rootsRes = rootModel ? [].concat(_toConsumableArray(roots), [rootKey]) : roots;
  var isRoot = rootModel.aggregateModelKey && rootModel.aggregateModelKey !== rootKey;
  var rootsResList = isRoot ? getLayerRootModel(models, rootModel.aggregateModelKey, rootsRes) : rootsRes;
  return rootsResList;
};
export var arrangeShow = function arrangeShow(ss, _ref) {
  var model = _ref.model;
  // alert(model)
  var roots = getLayerRootModel(ss.models, model, []);
  // alert(JSON.stringify(roots))
  var list = ss.models.filter(function (a) {
    return a.key === model || roots.indexOf(a.aggregateModelKey) >= 0;
  }).map(function (a) {
    return 'model-' + a.key;
  });
  return _objectSpread(_objectSpread({}, ss), {}, {
    checkedKeys: list,
    currentModel: model,
    isArrangeLayout: true
  });
};
function S4() {
  return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
}
function NewGuid() {
  return S4();
  //return globaIndex ++
}

function MapProp() {
  return prop(function () {
    return objectMap();
  });
  // return prop_mapObject<(Map<string, T>)>(() => new Map())
}

export var RootInstance = (_dec = model('webpdm/RootStore'), _dec(_class = (_class2 = /*#__PURE__*/function (_Model) {
  _inherits(RootInstance, _Model);
  var _super = _createSuper(RootInstance);
  function RootInstance() {
    var _this;
    _classCallCheck(this, RootInstance);
    for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "undoManager", void 0);
    _defineProperty(_assertThisInitialized(_this), "Fields", new Map());
    _defineProperty(_assertThisInitialized(_this), "onReload", void 0);
    _defineProperty(_assertThisInitialized(_this), "onIntl", void 0);
    _initializerDefineProperty(_assertThisInitialized(_this), "setCheckedKeys", _descriptor, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(RootInstance, [{
    key: "setOnReload",
    value: function setOnReload(onReload) {
      this.onReload = onReload;
    }
  }, {
    key: "intl",
    value: function intl(text) {
      var newText = this.onIntl && this.onIntl(text);
      if (newText) {
        return newText;
      }
      var intlmap = IntlMap[this.sys.intl];
      if (intlmap) return intlmap[text] || text;else return text;
      //    return text
    }
  }, {
    key: "setUndoManager",
    value: function setUndoManager(undoManager) {
      this.undoManager = undoManager;
    }
  }, {
    key: "setFields",
    value: function setFields(fields) {
      this.Fields = fields;
    }
  }, {
    key: "moduleList",
    get: function get() {
      return _toConsumableArray(this.Modules.values());
    }
  }, {
    key: "Nodes",
    get: function get() {
      var data = createData(this);
      //alert(data.length)
      return data;
    }
  }, {
    key: "edges",
    get: function get() {
      return createLinks(this);
    }
  }, {
    key: "arrangeShow",
    value: function arrangeShow(rootKey) {
      // alert(rootKey)]
      var models = _toConsumableArray(this.Models.values());
      var roots = getLayerRootModel(models, rootKey, []);
      //alert(JSON.stringify(roots))
      var list = models.filter(function (a) {
        return a.name === rootKey || roots.indexOf(a.aggregateModelKey) >= 0;
      }).map(function (a) {
        return a.id;
      });
      // alert(JSON.stringify(list))
      this.sys.setCheckedKeys(list);
      //const list = ss.models.filter((a) => (a.key === model ||  roots.indexOf(a.aggregateModelKey) >= 0)).map((a) => 'model-' + a.key)
    }
  }, {
    key: "findModelByName",
    value: function findModelByName(name) {
      return _toConsumableArray(this.Models.values()).find(function (a) {
        return a.name === name;
      });
    }
  }, {
    key: "renderModelTitle",
    value: function renderModelTitle(model) {
      return _renderModelTitle(model.label, this.sys.search, this.sys.showNameOrLabel, model.name);
    }

    // @modelAction
    // init({ modelData, moduleData, height }: { modelData: any, moduleData: any, height: any }) {

    //       let moduleHas: Record<string, string> = {}
    //       moduleData.forEach((module: any) => {
    //             const key = NewGuid().toString()
    //             this.Modules.set(key, new TModule({ id: key, label: module.name, name: module.key }))
    //             moduleHas[module.key] = key
    //             this.sys.expandedKeys.push(key)

    //       })
    //       let modelsKeys: string[] = []
    //       modelData.forEach((model: any) => {
    //             const key = NewGuid().toString()
    //             this.Models.set(key, new TModel({ id: key, aggregateModelKey: m.aggregateModelKey, label: model.name, name: model.key, moduleId: moduleHas[model.moduleKey] || '' }))
    //             model.fields.forEach((field: any) => {
    //                   const _key = NewGuid().toString()
    //                   this.Fields.set(_key, new TField({ id: _key, typeMeta: (field.typeMeta ? new  MetaType(field.typeMeta ) : undefined ), label: field.name, name: field.key, type: field.type || 'string', modelId: key }))
    //             })
    //             modelsKeys.push(key)

    //       })
    //       this.sys.checkedKeys = modelsKeys
    //       this.sys.height = height
    //       // alert( this.sys.height)
    // }
  }, {
    key: "initData",
    value: function initData(models, modules, sys) {
      var _this2 = this;
      var t0 = +new Date();
      var moduleHas = {};
      modules.forEach(function (module) {
        var key = NewGuid().toString();
        _this2.Modules.set(key, new TModule({
          id: key,
          label: module.label,
          name: module.name
        }));
        moduleHas[module.name] = key;
        _this2.sys.expandedKeys.push(key);
      });
      var t1 = +new Date();
      var modelsKeys = [];
      var modelHas = {};
      // alert(models.length)
      models.forEach(function (model) {
        var key = NewGuid().toString();
        _this2.Models.set(key, new TModel({
          id: key,
          belongAggregate: model.belongAggregate,
          aggregateModelKey: model.aggregateModelKey,
          aggregateRoot: model.aggregateRoot,
          label: model.label,
          name: model.name,
          moduleId: moduleHas[model.module] || ''
        }));
        modelHas[model.name] = key;
        modelsKeys.push(key);
      });
      models.forEach(function (model) {
        model.fields.forEach(function (field) {
          var _field$typeMeta;
          // if( i > 3) return
          var _key = NewGuid().toString();
          var relationModel = field === null || field === void 0 ? void 0 : (_field$typeMeta = field.typeMeta) === null || _field$typeMeta === void 0 ? void 0 : _field$typeMeta.relationModel;
          var tmodel = relationModel ? _this2.Models.get(modelHas[relationModel]) : undefined;
          // const { label , name , id } = tmodel ||
          _this2.Fields.set(_key, {
            id: _key,
            label: field.label,
            name: field.name,
            type: field.type || 'string',
            modelId: modelHas[model.name],
            typeMeta: field.typeMeta,
            relationModel: tmodel && getSnapshot(tmodel)
          });
          if (tmodel) console.log(tmodel.name);
          // this.Fields.set(_key, new TField({}).init({ id: _key, typeMeta: (field.typeMeta ? new  MetaType(field.typeMeta ) : undefined ), label: field.label, name: field.name, type: field.type || 'string', modelId: key }))
        });
        // modelsKeys.push(key)
      });

      var t2 = +new Date();
      this.sys.setCheckedKeys(modelsKeys);
      if (sys !== null && sys !== void 0 && sys.height) {
        this.sys.height = sys.height;
      }
      var t = +new Date();
      // alert('initData  :' +  (t1 - t0) + '   ' + (t2 -t1) + '   ' +  (t - t2) )
    }
  }, {
    key: "reload",
    value: function reload() {
      // alert('刷新')
      if (this.onReload) {
        var data = this.onReload();
        if (data) {
          this.Models.clear();
          this.Modules.clear();
          this.Fields.clear();
          this.initData(data.models, data.modules);
          // this.sys.checkedKeys = data.models.map(a=>a.)
          // this.sys.currentModel = ''
        }
      }
    }
  }, {
    key: "undo",
    value: function undo() {
      //     const current = StateStack.DataList.length - 1
      //     const state : any = StateStack.DataList[current - 1]
      //     const state = StateStack.undo()
      //     console.log(state)
      //     window.lockSnapshot = true
      this.undoManager.undo();
      //     this.sys.snapshot = false
      // alert('undo ' + state.sys.showNameOrLabel)
      //     applySnapshot(this,state)
      //     window.lockSnapshot = false
    }
  }, {
    key: "redo",
    value: function redo() {
      // const state = StateStack.redo()
      // console.log(state)
      // window.lockSnapshot = true
      // applySnapshot(this,state)
      this.undoManager.redo();
    }
  }, {
    key: "checkAllFun",
    value: function checkAllFun() {
      var _this$Modules$get, _this$Modules$get$mod;
      var currentModule = this.sys.currentModule;
      var modelIds = currentModule ? (_this$Modules$get = this.Modules.get(currentModule)) === null || _this$Modules$get === void 0 ? void 0 : (_this$Modules$get$mod = _this$Modules$get.models) === null || _this$Modules$get$mod === void 0 ? void 0 : _this$Modules$get$mod.map(function (a) {
        return a.id;
      }) : _toConsumableArray(this.Models.values()).map(function (a) {
        return a.id;
      });
      this.sys.checkedKeys = union(this.sys.checkedKeys, modelIds);
    }
  }, {
    key: "checkAllCancleFun",
    value: function checkAllCancleFun() {
      var _this$Modules$get2, _this$Modules$get2$mo;
      var currentModule = this.sys.currentModule;
      if (!currentModule) this.sys.checkedKeys = [];
      // const models = [...this.Models.values()]
      var modelIds = (_this$Modules$get2 = this.Modules.get(currentModule)) === null || _this$Modules$get2 === void 0 ? void 0 : (_this$Modules$get2$mo = _this$Modules$get2.models) === null || _this$Modules$get2$mo === void 0 ? void 0 : _this$Modules$get2$mo.map(function (a) {
        return a.id;
      });
      this.sys.checkedKeys = _toConsumableArray(without.apply(void 0, [_toConsumableArray(this.sys.checkedKeys)].concat(_toConsumableArray(modelIds || []))));
    }
  }, {
    key: "onInit",
    value: function onInit() {
      // alert('sys onInit')
      // alert(this.tabOrTree)
      this.intl = this.intl.bind(this);
    }
  }]);
  return RootInstance;
}(Model({
  sys: prop(),
  Models: MapProp(),
  Modules: MapProp(),
  // Fields: MapProp<TField>(),
  graph: prop(function () {
    return new TGraph({});
  }),
  Ui: prop(function () {
    return new TUi({});
  })
})), (_applyDecoratedDescriptor(_class2.prototype, "moduleList", [computed], Object.getOwnPropertyDescriptor(_class2.prototype, "moduleList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "Nodes", [computed], Object.getOwnPropertyDescriptor(_class2.prototype, "Nodes"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "edges", [computed], Object.getOwnPropertyDescriptor(_class2.prototype, "edges"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "arrangeShow", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "arrangeShow"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "findModelByName", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "findModelByName"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "renderModelTitle", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "renderModelTitle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "initData", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "initData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reload", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "reload"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "undo", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "undo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "redo", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "redo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkAllFun", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "checkAllFun"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkAllCancleFun", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "checkAllCancleFun"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "setCheckedKeys", [modelAction], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;
    return function (keys) {
      if (!_this3.sys.tabOrTree) {
        _this3.sys.checkedKeys = keys;
      } else {
        var modelKeys = _toConsumableArray(_this3.Models.values()).filter(function (a) {
          return !_this3.sys.currentModule || a.moduleId === _this3.sys.currentModule;
        }).map(function (a) {
          return a.id;
        });
        var withoutKeys = without.apply(void 0, [modelKeys].concat(_toConsumableArray(keys)));
        _this3.sys.checkedKeys = union(without.apply(void 0, [_this3.sys.checkedKeys].concat(_toConsumableArray(withoutKeys))), keys);
      }
    };
  }
})), _class2)) || _class);
export var createStore = function createStore() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    sys: {},
    graph: {},
    components: {},
    Ui: {},
    IconRenders: undefined,
    disableIcons: []
  };
  // alert(JSON.stringify(props.sys.onlyMode))
  var ui = new TUi(props.Ui);
  ui.registComponents(props.components, props.IconRenders, props.disableIcons);
  return new RootInstance({
    $modelId: 'webpdm',
    sys: new TSys(_objectSpread({
      isArrangeLayout: false,
      layouting: true,
      search: ''
    }, props.sys)),
    Ui: ui,
    graph: new TGraph(_objectSpread({}, props.graph))
    // Ui: new TUi(Ui)
  });
};