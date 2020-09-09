import { __decorate, __metadata } from "tslib";
import { model, Model, prop, getRoot } from 'mobx-keystone';
import { computed } from 'mobx';
let MetaType = class MetaType extends Model({
    relationModel: prop(),
    type: prop('Relation')
}) {
    get relationModelData() {
        const root = getRoot(this);
        const model = [...root.Models.values()].find(a => a.name === this.relationModel);
        if (model) {
            return {
                name: model.name,
                label: model.label,
                id: model.id
            };
        }
        return null;
    }
};
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], MetaType.prototype, "relationModelData", null);
MetaType = __decorate([
    model("webpdm/MetaType")
], MetaType);
export { MetaType };
let TField = class TField extends Model({
    id: prop(),
    name: prop(),
    label: prop(),
    type: prop(),
    typeMeta: prop(),
    modelId: prop('')
}) {
    get relationModel() {
        if (this.typeMeta && this.typeMeta.relationModel) {
            const root = getRoot(this);
            const model = root.findModelByName(this.typeMeta.relationModel);
            // typeof model
            return model;
        }
        return null;
    }
    get model() {
        const root = getRoot(this);
        return [...root.Models.values()].find(a => a.id === this.modelId);
    }
};
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TField.prototype, "relationModel", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TField.prototype, "model", null);
TField = __decorate([
    model("webpdm/TField")
], TField);
export { TField };
//# sourceMappingURL=field.js.map