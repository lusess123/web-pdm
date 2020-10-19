import { model, Model, prop, getRoot } from 'mobx-keystone'
import { computed } from 'mobx'

import { RootInstance } from '../type'

@model('webpdm/TModule')
export class TModule extends Model({
    id: prop<string>(),
    name: prop<string>(),
    label: prop<string>()
}) {
    @computed
    get models () {
        const mst: RootInstance = getRoot(this)
        const models = [...mst.Models.values()].filter(
            a => a.moduleId === this.id
        )
        return models
    }
}
