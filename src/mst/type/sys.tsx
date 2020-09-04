import { model, Model, prop, modelAction, UndoStore } from 'mobx-keystone'

@model("webpdm/TSys")
export class TSys extends Model({
    search: prop(''),
    layouting: prop(false),
    isArrangeLayout: prop(false),
    expandedKeys: prop<string[]>(() => []),
    currentModel: prop(''),
    currentModule: prop(''),
    checkedKeys: prop<string[]>(() => []),
    showNameOrLabel: prop(false),
    tabOrTree: prop(false),
    snapshot: prop(true),
    // undoData: prop<UndoStore>(() => new UndoStore({})),
}) {


    @modelAction
    toggleArrangeLayout() {
        this.isArrangeLayout = !this.isArrangeLayout
    }
    @modelAction
    setExpandedKeys = (keys: string[]) => {
        this.expandedKeys = keys
    }


    @modelAction
    setCurrentModel(keys: string[]){
        const newKey = keys.length > 1 ? keys[1] : keys[0]
        this.currentModel = newKey
    }
    @modelAction
    toggleTabOrTree = () => {
        this.tabOrTree = !this.tabOrTree
    }
    @modelAction
    changeModuleValue = (module: string) => {
        this.currentModule = module
    }
    @modelAction
    setSearch = (search: string) => {
        this.search = search
    }
    @modelAction
    toggleShowNameOrLabel = () => {
        this.showNameOrLabel = !this.showNameOrLabel
    }

    onInit() {
        // alert('sys onInit')
        this.toggleShowNameOrLabel = this.toggleShowNameOrLabel.bind(this)
    }

}

