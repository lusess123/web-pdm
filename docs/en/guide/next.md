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
- move expensive layout work off the main thread when the selected algorithm supports it.

The current G6 4.8 compatibility layer provides the graph primitives, while `web-pdm` owns the schema-specific node rendering, navigation and toolbar behavior. Performance changes should be verified with both sparse diagrams and highly connected schemas; G6 5 migration is a separate compatibility effort.
