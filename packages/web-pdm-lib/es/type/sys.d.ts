import { FieldConfig, ModelConfig } from './config';
declare const TSys_base: import("mobx-keystone")._Model<unknown, {
    search: import("mobx-keystone").OptionalModelProp<string, string>;
    layouting: import("mobx-keystone").OptionalModelProp<boolean, boolean>;
    isArrangeLayout: import("mobx-keystone").OptionalModelProp<boolean, boolean>;
    expandedKeys: import("mobx-keystone").OptionalModelProp<string[], string[]>;
    currentModel: import("mobx-keystone").OptionalModelProp<string, string>;
    currentModule: import("mobx-keystone").OptionalModelProp<string, string>;
    checkedKeys: import("mobx-keystone").OptionalModelProp<string[], string[]>;
    showNameOrLabel: import("mobx-keystone").OptionalModelProp<boolean, boolean>;
    tabOrTree: import("mobx-keystone").OptionalModelProp<boolean, boolean>;
    snapshot: import("mobx-keystone").OptionalModelProp<boolean, boolean>;
    height: import("mobx-keystone").OptionalModelProp<string | number, string | number>;
    dagreLayout: import("mobx-keystone").OptionalModelProp<boolean, boolean>;
    intl: import("mobx-keystone").OptionalModelProp<string, string>;
    disableMiniMap: import("mobx-keystone").OptionalModelProp<boolean, boolean>;
    onlyMode: import("mobx-keystone").OptionalModelProp<boolean, boolean>;
}>;
export declare class TSys extends TSys_base {
    onIgnoreEdge: (filed: FieldConfig) => boolean;
    onModelDetail: (model: ModelConfig) => void;
    setOnIgnoreEdge(onIgnoreEdge: any): void;
    setOnModelDetail(onModelDetail: any): void;
    toggleArrangeLayout(): void;
    setExpandedKeys: (keys: string[]) => void;
    setCheckedKeys: (keys: string[]) => void;
    setDisableMiniMap(disableMiniMap: boolean): void;
    setCurrentModel(keys: string[]): void;
    centerCurrentModel(keys: string[]): void;
    openModel(key: string): void;
    toggleTabOrTree: () => void;
    changeModuleValue: (module: string) => void;
    setSearch: (search: string) => void;
    toggleShowNameOrLabel: () => void;
    onInit(): void;
    setDagreLayout(dagreLayout: boolean): void;
}
export {};
