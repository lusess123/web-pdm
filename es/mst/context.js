import { createContext, useContext } from 'react';
import { undoMiddleware } from 'mobx-keystone';
import { createStore } from './type';
var RootStoreContext = createContext(null);
export var Provider = RootStoreContext.Provider;
export function useMst() {
  var store = useContext(RootStoreContext);

  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }

  return store;
}
export var rootStore = createStore();
export var undoManager = undoMiddleware(rootStore);