import { SnapshotInOf } from 'mobx-keystone';
export declare type Field = SnapshotInOf<TField>;
declare const MetaType_base: import("mobx-keystone")._Model<unknown, {
    relationModel: import("mobx-keystone").MaybeOptionalModelProp<string, string>;
    type: import("mobx-keystone").OptionalModelProp<string, string>;
}>;
export declare class MetaType extends MetaType_base {
    get relationModelData(): {
        name: string;
        label: string;
        id: string;
    };
}
declare const TField_base: import("mobx-keystone")._Model<unknown, {
    id: import("mobx-keystone").MaybeOptionalModelProp<string, string>;
    name: import("mobx-keystone").MaybeOptionalModelProp<string, string>;
    label: import("mobx-keystone").MaybeOptionalModelProp<string, string>;
    type: import("mobx-keystone").MaybeOptionalModelProp<string, string>;
    typeMeta: import("mobx-keystone").MaybeOptionalModelProp<MetaType, MetaType>;
    modelId: import("mobx-keystone").OptionalModelProp<string, string>;
}>;
export declare class TField extends TField_base {
    get relationModel(): import("./model").TModel;
    get model(): import("./model").TModel;
}
export {};
