import { RootInstance } from '../type';
export declare const createData: (root: RootInstance) => {
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
                        path: any;
                    };
                    startArrow: {
                        path: any;
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
                        path: any;
                        d: number;
                    };
                    startArrow: {
                        path: any;
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
export declare const createLinks: (root: RootInstance) => any[];
