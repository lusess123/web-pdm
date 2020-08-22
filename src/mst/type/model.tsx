import { types, Instance, getParent } from "mobx-state-tree"
import { Field } from './field'
import { Module } from './module'

export const Model = types.model({
    id: types.identifier,
    name: types.string,
    label: types.string,
    module: types.reference(types.late(() => Module))
    // fields: types.map(types.reference(Field, {
    //     get(identifier /* string */, parent: any /*Store*/) {
    //         alert()
    //         return parent.Fields.find(u => u.id === identifier)
    //     },
    //     // given a user, produce the identifier that should be stored
    //     set(value /* User */) {
    //         return value.id
    //     }
    // })),
}).named('模型').views(self => ({

    get fields() {
        console.log(getParent(self,2))
        const list = getParent(self,2)
        const fields =  [...list.Fields.entries()].map(a=>a[1])
        return  fields.filter(a=>a.model === self).map(f=>f.model.label)
    }

}))

export type TModel = Instance<typeof Model>;
