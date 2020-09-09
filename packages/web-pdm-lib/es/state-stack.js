import { __decorate, __metadata } from "tslib";
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
    observable,
    __metadata("design:type", Object)
], StateStack.prototype, "current", void 0);
__decorate([
    observable,
    __metadata("design:type", Array)
], StateStack.prototype, "DataList", void 0);
export default new StateStack();
//# sourceMappingURL=state-stack.js.map