import { types, Instance, getRoot } from "mobx-state-tree"
import { Model } from './model'
// import { RootInstance } from '../type'

export const MetaType = types.model({
    relationModel: types.string,
    type: 'Relation',
})

export const Field = types.model({
    id: types.identifier,
    name: types.string,
    label: types.string,
    type : types.string ,
    typeMeta: types.maybeNull(MetaType),
    modelId: ""
}).actions(self => ({
     changeLabel() {
         self.label = (+new Date() + '')
     }
})).named('字段').views(self => ({

      get relationModel(): Instance<typeof Model> | null {
         if(self.typeMeta && self.typeMeta.relationModel) {
            const root: any  = getRoot(self)
            const model = root.findModelByName(self.typeMeta.relationModel)
            // typeof model
            return model
            
         }
         return null
        
      },

      get model() {
        const root: any = getRoot(self);
        return [...root.Models.values()].find(a=>a.id === self.modelId)
      }
}))

export type TField = Instance<typeof Field>;

