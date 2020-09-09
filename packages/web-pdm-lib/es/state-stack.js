var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable } from "mobx";
export class StateStack {
    constructor() {
        this.current = -1;
        this.DataList = [];
        // pop() {
        //     return this.DataList.pop()
        // }
    }
    push(obj) {
        this.DataList = this.DataList.slice(0, (this.current + 1)).concat([obj]);
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
}
__decorate([
    observable
], StateStack.prototype, "current", void 0);
__decorate([
    observable
], StateStack.prototype, "DataList", void 0);
export default new StateStack();
