import { types, Instance, getRoot } from "mobx-state-tree"
import { RootInstance } from "../type"

export const Module = types.model({
    id: types.identifier,
    name: types.string,
    label: types.string,
}).views(self => ({
     get models(){
       const mst: RootInstance  = getRoot(self)
       const models:any = [...mst.Models.values()].filter(a=>a.moduleId === self.id)
       return models 

    }
}))

export type TModule = Instance<typeof Module>;

