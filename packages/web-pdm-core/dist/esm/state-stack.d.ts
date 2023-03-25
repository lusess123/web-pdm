export declare class StateStack {
    current: number;
    DataList: any[];
    push(obj: any): void;
    undo(): any;
    redo(): any;
}
declare const _default: StateStack;
export default _default;
