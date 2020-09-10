export declare type MetaTypeConfig = {
    relationModel: string;
    type: 'Relation';
};
export declare type FieldConfig = {
    name: string;
    label: string;
    typeMeta?: MetaTypeConfig;
    type: string;
};
export declare type ModelConfig = {
    name: string;
    label: string;
    fields: FieldConfig[];
    module: string;
    type?: string;
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
