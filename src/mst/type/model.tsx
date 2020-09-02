import { types, Instance, getRoot } from "mobx-state-tree"
import { TField } from './field'
import { RootInstance } from '../type'
import { renderModelTitle } from '../util/label'



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

})).actions(self => ({
    renderModelTitle() {
         const root: RootInstance = getRoot(self)
         return renderModelTitle(self.label, root.sys.search, root.sys.showNameOrLabel, self.name)
    },
    filterModel() {
        const root: RootInstance = getRoot(self)
        const search = root.sys.search
        return !search ||  (root.sys.showNameOrLabel ? self.name.indexOf(search) >=0 : self.label.indexOf(search) >= 0)
    }
}))

export type TModel = Instance<typeof Model>;



