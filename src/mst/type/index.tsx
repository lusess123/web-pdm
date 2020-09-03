
import { model, Model, prop, modelAction, prop_mapObject, objectMap } from 'mobx-keystone'
import { computed } from 'mobx'

import { TModel } from './model'
import { TModule } from './module'
import { TField } from './field'
import { TSys } from './sys'
import { createData, createLinks } from '../graph/data'
import { renderModelTitle } from '../util/label'



function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function NewGuid() {
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function MapProp<T>() {
      return prop(() => objectMap<T>())
      // return prop_mapObject<(Map<string, T>)>(() => new Map())
}


@model("webpdm/RootStore")
export class RootInstance extends Model({
      sys: prop<TSys>(),
      Models: MapProp<TModel>(),
      Modules: MapProp<TModule>(),
      Fields: MapProp<TField>(),

}) {
      @computed
      get moduleList() {
            return [...this.Modules.values()]
      }

      @computed
      get Nodes(): any {
            const data = createData(this)
            return data
      }

      @computed
      get edges(): any {
            return createLinks(this)
      }

      @modelAction
      findModelByName(name: string) {
            return [...this.Models.values()].find(a => a.name === name)
      }

      @modelAction
      renderModelTitle(model: TModel) {
            return renderModelTitle(model.label, this.sys.search, this.sys.showNameOrLabel, model.name)
      }

      @modelAction
      init({ modelData, moduleData }: { modelData: any, moduleData: any }) {

            let moduleHas: Record<string, string> = {}
            moduleData.forEach((module: any) => {
                  const key = NewGuid().toString()
                  this.Modules.set(key, new TModule({ id: key, label: module.name, name: module.key }))
                  moduleHas[module.key] = key
                  this.sys.expandedKeys.push(key)

            })
            let modelsKeys: string[] = []
            modelData.forEach((model: any) => {
                  const key = NewGuid().toString()
                  this.Models.set(key, new TModel({ id: key, label: model.name, name: model.key, moduleId: moduleHas[model.moduleKey] || '' }))
                  model.fields.forEach((field: any) => {
                        const _key = NewGuid().toString()
                        this.Fields.set(_key, new TField({ id: _key, typeMeta: field.typeMeta, label: field.name, name: field.key, type: field.type || 'string', modelId: key }))
                  })
                  modelsKeys.push(key)

            })
            this.sys.setCheckedKeys(modelsKeys)
      }

}


export const createStore = () => {
      return new RootInstance({
            $modelId: 'webpdm',
            sys: new TSys({
                  isArrangeLayout: false,
                  layouting: true,
                  search: ''
            })
      })
}


