---
title: Models
---

# Models and modules

A model describes one entity on the canvas. A module groups related models in the navigator.

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

## Naming rules

- `name` is the stable technical identifier used by relationships and internal state.
- `label` is the human-readable text shown in the interface.
- `module` must match the `name` of an entry in `modules`.
- Model and field names should be unique within their respective scope.

## Example

```ts
const models = [
  {
    name: 'order',
    label: 'Order',
    module: 'sales',
    fields: [
      { name: 'id', label: 'ID', type: 'uuid' },
      { name: 'customerId', label: 'Customer ID', type: 'uuid' },
    ],
  },
];
```

Use `aggregateRoot`, `aggregateModelKey` and `belongAggregate` only when your domain model needs aggregate boundaries.
