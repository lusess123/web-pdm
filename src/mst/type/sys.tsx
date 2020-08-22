import { types, Instance } from "mobx-state-tree"
import { Model } from "./model"


export const Sys = types.model({
    search: '',
    layouting : false,
    isArrangeLayout: false,
    expandedKeys: types.array(types.string),
    // currentModel: types.maybeNull(types.reference(types.late(()=>Model)))
    selectKeys: types.array(types.string)
}).actions(self => {
     return {
         toggleArrangeLayout : () => {
             self.isArrangeLayout = !self.isArrangeLayout
         },
         setExpandedKeys : (keys:string[] ) => {
               self.expandedKeys.replace(keys)
         },
         setSelectKeys: (keys:string[]) => {
               self.selectKeys.replace(keys)
         }
     }
})
