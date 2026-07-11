---
title: 升级迁移
---

# 从 0.0.x 升级

当前版本继续兼容原有的模型元数据结构，但构建工具和 UI 层已经有较大变化。

## 1. 更新依赖

```bash
pnpm add web-pdm@latest
```

`web-pdm` 已经包含可直接使用的轻量控件。只有需要自行提供全部 UI 适配器时，才建议直接安装 `web-pdm-core`。

## 2. 移除 Ant Design 假设

默认包不再依赖 Ant Design。可以删除应用中仅为 `web-pdm` 引入的 Ant Design 样式。如果之前通过 `components` 传入 Ant Design 组件，请移除该覆盖，或按照当前组件接口重新适配。

## 3. 检查必填属性

每张图都必须提供 `models`、`modules` 和稳定的 `erdkey`。如果父容器没有明确高度，还需要为组件设置 `height`。

## 4. 配置语言和主题

使用 `locale="en" | "zh-CN"` 切换内置文案，使用 `theme="light" | "dark" | "system"` 切换完整工作台主题。旧的 `intl` 和 `darkness` 属性继续兼容。

## 5. 重新验证持久化状态

如果模型身份或持久化状态结构发生变化，请使用新的 `erdkey`，避免浏览器中的旧状态应用到另一张图上。
