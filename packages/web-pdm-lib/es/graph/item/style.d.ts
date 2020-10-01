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
                    path: string;
                };
                startArrow: {
                    path: string;
                    fill: string;
                    shadowColor: string;
                    opacity: number;
                    d: number;
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
                shadowColor: string;
            };
        };
        isNoModule: {
            node: {
                opacity: number;
            };
        };
    };
};
