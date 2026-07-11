---
title: 常见问题
---

# 常见问题

## web-pdm 已经支持 G6 5 吗？

支持。当前图层使用 G6 5.1.1，已经接入异步渲染生命周期、自定义节点、具名端口、Force 与 AntV Dagre 布局、Minimap 插件和图片导出 API。G6 实现被封装在组件内部的运行时适配层中，不会成为公开接口的一部分。

## 可以不使用 Ant Design 吗？

可以。默认的 `web-pdm` 包使用自维护轻量控件，在需要无障碍交互的地方使用 Radix primitives，并使用 Lucide 图标，不再要求安装 Ant Design。

## 如何切换组件语言？

设置 `locale="en"` 或 `locale="zh-CN"`，默认使用英文。旧的 `intl="EN" | "CH"` 属性继续兼容。

## 如何启用暗黑模式？

传入 `theme="light"`、`theme="dark"` 或 `theme="system"`。画布、节点、控件和浮层会一起切换；`themeColor` 只改变强调色，颜色不可读时会自动回退。

## 文档可以部署到 Cloudflare Pages 吗？

可以。使用 `pnpm build:site` 构建，并把 `docs-dist` 作为发布目录。站点是静态客户端应用，不需要 Docker。

## 为什么画布没有显示内容？

请检查容器高度是否大于零、每个模型是否引用了存在的模块、关系名称是否匹配真实模型，同时排查重复的模型标识。
