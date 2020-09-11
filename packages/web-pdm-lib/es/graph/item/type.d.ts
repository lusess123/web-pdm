import { ModelConfig } from '@antv/g6/lib/types';
export interface IModelNodeShapeCfg extends ModelConfig {
    config: {
        width: number;
        headerHeight: number;
        fieldHeight: number;
        labelSize: number;
        styleConfig: {
            default: {
                node: any;
                edge: any;
            };
            active: {
                node: any;
                edge: any;
            };
            selected: {
                node: any;
                edge: any;
            };
        };
        colors: any;
    };
    data: {
        label: string;
        key: string;
        fields: IField[];
        name: string;
        aggregateRoot: boolean;
        aggregateModelKey: string;
        belongAggregate: string;
        moduleKey: string;
        store: any;
    };
    isNoModule?: boolean;
    isKeySharp?: boolean;
    active?: boolean;
    selected?: boolean;
    into?: boolean;
    out?: boolean;
    hide?: boolean;
    inactive?: boolean;
    isCardSharp?: boolean;
    showNameOrLabel?: boolean;
    themeColor?: string;
}
export interface IField {
    id: string;
    label: string;
    name: string;
    type: string;
    isForeign?: boolean;
    relationModel?: string;
}
export declare const Relation: {
    ToOne: string;
    ToMany: string;
};
