import {  IAnnotation, IAnnotationSnapshotIn, IAnnotationSnapshotOut, Annotation } from './annotation'
import { Instance , types as t, SnapshotIn, SnapshotOut, IType } from 'mobx-state-tree'
const Snippet$1 = t.model("Snippet", {
    id: t.optional(t.identifier, () => uuid()),
});
 
export interface ISnippet extends Instance<typeof Snippet$1> {
    annotations: IAnnotation[];
}
 
export interface ISnippetSnapshotIn extends SnapshotIn<typeof Snippet$1> {
    annotations?: IAnnotationSnapshotIn[];
}
 
export interface ISnippetSnapshotOut extends SnapshotOut<typeof Snippet$1> {
    annotations: IAnnotationSnapshotOut[];
}
 
export type ISnippetRunType = IType<ISnippetSnapshotIn, ISnippetSnapshotOut, ISnippet>;
 
export const Snippet: ISnippetRunType = Snippet$1.props({
    annotations: t.array(t.late(() => Annotation))
});