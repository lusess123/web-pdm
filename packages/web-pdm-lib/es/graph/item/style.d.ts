export declare const initStyle: ({ primaryColor }: {
    primaryColor: any;
}) => {
    colors: {
        blue: any;
        white: string;
        head: string;
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
};
