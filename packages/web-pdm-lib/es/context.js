import { createContext, useContext } from 'react';
import { undoMiddleware } from 'mobx-keystone';
import { createStore } from './type';
const RootStoreContext = createContext(null);
export const Provider = RootStoreContext.Provider;
export function useMst() {
    const store = useContext(RootStoreContext);
    if (store === null) {
        throw new Error("Store cannot be null, please add a context provider");
    }
    return store;
}
// export const rootStore = createStore()
// export const undoManager = undoMiddleware(rootStore)
export const createRootStore = (props) => {
    var _a;
    const onIgnoreEdge = (_a = props === null || props === void 0 ? void 0 : props.sys) === null || _a === void 0 ? void 0 : _a.onIgnoreEdge;
    const newProps = Object.assign(Object.assign({}, props), { sys: Object.assign(Object.assign({}, props.sys), { onIgnoreEdge: undefined, onModelDetail: props.onModelDetail }) });
    const rootStore = createStore(newProps);
    //alert('createRootStore')
    if (onIgnoreEdge)
        rootStore.sys.onIgnoreEdge = onIgnoreEdge;
    rootStore.setUndoManager(undoMiddleware(rootStore));
    return rootStore;
};
