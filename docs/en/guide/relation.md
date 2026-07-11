---
title: Relationships
---

# Relationships

Relationships are declared on a field through `typeMeta`. The referenced `relationModel` must match another model's `name`.

## Model-level relationship

Use a single object when the field points to another model without targeting a specific field.

```ts
{
  name: 'customer',
  label: 'Customer',
  type: 'relation',
  typeMeta: {
    type: 'Relation',
    relationModel: 'customer',
  },
}
```

## Field-level relationship

Use an array when the relationship targets a specific field. Multiple entries can be supplied when a field participates in more than one relation.

```ts
{
  name: 'customerId',
  label: 'Customer ID',
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

Use `onIgnoreEdge` when a product needs to suppress selected relationships without modifying its source metadata.
