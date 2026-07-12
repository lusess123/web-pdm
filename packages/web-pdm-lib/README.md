# web-pdm

A lightweight, embeddable React ER diagram workspace powered by G6 5.

`web-pdm` includes the graph runtime, model navigation, layout controls, light
and dark themes, English and Chinese UI, and PNG export without requiring Ant
Design.

## Install

```bash
pnpm add web-pdm
```

## Usage

```tsx
import WebPdm from 'web-pdm';
import 'web-pdm/style.css';

export function SchemaWorkspace() {
  return (
    <WebPdm erdkey="example" models={models} modules={modules} height="100vh" />
  );
}
```

The public model, relation, event and customization APIs remain documented on
the [web-pdm website](https://erd.zyking.xyz/config/).

- [Live workspace](https://erd.zyking.xyz/)
- [Getting started](https://erd.zyking.xyz/guide/getting-started/)
- [GitHub](https://github.com/lusess123/web-pdm)

MIT © web-pdm contributors
