/// <reference types="react" />
import { IComponentConfig } from './config';
declare const TUi_base: import("mobx-keystone")._Model<unknown, {
    update: import("mobx-keystone").OptionalModelProp<number>;
    themeColor: import("mobx-keystone").OptionalModelProp<string>;
    selectedColor: import("mobx-keystone").OptionalModelProp<string>;
    darkness: import("mobx-keystone").OptionalModelProp<boolean>;
}, never, never>;
export declare class TUi extends TUi_base {
    Tree?: React.ComponentType;
    Input?: React.ComponentType;
    Button?: React.ComponentType;
    Dropdown?: React.ComponentType;
    Menu?: React.ComponentType;
    Select?: React.ComponentType;
    Tooltip?: React.ComponentType;
    Popover?: React.ComponentType;
    IconRenders?: Record<string, React.ReactNode>;
    isToogle: boolean;
    disableIcons: string[];
    registComponents(components?: IComponentConfig, IconRenders?: Record<string, React.ReactNode>, disableIcons?: string[]): void;
    toggle(components: IComponentConfig): void;
    setThemeColor(color: string): void;
    setDarkness(darkness: boolean): void;
}
export {};
