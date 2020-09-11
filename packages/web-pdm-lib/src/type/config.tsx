
export type MetaTypeConfig = {
    
    relationModel: string,
    type: 'Relation'
}

export type FieldConfig = {
    name: string,
    label: string,
    typeMeta?: MetaTypeConfig,
    type: string
}

export type ModelConfig = {
    name: string,
    label: string,
    fields: FieldConfig[],
    module: string,
    type?: string 
}

export type ModuleConfig = {
    name: string,
    label: string,
}

export type SysConfig = {
    search: string,
    currentModel: string,
    currentModule: string,
    checkedKeys: string[],
    showNameOrLabel: boolean,
    tabOrTree: boolean,
    height: number
}

export type IComponentConfig = {
    Tree? : React.ComponentType,
    Input?: React.ComponentType,
    Button?:React.ComponentType, 
    Dropdown?:React.ComponentType, 
    Menu?:React.ComponentType,
    Select?:React.ComponentType,
    Tooltip?: React.ComponentType
  }