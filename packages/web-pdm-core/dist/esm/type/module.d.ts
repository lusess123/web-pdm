declare const TModule_base: import("mobx-keystone")._Model<unknown, {
    id: import("mobx-keystone").MaybeOptionalModelProp<string>;
    name: import("mobx-keystone").MaybeOptionalModelProp<string>;
    label: import("mobx-keystone").MaybeOptionalModelProp<string>;
}, never, never>;
export declare class TModule extends TModule_base {
    get models(): import("./model").TModel[];
}
export {};
