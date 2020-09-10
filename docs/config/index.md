---
order: 1
nav:
  order: 2
  title: 配置项
toc: menu
---



# props


 <code src="../type-erd.tsx"  inline />


## models 

- 说明： 模型和字段的初始化配置
- 类型： ModelConfig[]

```

export type ModelConfig = {
    name: string,
    label: string,
    fields: FieldConfig[],
    module: string,
    type: string 
}

export type FieldConfig = {
    name: string,
    label: string,
    typeMeta?: MetaTypeConfig,
    type: string
}

export type MetaTypeConfig = {
    relationModel: string,
    type: 'Relation'
}







```


## modules

- 说明： 模块的初始化配置
- 类型： ModuleConfig[]



```
export type ModuleConfig = {
    name: string,
    label: string,
}

```


## height

- 说明： 容器的高度
- 类型： number | string




## style

- 说明： 容器的样式设置
- 类型： html style  对象

## onIgnoreEdge
- 说明： 是否忽略连接线的创建
- 类型： (field: FieldConfig) => boolean