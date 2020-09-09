import { __decorate, __metadata } from "tslib";
import { model, Model, prop, modelAction, getRoot } from 'mobx-keystone';
import { renderModelTitle } from '../util/label';
import { computed } from 'mobx';
let TModel = class TModel extends Model({
    id: prop(),
    name: prop(),
    label: prop(''),
    moduleId: prop(''),
}) {
    get fields() {
        const root = getRoot(this);
        const fields = [...root.Fields.values()];
        return fields.filter(a => a.modelId === this.id);
    }
    renderModelTitle() {
        const root = getRoot(this);
        return renderModelTitle(this.label, root.sys.search, root.sys.showNameOrLabel, this.name);
    }
    filterModel() {
        const root = getRoot(this);
        const search = root.sys.search;
        return !search || (root.sys.showNameOrLabel ? this.name.indexOf(search) >= 0 : this.label.indexOf(search) >= 0);
    }
};
__decorate([
    computed,
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], TModel.prototype, "fields", null);
__decorate([
    modelAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TModel.prototype, "renderModelTitle", null);
__decorate([
    modelAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TModel.prototype, "filterModel", null);
TModel = __decorate([
    model("webpdm/Model")
], TModel);
export { TModel };
//# sourceMappingURL=model.js.map