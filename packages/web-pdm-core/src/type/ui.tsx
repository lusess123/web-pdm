import { model, Model, modelAction, prop } from 'mobx-keystone';
import { createThemePalette, type WebPdmTheme } from '../theme';
import type { IComponentConfig } from './config';
// import { RootInstance } from '../type'

@model('webpdm/TUi')
export class TUi extends Model({
  update: prop(+new Date()),
  themeColor: prop(''),
  selectedColor: prop('rgba(11,108,149)'),
  darkness: prop(false),
}) {
  Tree?: React.ComponentType;
  Input?: React.ComponentType;
  Button?: React.ComponentType;
  Dropdown?: React.ComponentType;
  Menu?: React.ComponentType;
  Select?: React.ComponentType;
  Tooltip?: React.ComponentType;
  Popover?: React.ComponentType;
  IconRenders?: Record<string, React.ReactNode> = {};

  isToogle: boolean = false;
  disableIcons: string[] = [];

  get theme() {
    return this.darkness ? 'dark' : 'light';
  }

  get palette() {
    return createThemePalette(this.darkness, this.themeColor);
  }

  registComponents(
    components?: IComponentConfig,
    IconRenders?: Record<string, React.ReactNode>,
    disableIcons?: string[],
  ) {
    if (components) {
      Object.keys(components).forEach((k) => {
        this[k] = components[k];
      });
    }

    if (IconRenders) this.IconRenders = { ...this.IconRenders, ...IconRenders };
    if (disableIcons) this.disableIcons = disableIcons;
    // this.Tree = Tree
    // if (!this.Tree || !components) this.Tree = Tree
    // if (!this.Input || !components) this.Input = Input
    // if (!this.Button || !components) this.Button = Button
    // if (!this.Dropdown || !components) this.Dropdown = Dropdown
    // if (!this.Menu || !components) this.Menu = Menu
    // if (!this.Select || !components) this.Select = Select
    // if (!this.Tooltip || !components) this.Tooltip = Tooltip
    // if (!this.Popover || !components) this.Popover = Popover
  }
  @modelAction
  toggle(components: IComponentConfig) {
    this.registComponents(this.isToogle ? undefined : components);
    // const root: RootInstance = getRoot(this)
    this.update = +new Date();
    this.isToogle = !this.isToogle;
  }
  @modelAction
  setThemeColor(color?: string) {
    this.themeColor = color ?? '';
  }
  @modelAction
  setDarkness(darkness: boolean) {
    this.darkness = darkness;
  }

  @modelAction
  setTheme(theme: WebPdmTheme) {
    this.darkness = theme === 'dark';
  }
}
