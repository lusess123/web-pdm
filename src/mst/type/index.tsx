import { types, Instance } from "mobx-state-tree"
import { Model } from './model'
import { Module } from './module'
import { Field } from './field'
import { Sys } from './sys'
import { createData, createLinks } from '../graph/data'


function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function NewGuid() {
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


export const RootStore = types.model({
      sys: Sys,
      Models: types.map(Model),
      Modules: types.map(Module),
      Fields: types.map(Field),
}).views(self => ({
      get moduleList() {
            return [...self.Modules.values()]
      }
}
))
.actions(self => ({

      init({ modelData, moduleData }) {
           
            let moduleHas: Record<string,string> = {}
            moduleData.forEach((module : any) => {
                  const key = NewGuid().toString()
                  self.Modules.put(Module.create({ id: key, label: module.name, name: module.key }))
                  moduleHas[module.key] = key
                  self.sys.expandedKeys.push(key)

            })
            let modelsKeys: string[] = []
            modelData.forEach((model :any)=> {
                  const key = NewGuid().toString()
                  self.Models.put(Model.create({ id: key, label: model.name, name: model.key, moduleId: moduleHas[model.moduleKey] || '' }))
                  model.fields.forEach((field:any) => {
                        const _key = NewGuid().toString()
                        self.Fields.put(Field.create({ id: _key,typeMeta: field.typeMeta, label: field.name, name: field.key, type: field.type || 'string', modelId: key }))
                  })
                  modelsKeys.push(key)

            })
            self.sys.setCheckedKeys(modelsKeys)
      },

      findModelByName(name: string) {
          return [...self.Models.values()].find(a=>a.name === name)
      }

})).views(self => ({
      get Nodes(): any {
          const data = createData(self)
      //     alert(JSON.stringify(data))
          const itemString = sessionStorage.getItem('console-erd-graph')
          const item = itemString && JSON.parse(itemString)
          if(item)
          return data.map(a=> ({
                ...a,
                x: item[a.id].x,
                y: item[a.id].y
          }))
          return data
      },
      get edges() :any {
          return createLinks(self)
      }
}))

export type RootInstance = Instance<typeof RootStore>;
