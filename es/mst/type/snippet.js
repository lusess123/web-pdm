import { Annotation } from './annotation';
import { types as t } from 'mobx-state-tree';
var Snippet$1 = t.model("Snippet", {
  id: t.optional(t.identifier, function () {
    return uuid();
  })
});
export var Snippet = Snippet$1.props({
  annotations: t.array(t.late(function () {
    return Annotation;
  }))
});