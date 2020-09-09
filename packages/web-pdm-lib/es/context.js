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
export const rootStore = createStore();
export const undoManager = undoMiddleware(rootStore);
export const createRootStore = (props) => {
    return createStore(props);
};
//# sourceMappingURL=context.js.map