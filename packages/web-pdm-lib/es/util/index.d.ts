import { SFC } from 'react';
export interface IComponentOptions<T> {
    setup: SFC<T>;
    displayName?: string;
}
export interface IComponent {
    <T>(options: IComponentOptions<T>): SFC<T>;
}
export declare const defineComponent: IComponent;
export declare const ObComponent: IComponent;
export interface IComponentCreateOptions<T> {
    useLocal?: any;
    useSetup?: any;
    render: SFC<T>;
    displayName?: string;
}
export interface IComponentCreate {
    <T>(options: IComponentCreateOptions<T>): SFC<T>;
}
export declare const CreateComponent: IComponentCreate;
export declare const json: (obj: any, replacer?: any, space?: any) => string;
export declare const renderJson: (value: any, replacer?: any, space?: any) => JSX.Element;
export declare function mapToArrary<T>(mapObj: Map<string, T>): T[];
export declare const intlLiteral: (text: string) => string;
export declare const changeTwoDecimal_f: (x: any) => string | 0 | 100;
