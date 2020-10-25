var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { model, Model, modelAction, prop } from 'mobx-keystone';
import { Input, Button, Dropdown, Menu, Select, Tooltip, Popover } from 'antd';
import { Tree } from '../tree';
// import { RootInstance } from '../type'
let TUi = class TUi extends Model({
    update: prop(+new Date()),
    themeColor: prop('black'),
    selectedColor: prop('rgba(11,108,149)'),
    darkness: prop(true)
}) {
    constructor() {
        super(...arguments);
        this.isToogle = false;
    }
    registComponents(components) {
        if (components) {
            Object.keys(components).forEach(k => {
                this[k] = components[k];
            });
        }
        if (!this.Tree || !components)
            this.Tree = Tree;
        if (!this.Input || !components)
            this.Input = Input;
        if (!this.Button || !components)
            this.Button = Button;
        if (!this.Dropdown || !components)
            this.Dropdown = Dropdown;
        if (!this.Menu || !components)
            this.Menu = Menu;
        if (!this.Select || !components)
            this.Select = Select;
        if (!this.Tooltip || !components)
            this.Tooltip = Tooltip;
        if (!this.Popover || !components)
            this.Popover = Popover;
    }
    toggle(components) {
        this.registComponents(this.isToogle ? undefined : components);
        // const root: RootInstance = getRoot(this)
        this.update = +new Date();
        this.isToogle = !this.isToogle;
    }
    setThemeColor(color) {
        this.themeColor = color;
    }
    setDarkness(darkness) {
        this.darkness = darkness;
    }
};
__decorate([
    modelAction
], TUi.prototype, "toggle", null);
__decorate([
    modelAction
], TUi.prototype, "setThemeColor", null);
__decorate([
    modelAction
], TUi.prototype, "setDarkness", null);
TUi = __decorate([
    model('webpdm/TUi')
], TUi);
export { TUi };
