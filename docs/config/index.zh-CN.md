---
order: 1
nav:
    order: 2
    title: 配置项
toc: menu
---

# props

 <code src="../type-erd.tsx"  inline ></code>

## models

-   说明： 模型和字段的初始化配置
-   类型： ModelConfig[]

```

export type ModelConfig = {
    name: string
    label: string
    fields: FieldConfig[]
    module: string
    type?: string

    aggregateRoot?: boolean
    aggregateModelKey: string
    belongAggregate: string
}

export type MetaTypeConfig = {
    relationModel: string
    type: 'Relation'
}

export type FieldMetaTypeConfig = {
    relationModel: string
    type: 'Relation'
    field: string
}

export type FieldConfig = {
    name: string
    label: string
    typeMeta?: MetaTypeConfig | FieldMetaTypeConfig[]
    type: string
}











```

## modules

-   说明： 模块的初始化配置
-   类型： ModuleConfig[]

```
export type ModuleConfig = {
    name: string,
    label: string,
}

```

## height

-   说明： 容器的高度
-   类型： number | string ｜ undefined
-   默认值： undefined

## style

-   说明： 容器的样式设置
-   类型： html style   对象
-   默认值： undefined

## themeColor

-   说明： 皮肤主颜色
-   类型： string
-   默认值： black

## darkness

-   说明： 是否暗色背景
-   类型： boolean
-   默认值：false

## onIgnoreEdge

-   说明： 是否忽略连接线的创建
-   类型： (field: FieldConfig) => boolean

## onModelDetail

-   说明： 点击模型“查看”按钮事件
-   类型： (model: ModelConfig) => void

## onReload

-   说明： 刷新数据按钮接口
-   类型： () => TData
-   默认值： undefine

```
 export type TData = {
    models : ModelConfig[],
    modules :ModuleConfig[]
}
```

## intl

-   说明： 内置国际化配置
-   类型： 'EN'|'CH'
-   默认值：'CH'

## onIntl

-   说明： 外置的国际化传入接口
-   类型： (text: string) => string
-   默认值：undefine

## components

-   说明： 用于替换antd的默认组件
-   类型： IComponentConfig
-   默认值：undefine

```
export type IComponentConfig = {
    Tree?: React.ComponentType
    Input?: React.ComponentType
    Button?: React.ComponentType
    Dropdown?: React.ComponentType
    Menu?: React.ComponentType
    Select?: React.ComponentType
    Tooltip?: React.ComponentType
}

```

##  IconRenders
-   说明： 用于替换工具栏的图标组件
-   类型： Record<string, React.ReactNode>
-   默认值：undefine

```
    undo: <RollbackOutlined />,   重做
    redo: <RollbackOutlined style={{ transform: 'scaleX(-1)' }} />, 撤销
    min: <ZoomOutOutlined />, 缩小
    max: <ZoomInOutlined />,  放大
    full: <BorderOutlined />, 全屏
    miniMap: <PictureFilled />, 小地图显示
    miniMapNo: <PictureOutlined />, 小地图关闭
    dagreLayout: <PartitionOutlined />, 层次布局
    relationLayout: <UngroupOutlined />, 关联布局
    reload: <ReloadOutlined />, 刷新
    image: <DownloadOutlined />, 下载地图
    darkness: <SnippetsFilled />, 暗黑模型
    light: <SnippetsOutlined />,  光明模式
    colorClose: <BgColorsOutlined />, 彩色面板关闭
    colorOpen: <BgColorsOutlined />   彩色面板打开

```

## disableIcons
-   说明： 用于禁用工具栏的图标,名称同上
-   类型： string[]
-   默认值：[]

## onlyMode
-   说明： 是否只有一种模式，开启后默认只有树形模式
-   类型： boolean
-   默认值：false

