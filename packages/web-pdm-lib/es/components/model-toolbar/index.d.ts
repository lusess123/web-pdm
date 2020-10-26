/// <reference types="react" />
declare const IconRenders: {
    undo: JSX.Element;
    redo: JSX.Element;
    min: JSX.Element;
    max: JSX.Element;
    full: JSX.Element;
    miniMap: JSX.Element;
    miniMapNo: JSX.Element;
    dagreLayout: JSX.Element;
    relationLayout: JSX.Element;
    reload: JSX.Element;
    image: JSX.Element;
    darkness: JSX.Element;
    light: JSX.Element;
    colorClose: JSX.Element;
    colorOpen: JSX.Element;
};
declare type TIconRenders = typeof IconRenders;
export declare type TIconRendersKeys = keyof TIconRenders;
declare const _default: (({ graph }: {
    graph: any;
}) => JSX.Element) & {
    displayName: string;
};
export default _default;
