var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { model, Model, prop, modelAction, objectMap, getSnapshot } from 'mobx-keystone';
import { computed } from 'mobx';
import { without, union } from 'lodash';
import { TModel } from './model';
import { TModule } from './module';
import { TSys } from './sys';
import { TGraph } from './graph';
import { createData, createLinks } from '../graph/data';
import { renderModelTitle } from '../util/label';
import { TUi } from './ui';
const getLayerRootModel = (models, rootKey, roots = []) => {
    const rootModel = models.find((a) => a.name === rootKey);
    const rootsRes = rootModel ? [...roots, rootKey] : roots;
    const isRoot = (rootModel.aggregateModelKey && rootModel.aggregateModelKey !== rootKey);
    const rootsResList = isRoot ? getLayerRootModel(models, rootModel.aggregateModelKey, rootsRes) : rootsRes;
    return rootsResList;
};
export const arrangeShow = (ss, { model }) => {
    // alert(model)
    const roots = getLayerRootModel(ss.models, model, []);
    // alert(JSON.stringify(roots))
    const list = ss.models.filter((a) => (a.key === model || roots.indexOf(a.aggregateModelKey) >= 0)).map((a) => 'model-' + a.key);
    return Object.assign(Object.assign({}, ss), { checkedKeys: list, currentModel: model, isArrangeLayout: true });
};
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function NewGuid() {
    return S4();
    //return globaIndex ++ 
}
function MapProp() {
    return prop(() => objectMap());
    // return prop_mapObject<(Map<string, T>)>(() => new Map())
}
let RootInstance = class RootInstance extends Model({
    sys: prop(),
    Models: MapProp(),
    Modules: MapProp(),
    // Fields: MapProp<TField>(),
    graph: prop(() => new TGraph({})),
    Ui: prop(() => new TUi({}))
}) {
    constructor() {
        super(...arguments);
        this.Fields = new Map();
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
    setFields(fields) {
        this.Fields = fields;
    }
    get moduleList() {
        return [...this.Modules.values()];
    }
    get Nodes() {
        const data = createData(this);
        //alert(data.length)
        return data;
    }
    get edges() {
        return createLinks(this);
    }
    arrangeShow(rootKey) {
        // alert(rootKey)]
        const models = [...this.Models.values()];
        const roots = getLayerRootModel(models, rootKey, []);
        //alert(JSON.stringify(roots))
        const list = models.filter(a => a.name === rootKey || roots.indexOf(a.aggregateModelKey) >= 0).map(a => a.id);
        // alert(JSON.stringify(list))
        this.sys.setCheckedKeys(list);
        //const list = ss.models.filter((a) => (a.key === model ||  roots.indexOf(a.aggregateModelKey) >= 0)).map((a) => 'model-' + a.key)
    }
    findModelByName(name) {
        return [...this.Models.values()].find(a => a.name === name);
    }
    renderModelTitle(model) {
        return renderModelTitle(model.label, this.sys.search, this.sys.showNameOrLabel, model.name);
    }
    // @modelAction
    // init({ modelData, moduleData, height }: { modelData: any, moduleData: any, height: any }) {
    //       let moduleHas: Record<string, string> = {}
    //       moduleData.forEach((module: any) => {
    //             const key = NewGuid().toString()
    //             this.Modules.set(key, new TModule({ id: key, label: module.name, name: module.key }))
    //             moduleHas[module.key] = key
    //             this.sys.expandedKeys.push(key)
    //       })
    //       let modelsKeys: string[] = []
    //       modelData.forEach((model: any) => {
    //             const key = NewGuid().toString()
    //             this.Models.set(key, new TModel({ id: key, aggregateModelKey: m.aggregateModelKey, label: model.name, name: model.key, moduleId: moduleHas[model.moduleKey] || '' }))
    //             model.fields.forEach((field: any) => {
    //                   const _key = NewGuid().toString()
    //                   this.Fields.set(_key, new TField({ id: _key, typeMeta: (field.typeMeta ? new  MetaType(field.typeMeta ) : undefined ), label: field.name, name: field.key, type: field.type || 'string', modelId: key }))
    //             })
    //             modelsKeys.push(key)
    //       })
    //       this.sys.checkedKeys = modelsKeys
    //       this.sys.height = height
    //       // alert( this.sys.height)
    // }
    initData(models, modules, sys) {
        const t0 = +new Date();
        let moduleHas = {};
        modules.forEach((module) => {
            const key = NewGuid().toString();
            this.Modules.set(key, new TModule({ id: key, label: module.label, name: module.name }));
            moduleHas[module.name] = key;
            this.sys.expandedKeys.push(key);
        });
        const t1 = +new Date();
        let modelsKeys = [];
        let modelHas = {};
        models.forEach((model) => {
            const key = NewGuid().toString();
            this.Models.set(key, new TModel({
                id: key,
                belongAggregate: model.belongAggregate,
                aggregateModelKey: model.aggregateModelKey,
                aggregateRoot: model.aggregateRoot,
                label: model.label,
                name: model.name,
                moduleId: moduleHas[model.module] || ''
            }));
            modelHas[model.name] = key;
            modelsKeys.push(key);
        });
        models.forEach(model => {
            model.fields.forEach((field) => {
                var _a;
                // if( i > 3) return
                const _key = NewGuid().toString();
                const relationModel = (_a = field === null || field === void 0 ? void 0 : field.typeMeta) === null || _a === void 0 ? void 0 : _a.relationModel;
                const tmodel = relationModel ? this.Models.get(modelHas[relationModel]) : undefined;
                // const { label , name , id } = tmodel || 
                this.Fields.set(_key, {
                    id: _key,
                    label: field.label,
                    name: field.name,
                    type: field.type || 'string',
                    modelId: modelHas[model.name],
                    typeMeta: field.typeMeta,
                    relationModel: tmodel && getSnapshot(tmodel)
                });
                if (tmodel)
                    console.log(tmodel.name);
                // this.Fields.set(_key, new TField({}).init({ id: _key, typeMeta: (field.typeMeta ? new  MetaType(field.typeMeta ) : undefined ), label: field.label, name: field.name, type: field.type || 'string', modelId: key }))
            });
            // modelsKeys.push(key)
        });
        const t2 = +new Date();
        this.sys.checkedKeys = modelsKeys;
        if (sys === null || sys === void 0 ? void 0 : sys.height) {
            this.sys.height = sys.height;
        }
        const t = +new Date();
        // alert('initData  :' +  (t1 - t0) + '   ' + (t2 -t1) + '   ' +  (t - t2) )
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
], RootInstance.prototype, "arrangeShow", null);
__decorate([
    modelAction
], RootInstance.prototype, "findModelByName", null);
__decorate([
    modelAction
], RootInstance.prototype, "renderModelTitle", null);
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
export const createStore = (props = { sys: {}, graph: {}, components: {}, Ui: {} }) => {
    const ui = new TUi(props.Ui);
    ui.registComponents(props.components);
    return new RootInstance({
        $modelId: 'webpdm',
        sys: new TSys(Object.assign({ isArrangeLayout: false, layouting: true, search: '' }, props.sys)),
        Ui: ui,
        graph: new TGraph(Object.assign({}, props.graph)),
    });
};
