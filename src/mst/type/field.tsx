import { model, Model, prop, modelAction, getRoot } from 'mobx-keystone'
import { computed } from 'mobx'
import { RootInstance } from '../type'


@model("webpdm/MetaType")
export class MetaType extends Model({
    relationModel: prop<string>(),
    type: prop('Relation')
}) {

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



