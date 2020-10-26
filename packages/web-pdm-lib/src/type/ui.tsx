import { model, Model, modelAction, prop } from 'mobx-keystone'
import { IComponentConfig } from './config'
import { Input, Button, Dropdown, Menu, Select, Tooltip, Popover } from 'antd'
import { Tree } from '../tree'
// import { RootInstance } from '../type'

@model('webpdm/TUi')
export class TUi extends Model({
    update: prop(+new Date()),
    themeColor: prop('black'),
    selectedColor: prop('rgba(11,108,149)'),
    darkness: prop(true)
}) {
    Tree?: React.ComponentType
    Input?: React.ComponentType
    Button?: React.ComponentType
    Dropdown?: React.ComponentType
    Menu?: React.ComponentType
    Select?: React.ComponentType
    Tooltip?: React.ComponentType
    Popover?: React.ComponentType
    IconRenders?: Record<string, React.ReactNode> = {}

    isToogle: boolean = false
    disableIcons: string[] = []

    registComponents(components?: IComponentConfig, IconRenders?: Record<string, React.ReactNode>, disableIcons?: string[]) {
        if (components) {
            Object.keys(components).forEach(k => {
                this[k] = components[k]
            })
        }

        if (IconRenders) this.IconRenders = { ...this.IconRenders, ...IconRenders }
        if (disableIcons) this.disableIcons = disableIcons

        if (!this.Tree || !components) this.Tree = Tree
        if (!this.Input || !components) this.Input = Input
        if (!this.Button || !components) this.Button = Button
        if (!this.Dropdown || !components) this.Dropdown = Dropdown
        if (!this.Menu || !components) this.Menu = Menu
        if (!this.Select || !components) this.Select = Select
        if (!this.Tooltip || !components) this.Tooltip = Tooltip
        if (!this.Popover || !components) this.Popover = Popover
    }
    @modelAction
    toggle(components: IComponentConfig) {
        this.registComponents(this.isToogle ? undefined : components)
        // const root: RootInstance = getRoot(this)
        this.update = +new Date()
        this.isToogle = !this.isToogle
    }
    @modelAction
    setThemeColor(color: string) {
        this.themeColor = color
    }
    @modelAction
    setDarkness(darkness: boolean) {
        this.darkness = darkness
    }
}
