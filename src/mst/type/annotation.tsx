import {  Snippet, ISnippet } from './snippet'
import { Instance , types as t, ReferenceIdentifier, SnapshotIn, SnapshotOut, IType } from 'mobx-state-tree'


const Annotation$1 = t.model("Annotation", {
    id: t.optional(t.identifier, () => +new Date() + ''),
});
 
export interface IAnnotation extends Instance<typeof Annotation$1> {
    snippet: ISnippet
};
 
export interface IAnnotationSnapshotIn extends SnapshotIn<typeof Annotation$1> {
    snippet: ReferenceIdentifier;
}
 
export interface IAnnotationSnapshotOut extends SnapshotOut<typeof Annotation$1> {
    snippet: ReferenceIdentifier;
}
 
export type IAnnotationRunType = IType<IAnnotationSnapshotIn, IAnnotationSnapshotOut, IAnnotation>;
 
export const Annotation: IAnnotationRunType = Annotation$1.props({
    snippet: t.reference(t.late(() => Snippet))
});