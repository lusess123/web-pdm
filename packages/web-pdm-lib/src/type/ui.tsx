import { model, Model, modelAction, prop } from 'mobx-keystone'
import { IComponentConfig } from './config'
import { Input, Button, Dropdown, Menu, Select, Tooltip } from 'antd'
import { Tree } from '../tree'
// import { RootInstance } from '../type'

@model("webpdm/TUi")
export class TUi extends Model({

    update: prop(+new Date()),
    themeColor: prop('green'),
    selectedColor: prop('green')

}) {
    Tree?: React.ComponentType
    Input?: React.ComponentType
    Button?: React.ComponentType
    Dropdown?: React.ComponentType
    Menu?: React.ComponentType
    Select?: React.ComponentType
    Tooltip?: React.ComponentType

    isToogle: boolean = false

    registComponents(components?: IComponentConfig) {
        if (components) {

            Object.keys(components).forEach((k) => {
                this[k] = components[k]
            })
        } 

        if (!this.Tree || !components) this.Tree = Tree
        if (!this.Input || !components) this.Input = Input
        if (!this.Button || !components) this.Button = Button
        if (!this.Dropdown || !components) this.Dropdown = Dropdown
        if (!this.Menu || !components) this.Menu = Menu
        if (!this.Select || !components) this.Select = Select
        if (!this.Tooltip || !components) this.Tooltip = Tooltip


    }
    @modelAction
    toggle(components: IComponentConfig) {
        this.registComponents(this.isToogle ? undefined : components )
        // const root: RootInstance = getRoot(this)
        this.update = +new Date()
        this.isToogle = !this.isToogle
    }
}