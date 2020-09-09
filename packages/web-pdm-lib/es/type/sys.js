import { __decorate, __metadata } from "tslib";
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
    height: prop('100%')
    // undoData: prop<UndoStore>(() => new UndoStore({})),
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
            this.search = search;
        };
        this.toggleShowNameOrLabel = () => {
            this.showNameOrLabel = !this.showNameOrLabel;
        };
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
        }
        //toCenter(   , root.graph.G6Graph)
    }
    onInit() {
        // alert('sys onInit')
        this.toggleShowNameOrLabel = this.toggleShowNameOrLabel.bind(this);
    }
};
__decorate([
    modelAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TSys.prototype, "toggleArrangeLayout", null);
__decorate([
    modelAction,
    __metadata("design:type", Object)
], TSys.prototype, "setExpandedKeys", void 0);
__decorate([
    modelAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], TSys.prototype, "setCurrentModel", null);
__decorate([
    modelAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], TSys.prototype, "centerCurrentModel", null);
__decorate([
    modelAction,
    __metadata("design:type", Object)
], TSys.prototype, "toggleTabOrTree", void 0);
__decorate([
    modelAction,
    __metadata("design:type", Object)
], TSys.prototype, "changeModuleValue", void 0);
__decorate([
    modelAction,
    __metadata("design:type", Object)
], TSys.prototype, "setSearch", void 0);
__decorate([
    modelAction,
    __metadata("design:type", Object)
], TSys.prototype, "toggleShowNameOrLabel", void 0);
TSys = __decorate([
    model("webpdm/TSys")
], TSys);
export { TSys };
//# sourceMappingURL=sys.js.map