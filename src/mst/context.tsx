
import { createContext, useContext } from 'react'

import { RootStore, RootInstance } from './type'



const RootStoreContext = createContext<null | RootInstance>(null);
export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}

export const rootStore = RootStore.create({
    sys : {
        isArrangeLayout : false ,
        layouting: true ,
        search: ''
    }});
