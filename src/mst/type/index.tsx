import { types, Instance } from "mobx-state-tree"
import { Model } from './model'
import { Module } from './module'
import { Field } from './field'
import { Sys } from './sys'


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
      meCreate(data) {
         
      },
      init({ modelData, moduleData }) {
           
            let moduleHas = {}
            moduleData.forEach(module => {
                  const key = NewGuid().toString()
                  self.Modules.put(Module.create({ id: key, label: module.name, name: module.key }))
                  moduleHas[ module.key] = key
                  self.sys.expandedKeys.push(key)

            })

            modelData.forEach(model => {
                  const key = NewGuid().toString()
                  self.Models.put(Model.create({ id: key, label: model.name, name: model.key, module: moduleHas[model.moduleKey] || '' }))
                  model.fields.forEach(field => {
                        const _key = NewGuid().toString()
                        self.Fields.put(Field.create({ id: _key, label: field.name, name: field.key, type: field.type || 'string', model: key }))
                  })


            })
      },
      



}))

export type RootInstance = Instance<typeof RootStore>;