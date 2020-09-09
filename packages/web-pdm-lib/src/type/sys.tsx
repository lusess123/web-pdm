import { model, Model, prop, modelAction, UndoStore, getRoot } from 'mobx-keystone'
import { RootInstance } from './index'
import { toCenter } from '../util/graph'
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
    height: prop<number|undefined|string>('100%')
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
        const root : RootInstance = getRoot(this)
        //root.graph.G6Graph
        const graph = root.graph.G6Graph
        if(graph) {
            const item = graph.findById('model-'+ newKey)
            if(item)
            item.toFront()
        }
        this.currentModel = newKey
        root.graph.actionEdges(newKey)

    }

    @modelAction
    centerCurrentModel(keys: string[]){
        const newKey = keys.length > 1 ? keys[1] : keys[0]
        this.currentModel = newKey
        const root : RootInstance = getRoot(this)
        //root.graph.G6Graph
        const graph = root.graph.G6Graph
        if(graph) {
            const item = graph.findById('model-'+ newKey)
            if(item)
            item.toFront()
            toCenter(item, graph)
        }
        //toCenter(   , root.graph.G6Graph)
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

