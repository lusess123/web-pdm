var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    computed
], MetaType.prototype, "relationModelData", null);
MetaType = __decorate([
    model("webpdm/MetaType")
], MetaType);
export { MetaType };
let TField = class TField extends Model({
// id: prop<string>(),
// name: prop<string>(),
// label: prop<string>(),
// type: prop<string>(),
// typeMeta: prop<MetaType | undefined>(),
// modelId: prop<string>('')
}) {
    init(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.label = obj.label;
        this.type = obj.type;
        this.typeMeta = obj.typeMeta;
        this.modelId = obj.modelId;
        return this;
    }
    get relationModel() {
        if (this.typeMeta && this.typeMeta.relationModel) {
            const root = getRoot(this);
            const model = root.findModelByName(this.typeMeta.relationModel);
            // console.log(model)
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
    computed
], TField.prototype, "relationModel", null);
__decorate([
    computed
], TField.prototype, "model", null);
TField = __decorate([
    model("webpdm/TField")
], TField);
export { TField };
