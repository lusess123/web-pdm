
import { model, Model, prop, modelAction, getRoot, SnapshotOutOf } from 'mobx-keystone'
import { RootInstance } from '../type'
import { renderModelTitle } from '../util/label'
import { computed } from 'mobx'

// aggregateRoot: boolean;
// aggregateModelKey: string;
// belongAggregate: string;

export type InModel = SnapshotOutOf<TModel>

@model("webpdm/Model")
export class TModel extends Model({

    id: prop<string>(),
    name: prop<string>(),
    label: prop(''),
    moduleId: prop(''),
    aggregateRoot: prop(false),
    aggregateModelKey: prop<string>(),
    belongAggregate:  prop<string>(),

}) {
    // @computed
    get fields(): any[] {
        const root: RootInstance = getRoot(this)
        const fields = [...root.Fields.values()]
        return fields.filter(a => a.modelId === this.id)
    }

    @modelAction
    renderModelTitle() {
        const root: RootInstance = getRoot(this)
        return renderModelTitle(this.label, root.sys.search, root.sys.showNameOrLabel, this.name)
    }

    @modelAction
    filterModel() {
        const root: RootInstance = getRoot(this)
        const search = root.sys.search
        return !search || (root.sys.showNameOrLabel ? this.name.indexOf(search) >= 0 : this.label.indexOf(search) >= 0)
    }
}





