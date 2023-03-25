function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _dec, _class, _class2;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
import { model, Model, modelAction, prop } from 'mobx-keystone';
// import { Input, Button, Dropdown, Menu, Select, Tooltip, Popover } from 'antd'
// import { Tree } from '../tree'
// import { RootInstance } from '../type'

export var TUi = (_dec = model('webpdm/TUi'), _dec(_class = (_class2 = /*#__PURE__*/function (_Model) {
  _inherits(TUi, _Model);
  var _super = _createSuper(TUi);
  function TUi() {
    var _this;
    _classCallCheck(this, TUi);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "Tree", void 0);
    _defineProperty(_assertThisInitialized(_this), "Input", void 0);
    _defineProperty(_assertThisInitialized(_this), "Button", void 0);
    _defineProperty(_assertThisInitialized(_this), "Dropdown", void 0);
    _defineProperty(_assertThisInitialized(_this), "Menu", void 0);
    _defineProperty(_assertThisInitialized(_this), "Select", void 0);
    _defineProperty(_assertThisInitialized(_this), "Tooltip", void 0);
    _defineProperty(_assertThisInitialized(_this), "Popover", void 0);
    _defineProperty(_assertThisInitialized(_this), "IconRenders", {});
    _defineProperty(_assertThisInitialized(_this), "isToogle", false);
    _defineProperty(_assertThisInitialized(_this), "disableIcons", []);
    return _this;
  }
  _createClass(TUi, [{
    key: "registComponents",
    value: function registComponents(components, IconRenders, disableIcons) {
      var _this2 = this;
      if (components) {
        Object.keys(components).forEach(function (k) {
          _this2[k] = components[k];
        });
      }
      if (IconRenders) this.IconRenders = _objectSpread(_objectSpread({}, this.IconRenders), IconRenders);
      if (disableIcons) this.disableIcons = disableIcons;
      // this.Tree = Tree
      // if (!this.Tree || !components) this.Tree = Tree
      // if (!this.Input || !components) this.Input = Input
      // if (!this.Button || !components) this.Button = Button
      // if (!this.Dropdown || !components) this.Dropdown = Dropdown
      // if (!this.Menu || !components) this.Menu = Menu
      // if (!this.Select || !components) this.Select = Select
      // if (!this.Tooltip || !components) this.Tooltip = Tooltip
      // if (!this.Popover || !components) this.Popover = Popover
    }
  }, {
    key: "toggle",
    value: function toggle(components) {
      this.registComponents(this.isToogle ? undefined : components);
      // const root: RootInstance = getRoot(this)
      this.update = +new Date();
      this.isToogle = !this.isToogle;
    }
  }, {
    key: "setThemeColor",
    value: function setThemeColor(color) {
      this.themeColor = color;
    }
  }, {
    key: "setDarkness",
    value: function setDarkness(darkness) {
      this.darkness = darkness;
    }
  }]);
  return TUi;
}(Model({
  update: prop(+new Date()),
  themeColor: prop('black'),
  selectedColor: prop('rgba(11,108,149)'),
  darkness: prop(true)
})), (_applyDecoratedDescriptor(_class2.prototype, "toggle", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "toggle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setThemeColor", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "setThemeColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setDarkness", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "setDarkness"), _class2.prototype)), _class2)) || _class);