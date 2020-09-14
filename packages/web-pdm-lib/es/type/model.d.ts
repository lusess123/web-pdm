/// <reference types="react" />
import { SnapshotOutOf } from 'mobx-keystone';
export declare type InModel = SnapshotOutOf<TModel>;
declare const TModel_base: import("mobx-keystone")._Model<unknown, {
    id: import("mobx-keystone").MaybeOptionalModelProp<string, string>;
    name: import("mobx-keystone").MaybeOptionalModelProp<string, string>;
    label: import("mobx-keystone").OptionalModelProp<string, string>;
    moduleId: import("mobx-keystone").OptionalModelProp<string, string>;
    aggregateRoot: import("mobx-keystone").OptionalModelProp<boolean, boolean>;
    aggregateModelKey: import("mobx-keystone").MaybeOptionalModelProp<string, string>;
    belongAggregate: import("mobx-keystone").MaybeOptionalModelProp<string, string>;
}>;
export declare class TModel extends TModel_base {
    get fields(): any[];
    renderModelTitle(): string | JSX.Element;
    filterModel(): boolean;
}
export {};
