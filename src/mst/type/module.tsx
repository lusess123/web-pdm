import { types, Instance, getParent } from "mobx-state-tree"
import { Model } from './model'

export const Module = types.model({
    id: types.identifier,
    name: types.string,
    label: types.string,
    // models: types.map(types.reference(types.late(()=>Model))),
}).views(self => ({
     get models() {

       const mst = getParent(self,2)
       const models = [...mst.Models.values()].filter(a => a.module === self)
       return models

    }
}))

export type TModule = Instance<typeof Module>;