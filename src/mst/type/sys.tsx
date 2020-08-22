import { types, Instance } from "mobx-state-tree"
import { Model } from "./model"


export const Sys = types.model({
    search: '',
    layouting : false,
    isArrangeLayout: false,
    expandedKeys: types.array(types.string),
    currentModel: '',
    checkedKeys: types.array(types.string)
}).actions(self => {
     return {
         toggleArrangeLayout : () => {
             self.isArrangeLayout = !self.isArrangeLayout
         },
         setExpandedKeys : (keys:string[] ) => {
               self.expandedKeys.replace(keys)
         },
         setCheckedKeys: (keys:string[]) => {
               self.checkedKeys.replace(keys)
         },
         setCurrentModel: (keys:string[]) => {
             const newKey = keys.length > 1 ? keys[1] : keys[0]
             self.currentModel = newKey
         }
     }
})
