import { model, Model, prop, modelAction, getRoot, SnapshotInOf } from 'mobx-keystone'
import { computed } from 'mobx'
import { RootInstance } from '../type'

export type Field = SnapshotInOf<TField>
@model("webpdm/MetaType")
export class MetaType extends Model({
    relationModel: prop<string>(),
    type: prop('Relation')
}) {

    @computed get relationModelData()  {
        const root: RootInstance = getRoot(this)
        const model = [...root.Models.values()].find(a=>a.name === this.relationModel)
        if(model) {
            return {
                name : model.name,
                label : model.label,
                id : model.id
            }
        }
        return null
    }

}


@model("webpdm/TField")
export class TField extends Model({
    id: prop<string>(),
    name: prop<string>(),
    label: prop<string>(),
    type: prop<string>(),
    typeMeta: prop<MetaType | undefined>(),
    modelId: prop<string>('')

}) {
    
    @computed
    get relationModel() {
        if (this.typeMeta && this.typeMeta.relationModel) {
            const root: RootInstance = getRoot(this)
            const model = root.findModelByName(this.typeMeta.relationModel)
            // console.log(model)
            // typeof model
            return model

        }
        return null

    }
   
    @computed
    get model() {
        const root: RootInstance = getRoot(this);
        return [...root.Models.values()].find(a => a.id === this.modelId)
    }

}



