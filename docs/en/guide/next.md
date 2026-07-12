---
title: G6 practices and performance
---

# G6 practices and performance

This page preserves web-pdm's complete early work on edges, layouts and large-graph performance, then places the current G6 5 implementation and migration boundaries beside it. The historical code remains useful for maintaining old integrations; new projects should prefer the G6 5 patterns.

## Version guide

- **Legacy-compatible pattern:** early web-pdm used `getModel()`, `getEdges()`, `updateItem()`, numeric anchors, `beforepaint` and `worker-loader`. The examples are retained for old integrations and for understanding the project history.
- **Current G6 5 pattern:** web-pdm now uses named ports, `Graph#setData`, asynchronous `render/layout/draw`, `GraphEvent.AFTER_TRANSFORM` and a custom `Rect` node.
- **Migration boundary:** the public `models`, `modules`, `typeMeta` and event props remain compatible wherever possible. Code that directly manipulated an old G6 instance cannot run unchanged on G6 5 and must move to the new graph-data and extension APIs.

## Edges and anchors

An ER diagram commonly connects a field to a model or to another field. Early G6 releases represented these connection points as anchors:

| Field connection on the left                                                                                                                            | Field connection on the right                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Connection point on the left](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588136918824-2cfa106e-f0f7-4f3e-b299-426371c92b0f.png) | ![Connection point on the right](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588136926989-d34026c1-f3f5-4f8c-9416-f6fb9d10219f.png) |

### Legacy-compatible pattern: switch the side after dragging

A field usually had one fixed anchor on each side. The historical implementation compared the horizontal position of the two models after `node:dragend`, then updated the edge's `sourceAnchor`:

```js
graph.on('node:dragend', (ev) => {
  const node = ev.item;
  const edges = node.getEdges();
  const x = ev.x;

  edges.forEach((edge) => {
    const sourceNode = edge.getSource();
    const targetNode = edge.getTarget();
    const edgeModel = edge.getModel();
    const i = edgeModel.fieldIndex;
    const l = edgeModel.fieldsLength;

    if (sourceNode === targetNode) return;

    if (node === sourceNode) {
      const isTo = x < targetNode.getModel().x;
      graph.updateItem(edge, {
        sourceAnchor: !isTo ? i + 2 : 2 + i + l,
      });
    } else {
      const isTo = sourceNode.getModel().x < x;
      graph.updateItem(edge, {
        sourceAnchor: !isTo ? i + 2 : 2 + i + l,
      });
    }
  });
});
```

An edge that terminates at a model should not be limited to two fixed points. The early release generated many evenly distributed anchors around the full model border. When the target anchor was omitted, G6 could select the closest one:

| Fixed points on the model sides                                                                                                                    | Closest point around the full border                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Old fixed model anchors](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588138245488-e6eab8cf-339a-46c4-82c0-c40ee057e8a3.png) | ![Automatically selected border anchor](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588138310858-5f9276ad-7c78-4a94-b7f0-402bd0dc3306.png) |

```js
getAnchorPoints(cfg) {
  const { config, data } = cfg;
  const { fields } = data;
  const h = config.headerHeight + getLength(fields.length) * config.fieldHeight;

  return [
    [0, config.headerHeight / 2 / h],
    [1, config.headerHeight / 2 / h],
    ...fields.map((field, index) => {
      const x = 10 / config.width;
      const y = (
        config.headerHeight +
        config.fieldHeight * (index + 1) -
        config.fieldHeight / 2
      ) / h;
      return [x, y];
    }),
    ...fields.map((field, index) => {
      const x = (config.width - 10) / config.width;
      const y = (
        config.headerHeight +
        config.fieldHeight * (index + 1) -
        config.fieldHeight / 2
      ) / h;
      return [x, y];
    }),
    ...getTopAnch(50),
    ...getBottomAnch(50),
    ...getLeftAnch(100),
    ...getRightAnch(100),
  ];
}
```

That approach created 300 evenly distributed anchors across the four sides. It improved edge angles, although the large anchor set also increased data and calculation cost.

### Current G6 5 pattern: named ports

The current implementation creates stable named ports for the header and every field row. Each relationship names its `sourcePort` and `targetPort`, avoiding fragile numeric indexes and the need to generate 300 border points:

```ts
const ports = [
  { key: 'header-left', placement: [0, headerY] },
  { key: 'header-right', placement: [1, headerY] },
  ...fields.flatMap((field, index) => [
    { key: `field-${index}-left`, placement: [0, fieldY(index)] },
    { key: `field-${index}-right`, placement: [1, fieldY(index)] },
  ]),
];

const edge = {
  source: sourceModelId,
  target: targetModelId,
  style: {
    sourcePort: `field-${fieldIndex}-right`,
    targetPort: targetField ? `field-${targetFieldIndex}-left` : 'header-left',
  },
};
```

During migration, translate old numeric `sourceAnchor` and `targetAnchor` positions into ports with business-meaningful keys. The public `typeMeta` data does not need to change with the G6 API.

## Choosing a layout

Layout quality directly affects the readability of an ER diagram. The project originally compared hierarchical, Grid, Concentric and Force layouts:

| Hierarchical                                                                                                                                   | Grid                                                                                                                                   | Concentric                                                                                                                                   | Force                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| ![Hierarchical layout](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588140199877-89698070-c195-4852-87a1-eb73b7e39a63.png) | ![Grid layout](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588140208864-f1eac2fe-bf72-4a4b-8190-a9aa9e6c2ce6.png) | ![Concentric layout](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588140216177-62b07b4b-c295-46ba-96b8-1ece48b58d4c.png) | ![Force layout](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588140844047-a0922410-2456-453d-b05c-219aa794758b.png) |

A hierarchical layout works well for directed processes and dependency graphs. With many unrelated models, however, it can create a very long horizontal row. Force came closest to the goal of naturally spreading models according to relationships, but its defaults placed unrelated models too far apart and wasted space.

### Legacy-compatible pattern: an invisible center node

The early solution created an invisible system node and connected every model to it with a system edge:

```js
const createSysNode = () => ({
  id: 'model-SYS-CENTER-POINT',
  type: 'circle',
  isSys: true,
  isKeySharp: true,
  size: 10,
});
```

![Final legacy Force result](https://cdn.nlark.com/yuque/0/2020/png/250863/1588147821674-a4562cc3-7151-4319-94d7-e48f72442f86.png)

Force is iterative rather than instantaneous. Intermediate iterations are visible, so users see an animation while models settle.

### Current G6 5 pattern: real dimensions, collision prevention and relationship distance

The current release does not expose a system node in business data. Force uses the circumcircle of each model rectangle as its collision size, then runs a center-preserving rectangular de-overlap pass after layout. The 80-pixel spacing, relationship distance, node repulsion and gentle center gravity keep related models close while isolated models remain within useful canvas space. Hierarchical inspection still uses AntV Dagre, while relationship exploration uses Force.

```ts
const relationLayout = {
  type: 'force',
  preventOverlap: true,
  nodeSize: (node) => Math.hypot(...getFullErdNodeSize(node)),
  nodeSpacing: 80,
  collideStrength: 1,
  linkDistance: 360,
  nodeStrength: 1200,
  edgeStrength: 100,
  gravity: 3,
  damping: 0.82,
  maxSpeed: 100,
  interval: 0.015,
  // Let small graphs converge; cap work as model count grows.
  maxIteration: modelCount <= 100 ? 2000 : modelCount <= 300 ? 1000 : 400,
  minMovement: modelCount <= 100 ? 0 : modelCount <= 300 ? 0.15 : 0.25,
};
```

After Force completes, the runtime removes any remaining rectangular overlaps using the models' real width and height while keeping the overall center stable. It then chooses left or right named ports from the horizontal positions at both ends of each relationship. Ports are recalculated after a model drag as well, preventing a line from crossing through its cards. Do not add the old system node to `models` during migration. It is not a public model and must not appear in search, navigation, minimap hints or exports.

## Web Worker history and current boundary

### Legacy-compatible pattern

Early G6 graph layouts supported Web Workers, although `subgraphLayout` did not. ES-module builds also required Webpack's `worker-loader` to package the worker logic:

```js
{
  test: /\.worker\.ts$/,
  exclude: /(node_modules)/,
  use: [
    {
      loader: 'worker-loader',
      options: {
        inline: true,
        fallback: false,
        name: 'g6Layout.worker.js',
      },
    },
  ],
}
```

### Current G6 5 guidance

The published package no longer depends on Webpack or `worker-loader`. Moving layout work to a Worker in the future first requires verification that consumer bundlers, asset paths and the Cloudflare output can load it correctly. Until then, main-thread layout combined with disabled animation, fewer unnecessary relayouts and zoom-based detail levels is more predictable.

## Performance optimization

### Measure FPS first

The early project used a `stats` panel to observe performance changes:

```js
export const useFpsHook = () => {
  const fpsRef = useRef(null);

  useEffect(() => {
    if (
      fpsRef.current &&
      window.SYS_backEndConfig &&
      window.SYS_backEndConfig.ERD_FPS
    ) {
      const stats = new Stats();
      stats.showPanel(0);
      fpsRef.current.appendChild(stats.dom);
      stats.dom.style.position = 'relative';

      function animate() {
        stats.begin();
        stats.end();
        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    }
  }, []);

  return { fpsRef };
};
```

![Historical FPS panel](https://cdn.nlark.com/yuque/0/2020/png/250863/1588147821658-ce332202-2378-4b2b-ac4a-9615cca7c734.png)

On the implementation and hardware tested at the time, 800 models improved from single-digit FPS to roughly 20 FPS. This is a historical observation, not a guarantee for every device or for the current version.

![Relationship between object count and performance](https://cdn.nlark.com/yuque/0/2020/png/250863/1588147821894-651b35ab-c463-438d-bf90-d7efbbecdeeb.png)

The early experience summarized the relationship as:

> Performance ≈ 1 / (canvas area × number of node graphic objects)

This is not a strict formula, but it exposes two durable directions: avoid drawing meaningless area, and reduce the number of graphic objects at the current detail level.

### Legacy-compatible pattern: reduce the real canvas

![Legacy canvas scale control](https://cdn.nlark.com/yuque/0/2020/png/250863/1588147821642-9bbb019f-2068-4a39-a19f-b1929a4e3a9a.png)

```jsx
<Popover
  footer={false}
  content={
    <RadioGroup value={zoomNum * 2} onChange={zoomChange}>
      <Radio value={200}>100%</Radio>
      <Radio value={100}>50%</Radio>
      <Radio value={20}>10%</Radio>
    </RadioGroup>
  }
  placement="bottom"
>
  {graph && `${zoomNum * 2}%`}
</Popover>
```

The historical implementation halved the real canvas and doubled the displayed percentage. Its notes mention a real zoom as low as approximately 1.13% and a noticeable improvement. This was a technique for the old rendering pipeline, not a required current API pattern.

### Legacy-compatible pattern: render only content near the viewport

At a small zoom, more models appear in the viewport but field detail is unreadable. At a large zoom, fewer models appear and more detail becomes useful:

| Small zoom: more models, unreadable detail                                                                                            | Large zoom: fewer models, useful detail                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| ![Small zoom](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588131029353-7f4ca53f-6b84-491c-bfaa-9d84536ce02f.png) | ![Large zoom](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588131052471-82746406-ea60-402b-9254-87d9c26dba09.png) |

The early implementation therefore followed “what you see is what you render.” In `beforepaint`, it calculated canvas coordinates for the viewport, hid nodes outside it and hid edges when both ends were invisible. The entire calculation was throttled.

```js
graph.on(
  'beforepaint',
  _.throttle(() => {
    const gWidth = graph.get('width');
    const gHeight = graph.get('height');
    const topLeft = graph.getPointByCanvas(0, 0);
    const bottomRight = graph.getPointByCanvas(gWidth, gHeight);

    graph
      .getNodes()
      .filter((node) => !node.isSys)
      .forEach((node) => {
        const model = node.getModel();
        if (model.isSys) {
          node.getContainer().hide();
          return;
        }

        const { config, data } = model;
        const h =
          (config.headerHeight + data.fields.length * config.fieldHeight + 4) /
          2;
        const w = config.width / 2;
        const outside =
          model.x + w < topLeft.x - 200 ||
          model.x - w > bottomRight.x ||
          model.y + h < topLeft.y ||
          model.y - h > bottomRight.y;

        if (!model.selected && outside) node.getContainer().hide();
        else node.getContainer().show();
      });

    graph.getEdges().forEach((edge) => {
      const sourceNode = edge.get('sourceNode');
      const targetNode = edge.get('targetNode');

      if (targetNode.getModel().isSys) {
        edge.hide();
      } else if (
        !sourceNode.getContainer().get('visible') &&
        !targetNode.getContainer().get('visible')
      ) {
        edge.hide();
      } else {
        edge.show();
      }
    });
  }, 10),
);
```

Three ideas mattered: evaluate visibility during `beforepaint`; G6 `show/hide` could genuinely stop an object from rendering; throttle the work to avoid repeated calculations.

### Current G6 5 pattern: level of detail without losing the footprint

The current release listens to `GraphEvent.AFTER_TRANSFORM` and lowers node detail according to zoom. At small scales, field text can disappear, but the model's complete rectangular footprint and table name remain. This prevents the collision box from vanishing, ports from moving away from the visible model, and users from losing spatial context.

The graph relayouts only when structure changes. Ordinary theme, language and selection updates preserve node positions and prefer `draw()`. A runtime queue serializes G6 asynchronous operations and stops submitting work after unmount. PNG export temporarily restores full detail and then returns to the user's current view.

### Current layout benchmark (development reference only)

In a local layout-only benchmark on 2026-07-12, Force took about 210ms for the real 46-model, 27-relation fixture and the rectangle separation pass took about 1ms. Overlaps fell from two pairs to zero while average related-edge length increased by only about 0.4%. With 1,000 synthetic models and 999 relations, the scale-aware Force run took about 2.36s and separation about 83ms. Overlaps still reached zero, but average related-edge length grew substantially. The home page therefore describes thousand-model support as an optimization and benchmark target, not as a promise that every dataset and device will run without pressure.

These figures exclude browser painting, image export and host-application overhead. They do not replace a complete Canvas benchmark on the target devices.

## Validating a large ER diagram

Performance work must use data representative of real products rather than only a small demo. At minimum, test:

1. an empty diagram and a single-model boundary case;
2. sparse graphs with many unrelated models;
3. dense graphs with high degree, long field lists and self-relations;
4. synthetic sets of 800, 1,000 and 2,000 models, recording the device, browser, first-render time and interaction frame rate;
5. desktop and narrow viewports in both themes;
6. post-Force overlap count, relationship-edge length, canvas utilization and zoom readability.

Only reproducible measurements on the current release and target hardware should support product claims such as “thousand-model diagrams.” The historical result of roughly 20 FPS for 800 models remains useful evidence of the project's evolution, but it does not replace a current benchmark.
