/// <reference types="react" />
import { IComponentConfig } from './config';
declare const TUi_base: import("mobx-keystone")._Model<unknown, {}>;
export declare class TUi extends TUi_base {
    Tree?: React.ComponentType;
    Input?: React.ComponentType;
    Button?: React.ComponentType;
    Dropdown?: React.ComponentType;
    Menu?: React.ComponentType;
    Select?: React.ComponentType;
    Tooltip?: React.ComponentType;
    registComponents(components: IComponentConfig): void;
}
export {};
