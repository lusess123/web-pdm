var _dec, _class, _class2, _dec2, _class3, _class4;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

import { model, Model, prop, getRoot } from 'mobx-keystone';
import { computed } from 'mobx';
export var MetaType = (_dec = model("webpdm/MetaType"), _dec(_class = (_class2 = /*#__PURE__*/function (_Model) {
  _inherits(MetaType, _Model);

  var _super = _createSuper(MetaType);

  function MetaType() {
    _classCallCheck(this, MetaType);

    return _super.apply(this, arguments);
  }

  _createClass(MetaType, [{
    key: "relationModelData",
    get: function get() {
      var _this = this;

      var root = getRoot(this);

      var model = _toConsumableArray(root.Models.values()).find(function (a) {
        return a.name === _this.relationModel;
      });

      if (model) {
        return {
          name: model.name,
          label: model.label,
          id: model.id
        };
      }

      return null;
    }
  }]);

  return MetaType;
}(Model({
  relationModel: prop(),
  type: prop('Relation')
})), (_applyDecoratedDescriptor(_class2.prototype, "relationModelData", [computed], Object.getOwnPropertyDescriptor(_class2.prototype, "relationModelData"), _class2.prototype)), _class2)) || _class);
export var TField = (_dec2 = model("webpdm/TField"), _dec2(_class3 = (_class4 = /*#__PURE__*/function (_Model2) {
  _inherits(TField, _Model2);

  var _super2 = _createSuper(TField);

  function TField() {
    _classCallCheck(this, TField);

    return _super2.apply(this, arguments);
  }

  _createClass(TField, [{
    key: "relationModel",
    get: function get() {
      if (this.typeMeta && this.typeMeta.relationModel) {
        var root = getRoot(this);

        var _model = root.findModelByName(this.typeMeta.relationModel); // typeof model


        return _model;
      }

      return null;
    }
  }, {
    key: "model",
    get: function get() {
      var _this2 = this;

      var root = getRoot(this);
      return _toConsumableArray(root.Models.values()).find(function (a) {
        return a.id === _this2.modelId;
      });
    }
  }]);

  return TField;
}(Model({
  id: prop(),
  name: prop(),
  label: prop(),
  type: prop(),
  typeMeta: prop(),
  modelId: prop('')
})), (_applyDecoratedDescriptor(_class4.prototype, "relationModel", [computed], Object.getOwnPropertyDescriptor(_class4.prototype, "relationModel"), _class4.prototype), _applyDecoratedDescriptor(_class4.prototype, "model", [computed], Object.getOwnPropertyDescriptor(_class4.prototype, "model"), _class4.prototype)), _class4)) || _class3);