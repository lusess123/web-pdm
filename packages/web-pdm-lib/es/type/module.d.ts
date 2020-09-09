declare const TModule_base: import("mobx-keystone")._Model<unknown, {
    id: import("mobx-keystone").MaybeOptionalModelProp<string, string>;
    name: import("mobx-keystone").MaybeOptionalModelProp<string, string>;
    label: import("mobx-keystone").MaybeOptionalModelProp<string, string>;
}>;
export declare class TModule extends TModule_base {
    get models(): import("./model").TModel[];
}
export {};
