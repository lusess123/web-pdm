var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { model, Model, prop, modelAction, objectMap } from 'mobx-keystone';
import { computed } from 'mobx';
import { without, union } from 'lodash';
import { TModel } from './model';
import { TModule } from './module';
import { TField, MetaType } from './field';
import { TSys } from './sys';
import { TGraph } from './graph';
import { createData, createLinks } from '../graph/data';
import { renderModelTitle } from '../util/label';
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function NewGuid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
function MapProp() {
    return prop(() => objectMap());
    // return prop_mapObject<(Map<string, T>)>(() => new Map())
}
let RootInstance = class RootInstance extends Model({
    sys: prop(),
    Models: MapProp(),
    Modules: MapProp(),
    Fields: MapProp(),
    graph: prop(() => new TGraph({}))
}) {
    constructor() {
        super(...arguments);
        this.setCheckedKeys = (keys) => {
            if (!this.sys.tabOrTree) {
                this.sys.checkedKeys = keys;
            }
            else {
                const modelKeys = [...this.Models.values()].filter(a => !this.sys.currentModule || a.moduleId === this.sys.currentModule).map(a => a.id);
                const withoutKeys = without(modelKeys, ...keys);
                this.sys.checkedKeys = union(without(this.sys.checkedKeys, ...withoutKeys), keys);
            }
        };
    }
    setUndoManager(undoManager) {
        this.undoManager = undoManager;
    }
    get moduleList() {
        return [...this.Modules.values()];
    }
    get Nodes() {
        const data = createData(this);
        // alert(data.length)
        return data;
    }
    get edges() {
        return createLinks(this);
    }
    findModelByName(name) {
        return [...this.Models.values()].find(a => a.name === name);
    }
    renderModelTitle(model) {
        return renderModelTitle(model.label, this.sys.search, this.sys.showNameOrLabel, model.name);
    }
    init({ modelData, moduleData, height }) {
        let moduleHas = {};
        moduleData.forEach((module) => {
            const key = NewGuid().toString();
            this.Modules.set(key, new TModule({ id: key, label: module.name, name: module.key }));
            moduleHas[module.key] = key;
            this.sys.expandedKeys.push(key);
        });
        let modelsKeys = [];
        modelData.forEach((model) => {
            const key = NewGuid().toString();
            this.Models.set(key, new TModel({ id: key, label: model.name, name: model.key, moduleId: moduleHas[model.moduleKey] || '' }));
            model.fields.forEach((field) => {
                const _key = NewGuid().toString();
                this.Fields.set(_key, new TField({ id: _key, typeMeta: (field.typeMeta ? new MetaType(field.typeMeta) : undefined), label: field.name, name: field.key, type: field.type || 'string', modelId: key }));
            });
            modelsKeys.push(key);
        });
        this.sys.checkedKeys = modelsKeys;
        this.sys.height = height;
        // alert( this.sys.height)
    }
    initData(models, modules, sys) {
        let moduleHas = {};
        modules.forEach((module) => {
            const key = NewGuid().toString();
            this.Modules.set(key, new TModule({ id: key, label: module.label, name: module.name }));
            moduleHas[module.name] = key;
            this.sys.expandedKeys.push(key);
        });
        let modelsKeys = [];
        models.forEach((model) => {
            const key = NewGuid().toString();
            this.Models.set(key, new TModel({ id: key, label: model.label, name: model.name, moduleId: moduleHas[model.module] || '' }));
            model.fields.forEach((field) => {
                const _key = NewGuid().toString();
                this.Fields.set(_key, new TField({ id: _key, typeMeta: (field.typeMeta ? new MetaType(field.typeMeta) : undefined), label: field.label, name: field.name, type: field.type || 'string', modelId: key }));
            });
            modelsKeys.push(key);
        });
        this.sys.checkedKeys = modelsKeys;
        if (sys === null || sys === void 0 ? void 0 : sys.height) {
            this.sys.height = sys.height;
        }
    }
    undo() {
        //     const current = StateStack.DataList.length - 1
        //     const state : any = StateStack.DataList[current - 1]
        //     const state = StateStack.undo()
        //     console.log(state)
        //     window.lockSnapshot = true
        this.undoManager.undo();
        //     this.sys.snapshot = false
        // alert('undo ' + state.sys.showNameOrLabel)
        //     applySnapshot(this,state)
        //     window.lockSnapshot = false
    }
    redo() {
        // const state = StateStack.redo()
        // console.log(state)
        // window.lockSnapshot = true
        // applySnapshot(this,state)
        this.undoManager.redo();
    }
    checkAllFun() {
        var _a, _b;
        const currentModule = this.sys.currentModule;
        const modelIds = currentModule ? (_b = (_a = this.Modules.get(currentModule)) === null || _a === void 0 ? void 0 : _a.models) === null || _b === void 0 ? void 0 : _b.map(a => a.id) : [...this.Models.values()].map(a => a.id);
        this.sys.checkedKeys = union(this.sys.checkedKeys, modelIds);
    }
    checkAllCancleFun() {
        var _a, _b;
        const currentModule = this.sys.currentModule;
        if (!currentModule)
            this.sys.checkedKeys = [];
        // const models = [...this.Models.values()]
        const modelIds = (_b = (_a = this.Modules.get(currentModule)) === null || _a === void 0 ? void 0 : _a.models) === null || _b === void 0 ? void 0 : _b.map(a => a.id);
        this.sys.checkedKeys = [...without([...this.sys.checkedKeys], ...(modelIds || []))];
    }
};
__decorate([
    computed
], RootInstance.prototype, "moduleList", null);
__decorate([
    computed
], RootInstance.prototype, "Nodes", null);
__decorate([
    computed
], RootInstance.prototype, "edges", null);
__decorate([
    modelAction
], RootInstance.prototype, "findModelByName", null);
__decorate([
    modelAction
], RootInstance.prototype, "renderModelTitle", null);
__decorate([
    modelAction
], RootInstance.prototype, "init", null);
__decorate([
    modelAction
], RootInstance.prototype, "initData", null);
__decorate([
    modelAction
], RootInstance.prototype, "undo", null);
__decorate([
    modelAction
], RootInstance.prototype, "redo", null);
__decorate([
    modelAction
], RootInstance.prototype, "checkAllFun", null);
__decorate([
    modelAction
], RootInstance.prototype, "checkAllCancleFun", null);
__decorate([
    modelAction
], RootInstance.prototype, "setCheckedKeys", void 0);
RootInstance = __decorate([
    model("webpdm/RootStore")
], RootInstance);
export { RootInstance };
export const createStore = (props = { sys: {}, graph: {} }) => {
    return new RootInstance({
        $modelId: 'webpdm',
        sys: new TSys(Object.assign({ isArrangeLayout: false, layouting: true, search: '' }, props.sys)),
        graph: new TGraph(Object.assign({}, props.graph))
    });
};
