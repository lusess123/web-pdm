var _dec, _class, _class2, _descriptor, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

import { model, Model, prop, modelAction, objectMap } from 'mobx-keystone';
import { computed } from 'mobx';
import { without, union } from 'lodash';
import { TModel } from './model';
import { TModule } from './module';
import { TField, MetaType } from './field';
import { TSys } from './sys';
import { TGraph } from './graph';
import { createData, createLinks } from '../graph/data';
import { renderModelTitle as _renderModelTitle } from '../util/label'; // import StateStack from '../state-stack'

import { undoManager } from '../context';

function S4() {
  return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
}

function NewGuid() {
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

function MapProp() {
  return prop(function () {
    return objectMap();
  }); // return prop_mapObject<(Map<string, T>)>(() => new Map())
}

export var RootInstance = (_dec = model("webpdm/RootStore"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Model) {
  _inherits(RootInstance, _Model);

  var _super = _createSuper(RootInstance);

  function RootInstance() {
    var _this;

    _classCallCheck(this, RootInstance);

    for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "setCheckedKeys", _descriptor, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(RootInstance, [{
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
  }, {
    key: "init",
    value: function init(_ref) {
      var _this2 = this;

      var modelData = _ref.modelData,
          moduleData = _ref.moduleData,
          height = _ref.height;
      var moduleHas = {};
      moduleData.forEach(function (module) {
        var key = NewGuid().toString();

        _this2.Modules.set(key, new TModule({
          id: key,
          label: module.name,
          name: module.key
        }));

        moduleHas[module.key] = key;

        _this2.sys.expandedKeys.push(key);
      });
      var modelsKeys = [];
      modelData.forEach(function (model) {
        var key = NewGuid().toString();

        _this2.Models.set(key, new TModel({
          id: key,
          label: model.name,
          name: model.key,
          moduleId: moduleHas[model.moduleKey] || ''
        }));

        model.fields.forEach(function (field) {
          var _key = NewGuid().toString();

          _this2.Fields.set(_key, new TField({
            id: _key,
            typeMeta: field.typeMeta ? new MetaType(field.typeMeta) : undefined,
            label: field.name,
            name: field.key,
            type: field.type || 'string',
            modelId: key
          }));
        });
        modelsKeys.push(key);
      });
      this.sys.checkedKeys = modelsKeys;
      this.sys.height = height; // alert( this.sys.height)
    }
  }, {
    key: "initData",
    value: function initData(models, modules, sys) {
      var _this3 = this;

      var moduleHas = {};
      modules.forEach(function (module) {
        var key = NewGuid().toString();

        _this3.Modules.set(key, new TModule({
          id: key,
          label: module.label,
          name: module.name
        }));

        moduleHas[module.name] = key;

        _this3.sys.expandedKeys.push(key);
      });
      var modelsKeys = [];
      models.forEach(function (model) {
        var key = NewGuid().toString();

        _this3.Models.set(key, new TModel({
          id: key,
          label: model.name,
          name: model.name,
          moduleId: moduleHas[model.module] || ''
        }));

        model.fields.forEach(function (field) {
          var _key = NewGuid().toString();

          _this3.Fields.set(_key, new TField({
            id: _key,
            typeMeta: field.typeMeta ? new MetaType(field.typeMeta) : undefined,
            label: field.label,
            name: field.name,
            type: field.type || 'string',
            modelId: key
          }));
        });
        modelsKeys.push(key);
      });
      this.sys.checkedKeys = modelsKeys;

      if (sys === null || sys === void 0 ? void 0 : sys.height) {
        this.sys.height = sys.height;
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
      undoManager.undo(); //     this.sys.snapshot = false
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
      undoManager.redo();
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
      if (!currentModule) this.sys.checkedKeys = []; // const models = [...this.Models.values()]

      var modelIds = (_this$Modules$get2 = this.Modules.get(currentModule)) === null || _this$Modules$get2 === void 0 ? void 0 : (_this$Modules$get2$mo = _this$Modules$get2.models) === null || _this$Modules$get2$mo === void 0 ? void 0 : _this$Modules$get2$mo.map(function (a) {
        return a.id;
      });
      this.sys.checkedKeys = _toConsumableArray(without.apply(void 0, [_toConsumableArray(this.sys.checkedKeys)].concat(_toConsumableArray(modelIds || []))));
    }
  }, {
    key: "moduleList",
    get: function get() {
      return _toConsumableArray(this.Modules.values());
    }
  }, {
    key: "Nodes",
    get: function get() {
      var data = createData(this); // alert(data.length)

      return data;
    }
  }, {
    key: "edges",
    get: function get() {
      return createLinks(this);
    }
  }]);

  return RootInstance;
}(Model({
  sys: prop(),
  Models: MapProp(),
  Modules: MapProp(),
  Fields: MapProp(),
  graph: prop(function () {
    return new TGraph({});
  })
})), _temp), (_applyDecoratedDescriptor(_class2.prototype, "moduleList", [computed], Object.getOwnPropertyDescriptor(_class2.prototype, "moduleList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "Nodes", [computed], Object.getOwnPropertyDescriptor(_class2.prototype, "Nodes"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "edges", [computed], Object.getOwnPropertyDescriptor(_class2.prototype, "edges"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "findModelByName", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "findModelByName"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "renderModelTitle", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "renderModelTitle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "init", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "initData", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "initData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "undo", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "undo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "redo", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "redo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkAllFun", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "checkAllFun"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkAllCancleFun", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "checkAllCancleFun"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "setCheckedKeys", [modelAction], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (keys) {
      if (!_this4.sys.tabOrTree) {
        _this4.sys.checkedKeys = keys;
      } else {
        var modelKeys = _toConsumableArray(_this4.Models.values()).filter(function (a) {
          return !_this4.sys.currentModule || a.moduleId === _this4.sys.currentModule;
        }).map(function (a) {
          return a.id;
        });

        var withoutKeys = without.apply(void 0, [modelKeys].concat(_toConsumableArray(keys)));
        _this4.sys.checkedKeys = union(without.apply(void 0, [_this4.sys.checkedKeys].concat(_toConsumableArray(withoutKeys))), keys);
      }
    };
  }
})), _class2)) || _class);
export var createStore = function createStore() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    sys: {},
    graph: {}
  };
  return new RootInstance({
    $modelId: 'webpdm',
    sys: new TSys(_objectSpread({
      isArrangeLayout: false,
      layouting: true,
      search: ''
    }, props.sys)),
    graph: new TGraph(_objectSpread({}, props.graph))
  });
};