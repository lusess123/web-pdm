---
title: 快速开始
---

# 快速开始

## 安装

```bash
pnpm add web-pdm
```

`react` 和 `react-dom` 是 peer dependencies，同时支持 React 18 和 React 19。

## 渲染第一张 ER 图

```tsx
import WebPdm, { type ModelConfig, type ModuleConfig } from 'web-pdm';

const modules: ModuleConfig[] = [{ name: 'sales', label: '销售' }];

const models: ModelConfig[] = [
  {
    name: 'customer',
    label: '客户',
    module: 'sales',
    fields: [
      { name: 'id', label: '编号', type: 'string' },
      { name: 'name', label: '名称', type: 'string' },
    ],
  },
];

export function Schema() {
  return (
    <WebPdm
      erdkey="sales-schema"
      locale="zh-CN"
      models={models}
      modules={modules}
      theme="system"
    />
  );
}
```

每张图都应使用稳定且唯一的 `erdkey`。未传 `height` 时，组件会使用不超过浏览器视口的安全初始高度；父容器仍需提供足够的横向空间。

## 下一步

- 定义更完整的[模型](/zh/guide/model)。
- 添加模型之间的[关联关系](/zh/guide/relation)。
- 查看全部[配置项](/zh/config/)。
