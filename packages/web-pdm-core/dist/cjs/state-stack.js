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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/state-stack.tsx
var state_stack_exports = {};
__export(state_stack_exports, {
  StateStack: () => StateStack,
  default: () => state_stack_default
});
module.exports = __toCommonJS(state_stack_exports);
var import_mobx = require("mobx");
var StateStack = class {
  constructor() {
    this.current = -1;
    this.DataList = [];
  }
  push(obj) {
    this.DataList = this.DataList.slice(0, this.current + 1).concat([obj]);
    this.current++;
  }
  undo() {
    this.current--;
    return this.DataList[this.current];
  }
  redo() {
    this.current++;
    return this.DataList[this.current];
  }
  // pop() {
  //     return this.DataList.pop()
  // }
};
__decorateClass([
  import_mobx.observable
], StateStack.prototype, "current", 2);
__decorateClass([
  import_mobx.observable
], StateStack.prototype, "DataList", 2);
var state_stack_default = new StateStack();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StateStack
});
