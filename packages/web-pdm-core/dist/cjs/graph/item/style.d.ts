export declare const initStyle: ({ primaryColor }: {
    primaryColor: any;
}) => {
    colors: {
        blue: any;
        white: string;
        head: any;
        black: string;
    };
    style: {
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
};
