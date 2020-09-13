var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { model, Model, prop, modelAction, getRoot } from 'mobx-keystone';
import { toCenter } from '../util/graph';
let TSys = class TSys extends Model({
    search: prop(''),
    layouting: prop(false),
    isArrangeLayout: prop(false),
    expandedKeys: prop(() => []),
    currentModel: prop(''),
    currentModule: prop(''),
    checkedKeys: prop(() => []),
    showNameOrLabel: prop(false),
    tabOrTree: prop(false),
    snapshot: prop(true),
    height: prop('100%'),
    dagreLayout: prop(false),
}) {
    constructor() {
        super(...arguments);
        this.setExpandedKeys = (keys) => {
            this.expandedKeys = keys;
        };
        this.toggleTabOrTree = () => {
            this.tabOrTree = !this.tabOrTree;
        };
        this.changeModuleValue = (module) => {
            this.currentModule = module;
        };
        this.setSearch = (search) => {
            // alert(search)
            this.search = search;
        };
        this.toggleShowNameOrLabel = () => {
            this.showNameOrLabel = !this.showNameOrLabel;
        };
    }
    setOnIgnoreEdge(onIgnoreEdge) {
        this.onIgnoreEdge = onIgnoreEdge;
    }
    toggleArrangeLayout() {
        this.isArrangeLayout = !this.isArrangeLayout;
    }
    setCurrentModel(keys) {
        const newKey = keys.length > 1 ? keys[1] : keys[0];
        const root = getRoot(this);
        //root.graph.G6Graph
        const graph = root.graph.G6Graph;
        if (graph) {
            const item = graph.findById('model-' + newKey);
            if (item)
                item.toFront();
        }
        this.currentModel = newKey;
        root.graph.actionEdges(newKey);
    }
    centerCurrentModel(keys) {
        const newKey = keys.length > 1 ? keys[1] : keys[0];
        this.currentModel = newKey;
        const root = getRoot(this);
        //root.graph.G6Graph
        const graph = root.graph.G6Graph;
        if (graph) {
            const item = graph.findById('model-' + newKey);
            if (item)
                item.toFront();
            toCenter(item, graph);
            root.graph.setZoom(graph.getZoom());
        }
        //toCenter(   , root.graph.G6Graph)
    }
    onInit() {
        // alert('sys onInit')
        // alert(this.tabOrTree)
        this.toggleShowNameOrLabel = this.toggleShowNameOrLabel.bind(this);
    }
    setDagreLayout(dagreLayout) {
        this.dagreLayout = dagreLayout;
    }
};
__decorate([
    modelAction
], TSys.prototype, "toggleArrangeLayout", null);
__decorate([
    modelAction
], TSys.prototype, "setExpandedKeys", void 0);
__decorate([
    modelAction
], TSys.prototype, "setCurrentModel", null);
__decorate([
    modelAction
], TSys.prototype, "centerCurrentModel", null);
__decorate([
    modelAction
], TSys.prototype, "toggleTabOrTree", void 0);
__decorate([
    modelAction
], TSys.prototype, "changeModuleValue", void 0);
__decorate([
    modelAction
], TSys.prototype, "setSearch", void 0);
__decorate([
    modelAction
], TSys.prototype, "toggleShowNameOrLabel", void 0);
__decorate([
    modelAction
], TSys.prototype, "setDagreLayout", null);
TSys = __decorate([
    model("webpdm/TSys")
], TSys);
export { TSys };
