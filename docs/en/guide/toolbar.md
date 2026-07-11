---
title: Toolbar
---

# Toolbar

The built-in toolbar provides the common actions needed to inspect a diagram:

- undo and redo;
- zoom out, zoom in and fit view;
- hierarchical and relationship-oriented layouts;
- minimap visibility;
- reload data and export an image;
- light/dark canvas and color-panel controls.

## Disable actions

Use `disableIcons` to remove actions that do not belong in your product.

```tsx
<WebPdm disableIcons={['reload', 'image', 'miniMap']} {...props} />
```

## Replace icons

The headless core accepts `IconRenders`. The `web-pdm` package already supplies lightweight Lucide icons, so most applications do not need to configure this option.

```tsx
<WebPdm IconRenders={{ reload: <MyReloadIcon /> }} {...props} />
```

Set `onlyMode` when the interface should expose only the tree navigation mode.
