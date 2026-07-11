---
title: 模型
---

# 模型与模块

一个模型代表画布上的一个实体，模块用于在左侧导航中组织相关模型。

```ts
type ModuleConfig = {
  name: string;
  label: string;
};

type ModelConfig = {
  name: string;
  label: string;
  module: string;
  fields: FieldConfig[];
  type?: string;
  aggregateRoot?: boolean;
  aggregateModelKey?: string;
  belongAggregate?: string;
};

type FieldConfig = {
  name: string;
  label: string;
  type?: string;
  typeMeta?: MetaTypeConfig | FieldMetaTypeConfig[];
};
```

## 命名规则

- `name` 是稳定的技术标识，关系定义和内部状态都会使用它。
- `label` 是界面中显示的可读名称。
- `module` 必须匹配 `modules` 中某一项的 `name`。
- 模型名和字段名应在各自作用域内保持唯一。

## 示例

```ts
const models = [
  {
    name: 'order',
    label: '订单',
    module: 'sales',
    fields: [
      { name: 'id', label: '编号', type: 'uuid' },
      { name: 'customerId', label: '客户编号', type: 'uuid' },
    ],
  },
];
```

只有在领域模型需要表达聚合边界时，才需要使用 `aggregateRoot`、`aggregateModelKey` 和 `belongAggregate`。
