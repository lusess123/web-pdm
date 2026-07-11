---
title: 工具栏
---

# 工具栏

内置工具栏提供查看 ER 图时常用的操作：

- 撤销和重做；
- 缩小、放大和适应画布；
- 层次布局和关系布局；
- 显示或隐藏小地图；
- 刷新数据和导出图片；
- 切换明暗画布和颜色面板。

## 禁用操作

可以使用 `disableIcons` 移除产品中不需要的操作。

```tsx
<WebPdm disableIcons={['reload', 'image', 'miniMap']} {...props} />
```

## 替换图标

无 UI 的 core 层支持通过 `IconRenders` 替换图标。`web-pdm` 包已经提供轻量的 Lucide 图标，大多数应用不需要额外配置。

```tsx
<WebPdm IconRenders={{ reload: <MyReloadIcon /> }} {...props} />
```

当界面只需要树形导航模式时，可以启用 `onlyMode`。
