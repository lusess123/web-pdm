import { FieldConfig, ModelConfig } from './config';
declare const TSys_base: import("mobx-keystone")._Model<unknown, {
    search: import("mobx-keystone").OptionalModelProp<string>;
    layouting: import("mobx-keystone").OptionalModelProp<boolean>;
    isArrangeLayout: import("mobx-keystone").OptionalModelProp<boolean>;
    expandedKeys: import("mobx-keystone").OptionalModelProp<string[]>;
    currentModel: import("mobx-keystone").OptionalModelProp<string>;
    currentModule: import("mobx-keystone").OptionalModelProp<string>;
    checkedKeys: import("mobx-keystone").OptionalModelProp<string[]>;
    showNameOrLabel: import("mobx-keystone").OptionalModelProp<boolean>;
    tabOrTree: import("mobx-keystone").OptionalModelProp<boolean>;
    snapshot: import("mobx-keystone").OptionalModelProp<boolean>;
    height: import("mobx-keystone").OptionalModelProp<string | number | undefined>;
    dagreLayout: import("mobx-keystone").OptionalModelProp<boolean>;
    intl: import("mobx-keystone").OptionalModelProp<string>;
    disableMiniMap: import("mobx-keystone").OptionalModelProp<boolean>;
    onlyMode: import("mobx-keystone").OptionalModelProp<boolean>;
}, never, never>;
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
