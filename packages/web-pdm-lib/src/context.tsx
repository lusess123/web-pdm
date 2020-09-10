
import { createContext, useContext } from 'react'
import { undoMiddleware } from 'mobx-keystone'
import { RootInstance , createStore } from './type'



const RootStoreContext = createContext<null | RootInstance>(null);
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
   const onIgnoreEdge:any = props?.sys?.onIgnoreEdge
   const newProps = onIgnoreEdge ? { ... props, sys: {...props.sys, onIgnoreEdge : undefined }} : props
   const rootStore = createStore(newProps)
   if(onIgnoreEdge) rootStore.sys.onIgnoreEdge = onIgnoreEdge
   rootStore.setUndoManager(undoMiddleware(rootStore))
   return rootStore
}