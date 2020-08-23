import { types, Instance, getRoot } from "mobx-state-tree"
import { TField } from './field'
import { RootInstance } from '../type'

export const Model = types.model({
    id: types.identifier,
    name: types.string,
    label: types.string,
    moduleId: ""
}).named('模型').views(self => ({

    get fields(): TField[] {
        const root: RootInstance = getRoot(self)
        const fields = [...root.Fields.values()]
        return  fields.filter(a=>a.model === self)
    }

}))

export type TModel = Instance<typeof Model>;
