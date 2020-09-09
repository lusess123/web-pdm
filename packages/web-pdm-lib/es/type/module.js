import { __decorate, __metadata } from "tslib";
import { model, Model, prop, getRoot } from 'mobx-keystone';
import { computed } from 'mobx';
let TModule = class TModule extends Model({
    id: prop(),
    name: prop(),
    label: prop(),
}) {
    get models() {
        const mst = getRoot(this);
        const models = [...mst.Models.values()].filter(a => a.moduleId === this.id);
        return models;
    }
};
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TModule.prototype, "models", null);
TModule = __decorate([
    model("webpdm/TModule")
], TModule);
export { TModule };
//# sourceMappingURL=module.js.map