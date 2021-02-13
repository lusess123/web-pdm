export type MetaTypeConfig = {
    relationModel: string
    type: string
}

export type FieldMetaTypeConfig = {
    relationModel: string
    field: string
    type?: string

}

export type FieldConfig = {
    name: string
    label: string
    typeMeta?: MetaTypeConfig | FieldMetaTypeConfig[]
    type?: string
}

export type ModelConfig = {
    name: string
    label: string
    fields: FieldConfig[]
    module: string
    type?: string

    aggregateRoot?: boolean
    aggregateModelKey?: string
    belongAggregate?: string
    id?: string,

}

export type ModuleConfig = {
    name: string
    label: string
    id?: string
}

export type SysConfig = {
    search: string
    currentModel: string
    currentModule: string
    checkedKeys: string[]
    showNameOrLabel: boolean
    tabOrTree: boolean
    height: number
    dagreLayout: boolean
}

export type IComponentConfig = {
    Tree?: React.ComponentType
    Input?: React.ComponentType
    Button?: React.ComponentType
    Dropdown?: React.ComponentType
    Menu?: React.ComponentType
    Select?: React.ComponentType
    Tooltip?: React.ComponentType
    Popover?: React.ComponentType
}

export type TData = {
    models: ModelConfig[]
    modules: ModuleConfig[]
}
