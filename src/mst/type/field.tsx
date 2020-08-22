import { types, Instance } from "mobx-state-tree"
import { Model } from './model'

export const Field = types.model({
    id: types.identifier,
    name: types.string,
    label: types.string,
    type : types.string ,
    model: types.reference(types.late(()=> Model))
}).actions(self => ({
     changeLabel() {
         self.label = (+new Date() + '')
     }
})).named('字段')

export type TField = Instance<typeof Field>;

