/// <reference types="react" />
import { UndoManager } from 'mobx-keystone';
import { TModel } from './model';
import { TModule } from './module';
import { TSys } from './sys';
import { TGraph } from './graph';
import { SysConfig, ModelConfig, ModuleConfig } from './config';
import { TUi } from './ui';
export declare const arrangeShow: (ss: any, { model }: {
    model: any;
}) => any;
export declare type TData = {
    models: ModelConfig[];
    modules: ModuleConfig[];
};
declare const RootInstance_base: import("mobx-keystone")._Model<unknown, {
    sys: import("mobx-keystone").MaybeOptionalModelProp<TSys, TSys>;
    Models: import("mobx-keystone").OptionalModelProp<import("mobx-keystone").ObjectMap<TModel>, import("mobx-keystone").ObjectMap<TModel>>;
    Modules: import("mobx-keystone").OptionalModelProp<import("mobx-keystone").ObjectMap<TModule>, import("mobx-keystone").ObjectMap<TModule>>;
    graph: import("mobx-keystone").OptionalModelProp<TGraph, TGraph>;
    Ui: import("mobx-keystone").OptionalModelProp<TUi, TUi>;
}>;
export declare class RootInstance extends RootInstance_base {
    undoManager: UndoManager;
    Fields: Map<string, any>;
    onReload: () => TData;
    onIntl: (text: string) => string;
    setOnReload(onReload: () => TData): void;
    intl(text: string): any;
    setUndoManager(undoManager: UndoManager): void;
    setFields(fields: Map<string, any>): void;
    get moduleList(): TModule[];
    get Nodes(): {
        id: string;
        type: string;
        isKeySharp: boolean;
        visible: boolean;
        selected: boolean;
        showNameOrLabel: boolean;
        config: {
            width: number;
            headerHeight: number;
            fieldHeight: number;
            labelSize: number;
            styleConfig: {
                naviWidth: number;
                default: {
                    node: {
                        fill: string;
                        shadowColor: string;
                        shadowBlur: number;
                        shadowOffsetX: number;
                        shadowOffsetY: number;
                        radius: number;
                        lineWidth: number;
                        opacity: number;
                        stroke: string;
                    };
                    edge: {
                        lineWidth: number;
                        size: number;
                        lineAppendWidth: number;
                        endArrow: {
                            path: string;
                        };
                        startArrow: {
                            path: string;
                            d: number;
                        };
                        radius: number;
                        labelCfg: {
                            autoRotate: boolean;
                            style: {
                                fontSize: number;
                            };
                        };
                        stroke: any;
                    };
                };
                selected: {
                    node: {
                        stroke: string;
                        shadowColor: string;
                    };
                };
                isNoModule: {
                    node: {
                        opacity: number;
                    };
                };
                fieldRelation: {
                    node: {
                        fill: string;
                        shadowColor: string;
                        shadowBlur: number;
                        shadowOffsetX: number;
                        shadowOffsetY: number;
                        radius: number;
                        lineWidth: number;
                        opacity: number;
                        stroke: string;
                    };
                    edge: {
                        lineWidth: number;
                        size: number;
                        lineAppendWidth: number;
                        endArrow: {
                            path: string;
                            d: number;
                        };
                        startArrow: {
                            path: string;
                            d: number;
                        };
                        radius: number;
                        labelCfg: {
                            autoRotate: boolean;
                            style: {
                                fontSize: number;
                            };
                        };
                        stroke: any;
                    };
                };
            };
            colors: {
                blue: any;
                white: string;
                head: any;
                black: string;
            };
        };
        data: {
            moduleKey: string;
            label: string;
            fields: any[];
            key: string;
            name: string;
            tag: string;
            aggregateRoot: boolean;
            aggregateModelKey: string;
            belongAggregate: string;
            nodeSize: number;
        };
        themeColor: any;
        darkness: boolean;
        size: number;
    }[];
    get edges(): any;
    arrangeShow(rootKey: string): void;
    findModelByName(name: string): TModel;
    renderModelTitle(model: TModel): string | JSX.Element;
    initData(models: ModelConfig[], modules: ModuleConfig[], sys?: SysConfig): void;
    reload(): void;
    undo(): void;
    redo(): void;
    checkAllFun(): void;
    checkAllCancleFun(): void;
    setCheckedKeys: (keys: string[]) => void;
    onInit(): void;
}
export declare const createStore: (props?: {
    sys: {};
    graph: {};
    components: {};
    Ui: {};
}) => RootInstance;
export {};
