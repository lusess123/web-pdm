/// <reference types="react" />
import { RootInstance } from './type';
export declare const Provider: import("react").Provider<RootInstance>;
export declare function useMst(): RootInstance;
export declare const rootStore: RootInstance;
export declare const undoManager: import("mobx-keystone").UndoManager;
export declare const createRootStore: (props: any) => RootInstance;
