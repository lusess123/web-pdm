var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { model, Model, prop, modelAction, getRoot } from 'mobx-keystone';
import { renderModelTitle } from '../util/label';
let TModel = class TModel extends Model({
    id: prop(),
    name: prop(),
    label: prop(''),
    moduleId: prop(''),
    aggregateRoot: prop(false),
    aggregateModelKey: prop(),
    belongAggregate: prop(),
}) {
    // @computed
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
    modelAction
], TModel.prototype, "renderModelTitle", null);
__decorate([
    modelAction
], TModel.prototype, "filterModel", null);
TModel = __decorate([
    model("webpdm/Model")
], TModel);
export { TModel };
