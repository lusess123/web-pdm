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
                    startArrow: {
                        path: string;
                        d: number;
                        fill: string;
                        shadowColor: string;
                    };
                    opacity: number;
                    radius: number;
                    labelCfg: {
                        autoRotate: boolean;
                        style: {
                            fontSize: number;
                        };
                    };
                    stroke: string;
                };
            };
            selected: {
                node: {
                    stroke: string;
                };
            };
            isNoModule: {
                node: {
                    opacity: number;
                };
            };
        };
        colors: {
            blue: any;
            white: string;
            head: string;
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
        nodeSize: number;
    };
    themeColor: any;
    size: number;
}[];
export declare const createLinks: (root: RootInstance) => any[];
