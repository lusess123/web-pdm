/// <reference types="react" />
import { IComponentConfig } from './config';
declare const TUi_base: import("mobx-keystone")._Model<unknown, {
    update: import("mobx-keystone").OptionalModelProp<number, number>;
    themeColor: import("mobx-keystone").OptionalModelProp<string, string>;
    selectedColor: import("mobx-keystone").OptionalModelProp<string, string>;
}>;
export declare class TUi extends TUi_base {
    Tree?: React.ComponentType;
    Input?: React.ComponentType;
    Button?: React.ComponentType;
    Dropdown?: React.ComponentType;
    Menu?: React.ComponentType;
    Select?: React.ComponentType;
    Tooltip?: React.ComponentType;
    Popover?: React.ComponentType;
    isToogle: boolean;
    registComponents(components?: IComponentConfig): void;
    toggle(components: IComponentConfig): void;
    setThemeColor(color: string): void;
}
export {};
