---
title: Getting started
---

# Getting started

## Install

```bash
pnpm add web-pdm
```

Projects using npm can keep the original installation command:

```bash
npm i web-pdm
```

`react` and `react-dom` are peer dependencies. React 18 and React 19 are supported.

## Render your first diagram

```tsx
import WebPdm, { type ModelConfig, type ModuleConfig } from 'web-pdm';
import 'web-pdm/style.css';

const modules: ModuleConfig[] = [{ name: 'sales', label: 'Sales' }];

const models: ModelConfig[] = [
  {
    name: 'customer',
    label: 'Customer',
    module: 'sales',
    fields: [
      { name: 'id', label: 'ID', type: 'string' },
      { name: 'name', label: 'Name', type: 'string' },
    ],
  },
];

export function Schema() {
  return (
    <WebPdm
      erdkey="sales-schema"
      locale="en"
      models={models}
      modules={modules}
      theme="system"
    />
  );
}
```

Give every diagram a stable, unique `erdkey`. When `height` is omitted, the component uses a viewport-safe initial height. The parent element still needs enough horizontal space for the model navigator and canvas.

## Next steps

- Define richer [models](/guide/model).
- Add [relationships](/guide/relation).
- Review all [configuration options](/config/).
