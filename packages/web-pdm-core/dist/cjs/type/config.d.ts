/// <reference types="react" />
export declare type MetaTypeConfig = {
    relationModel: string;
    type: string;
};
export declare type FieldMetaTypeConfig = {
    relationModel: string;
    field: string;
    type?: string;
};
export declare type FieldConfig = {
    name: string;
    label: string;
    typeMeta?: MetaTypeConfig | FieldMetaTypeConfig[];
    type?: string;
};
export declare type ModelConfig = {
    name: string;
    label: string;
    fields: FieldConfig[];
    module: string;
    type?: string;
    aggregateRoot?: boolean;
    aggregateModelKey?: string;
    belongAggregate?: string;
};
export declare type ModuleConfig = {
    name: string;
    label: string;
};
export declare type SysConfig = {
    search: string;
    currentModel: string;
    currentModule: string;
    checkedKeys: string[];
    showNameOrLabel: boolean;
    tabOrTree: boolean;
    height: number;
};
export declare type IComponentConfig = {
    Tree?: React.ComponentType;
    Input?: React.ComponentType;
    Button?: React.ComponentType;
    Dropdown?: React.ComponentType;
    Menu?: React.ComponentType;
    Select?: React.ComponentType;
    Tooltip?: React.ComponentType;
    Popover?: React.ComponentType;
};
export declare type TData = {
    models: ModelConfig[];
    modules: ModuleConfig[];
};
