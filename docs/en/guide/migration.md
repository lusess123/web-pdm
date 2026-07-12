---
title: Migration
---

# Migrating from 0.0.x

The current packages keep the original model metadata shape, but the surrounding toolchain and UI layer have changed substantially.

## Compatibility boundary first

- `models`, `modules`, field `typeMeta`, aggregate fields, `onIgnoreEdge`, `onModelDetail`, `onReload`, `onIntl`, `components`, `IconRenders`, `disableIcons` and `onlyMode` remain available.
- `intl="CH" | "EN"` and `darkness` remain compatible, with `locale` and `theme` as their recommended replacements.
- Calls such as `graph.getNodes()`, `getModel()`, `updateItem()`, numeric anchors and `beforepaint` belong to the old internal G6 API. They must be migrated for G6 5 and are not part of the WebPdm public compatibility contract.
- The complete historical examples and their G6 5 counterparts remain in [G6 practices and performance](/guide/next).

## 1. Update the packages

```bash
pnpm add web-pdm@latest
```

`web-pdm` contains the ready-to-use lightweight controls. Install `web-pdm-core` directly only when you intend to provide every UI adapter yourself.

## 2. Remove Ant Design assumptions

The default package no longer depends on Ant Design. Delete application-level Ant Design style imports that existed only for `web-pdm`. If you previously passed Ant Design components through `components`, either remove that override or adapt it to the current component contract.

## 3. Confirm the required props

Every diagram must provide `models`, `modules` and a stable `erdkey`. Give the component an explicit `height` when its parent is not already height-constrained.

## 4. Configure language and theme

Use `locale="en" | "zh-CN"` for built-in component copy and `theme="light" | "dark" | "system"` for the complete workspace theme. The older `intl` and `darkness` props remain compatible.

## 5. Re-test saved state

Use a new `erdkey` when the schema identity or persisted state format has changed. This prevents stale browser state from being applied to a different diagram.

## 6. Migrate direct G6 calls

G6 5 uses new graph data, extension registration, named ports and an asynchronous lifecycle. Prefer WebPdm props and events for product integration. If a custom graph layer still needs direct access, convert numeric anchors to port keys, replace `updateItem` with data updates and `draw/render`, and await every asynchronous operation.
