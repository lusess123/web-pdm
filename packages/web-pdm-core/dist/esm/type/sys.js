function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
import { model, Model, prop, modelAction, getRoot } from 'mobx-keystone';
import { toCenter } from "../util/graph";
export var TSys = (_dec = model('webpdm/TSys'), _dec(_class = (_class2 = /*#__PURE__*/function (_Model) {
  _inherits(TSys, _Model);
  var _super = _createSuper(TSys);
  function TSys() {
    var _this;
    _classCallCheck(this, TSys);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "onIgnoreEdge", void 0);
    _defineProperty(_assertThisInitialized(_this), "onModelDetail", void 0);
    _initializerDefineProperty(_assertThisInitialized(_this), "setExpandedKeys", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_assertThisInitialized(_this), "setCheckedKeys", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_assertThisInitialized(_this), "toggleTabOrTree", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_assertThisInitialized(_this), "changeModuleValue", _descriptor4, _assertThisInitialized(_this));
    _initializerDefineProperty(_assertThisInitialized(_this), "setSearch", _descriptor5, _assertThisInitialized(_this));
    _initializerDefineProperty(_assertThisInitialized(_this), "toggleShowNameOrLabel", _descriptor6, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(TSys, [{
    key: "setOnIgnoreEdge",
    value: function setOnIgnoreEdge(onIgnoreEdge) {
      this.onIgnoreEdge = onIgnoreEdge;
    }
  }, {
    key: "setOnModelDetail",
    value: function setOnModelDetail(onModelDetail) {
      this.onModelDetail = onModelDetail;
    }
  }, {
    key: "toggleArrangeLayout",
    value: function toggleArrangeLayout() {
      this.isArrangeLayout = !this.isArrangeLayout;
    }
  }, {
    key: "setDisableMiniMap",
    value: function setDisableMiniMap(disableMiniMap) {
      this.disableMiniMap = disableMiniMap;
    }
  }, {
    key: "setCurrentModel",
    value: function setCurrentModel(keys) {
      var n0 = +new Date();
      var newKey = keys.length > 1 ? keys[1] : keys[0];
      var root = getRoot(this);
      //root.graph.G6Graph
      var graph = root.graph.G6Graph;
      if (graph) {
        var item = graph.findById('model-' + newKey);
        if (item) item.toFront();
      }
      this.currentModel = newKey;
      var n1 = +new Date();
      // alert(n1 - n0)
      //root.graph.actionEdges(newKey)
    }
  }, {
    key: "centerCurrentModel",
    value: function centerCurrentModel(keys) {
      var newKey = keys.length > 1 ? keys[1] : keys[0];
      this.currentModel = newKey;
      var root = getRoot(this);
      //root.graph.G6Graph
      var graph = root.graph.G6Graph;
      if (graph) {
        var item = graph.findById('model-' + newKey);
        if (item) item.toFront();
        toCenter(item, graph);
        root.graph.setZoom(graph.getZoom());
      }

      //toCenter(   , root.graph.G6Graph)
    }
  }, {
    key: "openModel",
    value: function openModel(key) {
      // const newKey = keys.length > 1 ? keys[1] : keys[0]
      // this.currentModel = newKey
      var root = getRoot(this);
      //root.graph.G6Graph
      var graph = root.graph.G6Graph;
      if (graph) {
        var item = graph.findById('model-' + key);
        if (this.onModelDetail) this.onModelDetail(item.getModel().data);
        // if (item) item.toFront()
        // toCenter(item, graph)
        // root.graph.setZoom(graph.getZoom())
      }

      //toCenter(   , root.graph.G6Graph)
    }
  }, {
    key: "onInit",
    value: function onInit() {
      // alert('sys onInit')
      // alert(this.tabOrTree)
      this.toggleShowNameOrLabel = this.toggleShowNameOrLabel.bind(this);
    }
  }, {
    key: "setDagreLayout",
    value: function setDagreLayout(dagreLayout) {
      this.dagreLayout = dagreLayout;
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
  snapshot: prop(true),
  height: prop('100%'),
  dagreLayout: prop(false),
  intl: prop('CH'),
  disableMiniMap: prop(false),
  onlyMode: prop(false)
  // undoData: prop<UndoStore>(() => new UndoStore({})),
})), (_applyDecoratedDescriptor(_class2.prototype, "toggleArrangeLayout", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleArrangeLayout"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "setExpandedKeys", [modelAction], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;
    return function (keys) {
      _this2.expandedKeys = keys;
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "setCheckedKeys", [modelAction], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;
    return function (keys) {
      _this3.checkedKeys = keys;
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setDisableMiniMap", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "setDisableMiniMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCurrentModel", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "setCurrentModel"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "centerCurrentModel", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "centerCurrentModel"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "openModel", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "openModel"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "toggleTabOrTree", [modelAction], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;
    return function () {
      _this4.tabOrTree = !_this4.tabOrTree;
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "changeModuleValue", [modelAction], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;
    return function (module) {
      _this5.currentModule = module;
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "setSearch", [modelAction], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;
    return function (search) {
      // alert(search)
      _this6.search = search;
    };
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "toggleShowNameOrLabel", [modelAction], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;
    return function () {
      _this7.showNameOrLabel = !_this7.showNameOrLabel;
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setDagreLayout", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "setDagreLayout"), _class2.prototype)), _class2)) || _class);