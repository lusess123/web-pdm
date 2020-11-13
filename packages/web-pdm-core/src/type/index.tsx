import {
    model,
    Model,
    prop,
    modelAction,
    objectMap,
    UndoManager,
    getSnapshot
} from 'mobx-keystone'
import { computed } from 'mobx'
import { without, union } from 'lodash'
import { TModel } from './model'
import { TModule } from './module'
// import { TField ,MetaType  } from './field'
import { TSys } from './sys'
import { TGraph } from './graph'
import { createData, createLinks } from '../graph/data'
import { renderModelTitle } from '../util/label'
// import StateStack from '../state-stack'
// import { undoManager } from '../context'
import { SysConfig, ModelConfig, ModuleConfig } from './config'
import { TUi } from './ui'
import IntlMap from '../intl'

const getLayerRootModel = (models, rootKey, roots = []) => {
    const rootModel = models.find(a => a.name === rootKey)
    const rootsRes = rootModel ? [...roots, rootKey] : roots
    const isRoot =
        rootModel.aggregateModelKey && rootModel.aggregateModelKey !== rootKey
    const rootsResList = isRoot
        ? getLayerRootModel(models, rootModel.aggregateModelKey, rootsRes)
        : rootsRes
    return rootsResList
}

export const arrangeShow = (ss, { model }) => {
    // alert(model)
    const roots = getLayerRootModel(ss.models, model, [])
    // alert(JSON.stringify(roots))
    const list = ss.models
        .filter(a => a.key === model || roots.indexOf(a.aggregateModelKey) >= 0)
        .map(a => 'model-' + a.key)
    return {
        ...ss,
        checkedKeys: list,
        currentModel: model,
        isArrangeLayout: true
    }
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
function NewGuid() {
    return S4()
    //return globaIndex ++
}

function MapProp<T>() {
    return prop(() => objectMap<T>())
    // return prop_mapObject<(Map<string, T>)>(() => new Map())
}

export type TData = {
    models: ModelConfig[]
    modules: ModuleConfig[]
}

@model('webpdm/RootStore')
export class RootInstance extends Model({
    sys: prop<TSys>(),
    Models: MapProp<TModel>(),
    Modules: MapProp<TModule>(),
    // Fields: MapProp<TField>(),
    graph: prop<TGraph>(() => new TGraph({})),
    Ui: prop<TUi>(() => new TUi({}))
}) {
    undoManager: UndoManager
    Fields: Map<string, any> = new Map()
    onReload: () => TData
    onIntl: (text: string) => string

    setOnReload(onReload: () => TData) {
        this.onReload = onReload
    }

    intl(text: string) {
        const newText = this.onIntl && this.onIntl(text)
        if (newText) {
            return newText
        }
        const intlmap = IntlMap[this.sys.intl]
        if (intlmap) return intlmap[text] || text
        else return text
        //    return text
    }

    setUndoManager(undoManager: UndoManager) {
        this.undoManager = undoManager
    }

    setFields(fields: Map<string, any>) {
        this.Fields = fields
    }

    @computed
    get moduleList() {
        return [...this.Modules.values()]
    }

    @computed
    get Nodes() {
        const data = createData(this)
        //alert(data.length)
        return data
    }

    @computed
    get edges(): any {
        return createLinks(this)
    }
    @modelAction
    arrangeShow(rootKey: string) {
        // alert(rootKey)]
        const models = [...this.Models.values()]
        const roots = getLayerRootModel(models, rootKey, [])
        //alert(JSON.stringify(roots))
        const list = models
            .filter(
                a =>
                    a.name === rootKey ||
                    roots.indexOf(a.aggregateModelKey) >= 0
            )
            .map(a => a.id)
        // alert(JSON.stringify(list))
        this.sys.setCheckedKeys(list)
        //const list = ss.models.filter((a) => (a.key === model ||  roots.indexOf(a.aggregateModelKey) >= 0)).map((a) => 'model-' + a.key)
    }

    @modelAction
    findModelByName(name: string) {
        return [...this.Models.values()].find(a => a.name === name)
    }

    @modelAction
    renderModelTitle(model: TModel) {
        return renderModelTitle(
            model.label,
            this.sys.search,
            this.sys.showNameOrLabel,
            model.name
        )
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

    @modelAction
    initData(models: ModelConfig[], modules: ModuleConfig[], sys?: SysConfig) {
        const t0 = +new Date()
        let moduleHas: Record<string, string> = {}
        modules.forEach(module => {
            const key = NewGuid().toString()
            this.Modules.set(
                key,
                new TModule({ id: key, label: module.label, name: module.name })
            )
            moduleHas[module.name] = key
            this.sys.expandedKeys.push(key)
        })
        const t1 = +new Date()

        let modelsKeys: string[] = []
        let modelHas: Record<string, string> = {}
        // alert(models.length)
        models.forEach(model => {
            const key = NewGuid().toString()
            this.Models.set(
                key,
                new TModel({
                    id: key,
                    belongAggregate: model.belongAggregate,
                    aggregateModelKey: model.aggregateModelKey,
                    aggregateRoot: model.aggregateRoot,
                    label: model.label,
                    name: model.name,
                    moduleId: moduleHas[model.module] || ''
                })
            )
            modelHas[model.name] = key
            modelsKeys.push(key)
        })

        models.forEach(model => {
            model.fields.forEach(field => {
                // if( i > 3) return
                const _key = NewGuid().toString()
                const relationModel = field?.typeMeta?.relationModel
                const tmodel = relationModel
                    ? this.Models.get(modelHas[relationModel])
                    : undefined
                // const { label , name , id } = tmodel ||
                this.Fields.set(_key, {
                    id: _key,
                    label: field.label,
                    name: field.name,
                    type: field.type || 'string',
                    modelId: modelHas[model.name],
                    typeMeta: field.typeMeta,
                    relationModel: tmodel && getSnapshot(tmodel)
                })
                if (tmodel) console.log(tmodel.name)
                // this.Fields.set(_key, new TField({}).init({ id: _key, typeMeta: (field.typeMeta ? new  MetaType(field.typeMeta ) : undefined ), label: field.label, name: field.name, type: field.type || 'string', modelId: key }))
            })
            // modelsKeys.push(key)
        })

        const t2 = +new Date()
        this.sys.setCheckedKeys(modelsKeys)
        if (sys?.height) {
            this.sys.height = sys.height
        }
        const t = +new Date()
        // alert('initData  :' +  (t1 - t0) + '   ' + (t2 -t1) + '   ' +  (t - t2) )
    }
    @modelAction
    reload() {
        // alert('刷新')
        if (this.onReload) {
            const data = this.onReload()
            if (data) {
                this.Models.clear()
                this.Modules.clear()
                this.Fields.clear()

                this.initData(data.models, data.modules)
                // this.sys.checkedKeys = data.models.map(a=>a.)
                // this.sys.currentModel = ''
            }
        }
    }

    @modelAction
    undo() {
        //     const current = StateStack.DataList.length - 1
        //     const state : any = StateStack.DataList[current - 1]
        //     const state = StateStack.undo()
        //     console.log(state)
        //     window.lockSnapshot = true
        this.undoManager.undo()
        //     this.sys.snapshot = false
        // alert('undo ' + state.sys.showNameOrLabel)
        //     applySnapshot(this,state)
        //     window.lockSnapshot = false
    }

    @modelAction
    redo() {
        // const state = StateStack.redo()
        // console.log(state)
        // window.lockSnapshot = true
        // applySnapshot(this,state)
        this.undoManager.redo()
    }
    @modelAction
    checkAllFun() {
        const currentModule = this.sys.currentModule
        const modelIds = currentModule
            ? this.Modules.get(currentModule)?.models?.map(a => a.id)
            : [...this.Models.values()].map(a => a.id)
        this.sys.checkedKeys = union(this.sys.checkedKeys, modelIds)
    }
    @modelAction
    checkAllCancleFun() {
        const currentModule = this.sys.currentModule
        if (!currentModule) this.sys.checkedKeys = []
        // const models = [...this.Models.values()]
        const modelIds = this.Modules.get(currentModule)?.models?.map(a => a.id)
        this.sys.checkedKeys = [
            ...without([...this.sys.checkedKeys], ...(modelIds || []))
        ]
    }

    @modelAction
    setCheckedKeys = (keys: string[]) => {
        if (!this.sys.tabOrTree) {
            this.sys.checkedKeys = keys
        } else {
            const modelKeys = [...this.Models.values()]
                .filter(
                    a =>
                        !this.sys.currentModule ||
                        a.moduleId === this.sys.currentModule
                )
                .map(a => a.id)
            const withoutKeys = without(modelKeys, ...keys)
            this.sys.checkedKeys = union(
                without(this.sys.checkedKeys, ...withoutKeys),
                keys
            )
        }
    }

    onInit() {
        // alert('sys onInit')
        // alert(this.tabOrTree)
        this.intl = this.intl.bind(this)
    }
}

export const createStore = (
    props = { sys: {}, graph: {}, components: {}, Ui: {}, IconRenders: undefined, disableIcons: [] }
) => {
    // alert(JSON.stringify(props.sys.onlyMode))
    const ui = new TUi(props.Ui)
    ui.registComponents(props.components, props.IconRenders, props.disableIcons)
    return new RootInstance({
        $modelId: 'webpdm',
        sys: new TSys({
            isArrangeLayout: false,
            layouting: true,
            search: '',
            ...props.sys
        }),
        Ui: ui,
        graph: new TGraph({
            ...props.graph
        })
        // Ui: new TUi(Ui)
    })
}
