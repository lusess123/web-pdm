import { types } from "mobx-state-tree"



export const Sys = types.model({
    search: '',
    layouting : false,
    isArrangeLayout: false,
    expandedKeys: types.array(types.string),
    currentModel: '',
    currentModule: '',
    checkedKeys: types.array(types.string),
    showNameOrLabel: false,
    tabOrTree: false
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
         },
         toggleTabOrTree: () => {
             self.tabOrTree = !self.tabOrTree
         },
         changeModuleValue: (module:string) => {
             self.currentModule = module
         },
         setSearch : (search : string) => {
             self.search = search
         }
     }
})
