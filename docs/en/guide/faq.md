---
title: FAQ
---

# Frequently asked questions

## Does web-pdm already support G6 5?

Not yet. The current graph layer uses the G6 4.8 compatibility implementation. G6 5 requires a separate migration and regression pass before it can be claimed as supported.

## Can I use it without Ant Design?

Yes. The default `web-pdm` package uses source-owned lightweight controls, Radix primitives where accessibility behavior is needed, and Lucide icons. Ant Design is not required.

## How do I switch languages?

Set `locale="en"` or `locale="zh-CN"`. English is used by default. The older `intl="EN" | "CH"` prop remains compatible.

## How do I enable dark mode?

Pass `theme="light"`, `theme="dark"` or `theme="system"`. The complete canvas, nodes, controls and portaled overlays switch together. `themeColor` only changes the accent color and falls back when it would be unreadable.

## Can the documentation be deployed to Cloudflare Pages?

Yes. Build with `pnpm build:site` and publish `docs-dist`. The site is a static client application and does not require Docker.

## Why is the diagram empty?

Check that the container has a non-zero height, each model references an existing module, and relationship names match actual model names. Also look for duplicate model identifiers.
