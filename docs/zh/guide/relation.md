---
title: 关联关系
---

# 关联关系

模型关系通过字段的 `typeMeta` 声明，其中 `relationModel` 必须匹配另一个模型的 `name`。

## 模型级关系

当字段只需要指向另一个模型，而不指定目标字段时，可以使用单个对象。

```ts
{
  name: 'customer',
  label: '客户',
  type: 'relation',
  typeMeta: {
    type: 'Relation',
    relationModel: 'customer',
  },
}
```

## 字段级关系

当关系需要指向具体字段时使用数组。如果一个字段参与多条关系，可以传入多个条目。

```ts
{
  name: 'customerId',
  label: '客户编号',
  type: 'uuid',
  typeMeta: [
    {
      type: 'Relation',
      relationModel: 'customer',
      field: 'id',
    },
  ],
}
```

如果产品需要在不修改原始元数据的情况下隐藏部分关系，可以使用 `onIgnoreEdge`。
