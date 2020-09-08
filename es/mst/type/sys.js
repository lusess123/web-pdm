var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

import { model, Model, prop, modelAction, getRoot } from 'mobx-keystone';
import { toCenter } from '../util/graph';
export var TSys = (_dec = model("webpdm/TSys"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Model) {
  _inherits(TSys, _Model);

  var _super = _createSuper(TSys);

  function TSys() {
    var _this;

    _classCallCheck(this, TSys);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "setExpandedKeys", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "toggleTabOrTree", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "changeModuleValue", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "setSearch", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "toggleShowNameOrLabel", _descriptor5, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(TSys, [{
    key: "toggleArrangeLayout",
    value: function toggleArrangeLayout() {
      this.isArrangeLayout = !this.isArrangeLayout;
    }
  }, {
    key: "setCurrentModel",
    value: function setCurrentModel(keys) {
      var newKey = keys.length > 1 ? keys[1] : keys[0];
      var root = getRoot(this); //root.graph.G6Graph

      var graph = root.graph.G6Graph;

      if (graph) {
        var item = graph.findById('model-' + newKey);
        if (item) item.toFront();
      }

      this.currentModel = newKey;
      root.graph.actionEdges(newKey);
    }
  }, {
    key: "centerCurrentModel",
    value: function centerCurrentModel(keys) {
      var newKey = keys.length > 1 ? keys[1] : keys[0];
      this.currentModel = newKey;
      var root = getRoot(this); //root.graph.G6Graph

      var graph = root.graph.G6Graph;

      if (graph) {
        var item = graph.findById('model-' + newKey);
        if (item) item.toFront();
        toCenter(item, graph);
      } //toCenter(   , root.graph.G6Graph)

    }
  }, {
    key: "onInit",
    value: function onInit() {
      // alert('sys onInit')
      this.toggleShowNameOrLabel = this.toggleShowNameOrLabel.bind(this);
    }
  }]);

  return TSys;
}(Model({
  search: prop(''),
  layouting: prop(false),
  isArrangeLayout: prop(false),
  expandedKeys: prop(function () {
    return [];
  }),
  currentModel: prop(''),
  currentModule: prop(''),
  checkedKeys: prop(function () {
    return [];
  }),
  showNameOrLabel: prop(false),
  tabOrTree: prop(false),
  snapshot: prop(true) // undoData: prop<UndoStore>(() => new UndoStore({})),

})), _temp), (_applyDecoratedDescriptor(_class2.prototype, "toggleArrangeLayout", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleArrangeLayout"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "setExpandedKeys", [modelAction], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (keys) {
      _this2.expandedKeys = keys;
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setCurrentModel", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "setCurrentModel"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "centerCurrentModel", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "centerCurrentModel"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "toggleTabOrTree", [modelAction], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function () {
      _this3.tabOrTree = !_this3.tabOrTree;
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "changeModuleValue", [modelAction], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (module) {
      _this4.currentModule = module;
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "setSearch", [modelAction], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (search) {
      _this5.search = search;
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "toggleShowNameOrLabel", [modelAction], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function () {
      _this6.showNameOrLabel = !_this6.showNameOrLabel;
    };
  }
})), _class2)) || _class);