var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { model, Model, prop, getRoot } from 'mobx-keystone';
import { computed } from 'mobx';
let TModule = class TModule extends Model({
    id: prop(),
    name: prop(),
    label: prop()
}) {
    get models() {
        const mst = getRoot(this);
        const models = [...mst.Models.values()].filter(a => a.moduleId === this.id);
        return models;
    }
};
__decorate([
    computed
], TModule.prototype, "models", null);
TModule = __decorate([
    model('webpdm/TModule')
], TModule);
export { TModule };
