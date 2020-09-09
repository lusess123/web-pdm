import { Annotation } from './annotation';
import { types as t } from 'mobx-state-tree';
const Snippet$1 = t.model("Snippet", {
    id: t.optional(t.identifier, () => uuid()),
});
export const Snippet = Snippet$1.props({
    annotations: t.array(t.late(() => Annotation))
});
//# sourceMappingURL=snippet.js.map