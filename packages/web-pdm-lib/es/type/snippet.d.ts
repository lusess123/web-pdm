import { IAnnotation, IAnnotationSnapshotIn, IAnnotationSnapshotOut } from './annotation';
import { Instance, SnapshotIn, SnapshotOut, IType } from 'mobx-state-tree';
declare const Snippet$1: any;
export interface ISnippet extends Instance<typeof Snippet$1> {
    annotations: IAnnotation[];
}
export interface ISnippetSnapshotIn extends SnapshotIn<typeof Snippet$1> {
    annotations?: IAnnotationSnapshotIn[];
}
export interface ISnippetSnapshotOut extends SnapshotOut<typeof Snippet$1> {
    annotations: IAnnotationSnapshotOut[];
}
export declare type ISnippetRunType = IType<ISnippetSnapshotIn, ISnippetSnapshotOut, ISnippet>;
export declare const Snippet: ISnippetRunType;
export {};
