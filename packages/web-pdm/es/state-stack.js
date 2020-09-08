var _class, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import { observable } from "mobx";
export var StateStack = (_class = (_temp = /*#__PURE__*/function () {
  function StateStack() {
    _classCallCheck(this, StateStack);

    _initializerDefineProperty(this, "current", _descriptor, this);

    _initializerDefineProperty(this, "DataList", _descriptor2, this);
  }

  _createClass(StateStack, [{
    key: "push",
    value: function push(obj) {
      this.DataList = this.DataList.slice(0, this.current + 1).concat([obj]);
      this.current++;
    }
  }, {
    key: "undo",
    value: function undo() {
      this.current--;
      return this.DataList[this.current];
    }
  }, {
    key: "redo",
    value: function redo() {
      this.current++;
      return this.DataList[this.current];
    } // pop() {
    //     return this.DataList.pop()
    // }

  }]);

  return StateStack;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "current", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return -1;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "DataList", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
})), _class);
export default new StateStack();