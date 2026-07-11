---
title: G6 practices and performance
---

# G6 practices and performance

Large ER diagrams stress layout, rendering and interaction at the same time. The most useful optimizations are structural:

- connect edges to predictable model or field anchors;
- choose hierarchical layouts for directed schemas and relationship layouts for exploration;
- avoid recalculating layout on unrelated UI updates;
- render only the detail level that is useful at the current zoom;
- measure canvas frame time with representative production schemas;
- validate the worker asset pipeline before enabling off-main-thread layouts in a published package.

The current G6 5.1.1 runtime uses named field ports, level-of-detail nodes and serialized asynchronous operations. Data-only updates preserve node positions. Performance changes should be verified with empty, sparse and highly connected schemas at desktop and mobile viewport sizes.
