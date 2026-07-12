---
title: G6 实践与性能优化
---

# G6 实践与性能优化

这篇文档完整保留 web-pdm 早期在连接线、布局和大图性能上的实践，同时给出 G6 5 当前实现和迁移边界。历史代码帮助旧项目继续维护；新项目应优先采用后面的 G6 5 写法。

## 版本说明

- **旧版兼容写法**：原项目基于早期 G6，使用 `getModel()`、`getEdges()`、`updateItem()`、索引锚点、`beforepaint` 和 `worker-loader`。这些片段原样保留，适合阅读历史提交或维护旧版接入。
- **G6 5 当前写法**：当前 web-pdm 使用具名端口、`Graph#setData`、异步 `render/layout/draw`、`GraphEvent.AFTER_TRANSFORM` 和自定义 `Rect` 节点。
- **迁移边界**：web-pdm 的 `models`、`modules`、`typeMeta` 和事件 Props 尽量保持兼容；直接操作旧 G6 实例的内部代码不能原封不动运行在 G6 5，需要迁移到新的图数据和扩展 API。

## 连接线与锚点

ER 图常见的连接是“字段 → 模型”或“字段 → 字段”。在早期 G6 中，连接点通过“锚点”表达：

| 字段连接点在左边                                                                                                                        | 字段连接点在右边                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| ![连接点在左边](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588136918824-2cfa106e-f0f7-4f3e-b299-426371c92b0f.png) | ![连接点在右边](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588136926989-d34026c1-f3f5-4f8c-9416-f6fb9d10219f.png) |

### 旧版兼容写法：拖动后切换左右锚点

字段通常有左右两个固定锚点。早期实现会在 `node:dragend` 中比较两个模型的横向位置，然后修改边的 `sourceAnchor`：

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

“连到模型”的端点不适合只有两个固定位置。早期版本在模型四周均匀生成大量锚点，不指定边的目标锚点时，让 G6 自动选择距离最近的一个：

| 固定在模型两边                                                                                                                              | 自动选择模型周边最近点                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| ![旧版固定模型锚点](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588138245488-e6eab8cf-339a-46c4-82c0-c40ee057e8a3.png) | ![自动寻找最近模型锚点](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588138310858-5f9276ad-7c78-4a94-b7f0-402bd0dc3306.png) |

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

上下左右边界总共设置了 300 个均匀分布的锚点。这个方案改善了连线角度，但大量锚点也会增加数据与计算成本。

### G6 5 当前写法：具名端口

当前实现为表头和每一行字段创建稳定的具名端口，关系边直接指定 `sourcePort` 和 `targetPort`。它不依赖易变化的数字索引，也不需要生成 300 个模型边界点：

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

迁移时应把旧版 `sourceAnchor` / `targetAnchor` 的数字位置转换为有业务语义的端口 key。`typeMeta` 数据结构无需随 G6 API 一起改变。

## 布局算法选择

布局效果会直接影响 ER 图的可读性。项目早期依次尝试过层次、Grid、Concentric 和 Force 布局：

| 层次布局                                                                                                                            | Grid 布局                                                                                                                            | Concentric 布局                                                                                                                            | Force 布局                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| ![层次布局](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588140199877-89698070-c195-4852-87a1-eb73b7e39a63.png) | ![Grid 布局](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588140208864-f1eac2fe-bf72-4a4b-8190-a9aa9e6c2ce6.png) | ![Concentric 布局](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588140216177-62b07b4b-c295-46ba-96b8-1ece48b58d4c.png) | ![Force 布局](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588140844047-a0922410-2456-453d-b05c-219aa794758b.png) |

层次布局适合有明确方向的流程或依赖图；当存在许多无关联模型时，它可能把模型排成很长的一行。Force 最接近“根据关系自然摊开”的目标，但默认参数会让无关联模型分散得很远，造成空间浪费。

### 旧版兼容写法：不可见中心节点

早期解决办法是创建一个不可见的系统节点，并用系统边把所有模型拉到一起：

```js
const createSysNode = () => ({
  id: 'model-SYS-CENTER-POINT',
  type: 'circle',
  isSys: true,
  isKeySharp: true,
  size: 10,
});
```

![旧版 Force 最终效果](https://cdn.nlark.com/yuque/0/2020/png/250863/1588147821674-a4562cc3-7151-4319-94d7-e48f72442f86.png)

Force 不是一次性完成的布局，迭代过程会反映到界面上，因此用户会看到模型逐渐稳定的动画。

### G6 5 当前写法：真实尺寸、防重叠与关系距离

当前版本不再把系统节点暴露到业务数据中。Force 使用每个模型矩形的外接圆作为碰撞尺寸，并在布局结束后执行一次保留中心点的矩形去重叠；80 像素间距、关系距离、节点斥力和较弱的中心引力共同让有关联的模型保持接近，同时让孤立模型留在可用画布内。层次查看仍使用 AntV Dagre，关系探索使用 Force。

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
  // 小图充分收敛；模型越多，越早停止以控制首屏耗时。
  maxIteration: modelCount <= 100 ? 2000 : modelCount <= 300 ? 1000 : 400,
  minMovement: modelCount <= 100 ? 0 : modelCount <= 300 ? 0.15 : 0.25,
};
```

布局完成后，当前运行时再按模型真实宽高消除残余矩形重叠，并保持整体中心不漂移；随后根据关系两端的横向位置选择字段和表头的左、右具名端口。用户拖动模型结束后也会重新选择最近的一侧，避免连线穿过卡片。迁移时不要把旧系统节点加入 `models`；它不是公开模型，也不应出现在搜索、导航、小地图提示或导出结果中。

## Web Worker 的历史做法与当前边界

### 旧版兼容写法

早期 G6 的 Graph 布局支持 Web Worker，但 `subgraphLayout` 不支持；通过 ES 模块引用时，Webpack 还需要 `worker-loader` 封装 Worker 代码：

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

### G6 5 当前说明

当前发布包不再依赖 Webpack 或 `worker-loader`。如果未来把布局移动到 Worker，必须先验证消费端打包器、静态资源路径和 Cloudflare 部署产物能正确加载 Worker；在此之前，主线程布局配合关闭动画、减少不必要重排和缩放细节分级更加可预测。

## 性能优化

### 先测量 FPS

早期项目通过 `stats` 面板观察优化效果：

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

![历史 FPS 面板](https://cdn.nlark.com/yuque/0/2020/png/250863/1588147821658-ce332202-2378-4b2b-ac4a-9615cca7c734.png)

在当时的实现和设备上，800 个模型由最初个位数 FPS 优化到约 20 FPS。这个数字是历史测试记录，不等于所有设备或当前版本的性能承诺。

![节点数量与性能关系](https://cdn.nlark.com/yuque/0/2020/png/250863/1588147821894-651b35ab-c463-438d-bf90-d7efbbecdeeb.png)

早期经验把关系概括为：

> 性能 ≈ 1 /（画布大小 × 节点图形对象数量）

它不是严格公式，但揭示了两个长期有效的方向：减少无意义的绘制面积，以及减少当前细节层级中的图形对象。

### 旧版兼容写法：缩小真实画布

![旧版缩小画布控件](https://cdn.nlark.com/yuque/0/2020/png/250863/1588147821642-9bbb019f-2068-4a39-a19f-b1929a4e3a9a.png)

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

历史实现把真实画布缩小一半，再把显示比例乘以 2；当时的记录中，真实缩放比例可低至约 1.13%，性能提升明显。这是一种针对旧渲染链路的技巧，并不是当前 API 的必要用法。

### 旧版兼容写法：只绘制视口附近内容

缩放比例越小时，同一视口内出现的模型更多，但字段细节已经不可读；比例越大时，模型数量减少，细节才有价值：

| 小缩放：模型多、细节不可读                                                                                                            | 大缩放：模型少、细节丰富                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| ![小缩放比例](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588131029353-7f4ca53f-6b84-491c-bfaa-9d84536ce02f.png) | ![大缩放比例](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588131052471-82746406-ea60-402b-9254-87d9c26dba09.png) |

于是早期实现采用“所见即所渲染”：在 `beforepaint` 中计算视口画布坐标，隐藏视口外节点和两端都不可见的边，并用 `throttle` 限制执行频率。

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

这段历史实现有三个关键点：在 `beforepaint` 中判断可见性；G6 的 `show/hide` 可以真正停止对象渲染；使用节流避免频繁计算。

### G6 5 当前写法：细节分级但保持模型占位

当前版本监听 `GraphEvent.AFTER_TRANSFORM` 获取缩放比例，并根据比例降低节点细节。小比例时可以隐藏字段文字，但模型的完整矩形占位和表名仍然存在，避免布局碰撞盒突然消失、连线端口错位或用户失去模型方位感。

数据结构改变时才重新布局；主题、语言、选择状态等普通更新尽量保留节点位置并调用 `draw()`。G6 的异步操作由运行时队列串行执行，组件卸载后不再提交操作。导出 PNG 时会临时恢复完整细节，再恢复用户当前视图。

### 当前布局基准（仅作为开发参考）

2026-07-12 的本机纯布局基准中，46 个真实示例模型、27 条关系的 Force 计算约为 210ms，矩形去重叠约为 1ms；重叠由 2 对降为 0，关联边平均长度只增加约 0.4%。1000 个合成模型、999 条关系采用大图动态迭代后，Force 约为 2.36s，去重叠约为 83ms，重叠也能归零，但关联边平均长度明显增加。因此首页把“千级模型”明确写成持续优化和基准目标，而不是所有数据、设备上都能无压力运行的承诺。

这些数字不包含浏览器绘制、图片导出和宿主应用开销，也不能替代目标设备上的完整 Canvas 基准。

## 如何验证大型 ER 图

性能优化必须使用接近真实业务的数据，而不能只看少量演示模型。建议至少覆盖：

1. 空图和只有一个模型的边界情况；
2. 大量无关联模型形成的稀疏图；
3. 高连接度、长字段列表和自关联组成的密集图；
4. 800、1000、2000 等不同规模的合成数据，并记录设备、浏览器、首屏时间和交互帧率；
5. 桌面、窄屏以及明暗主题；
6. Force 布局后的模型重叠数、关系边长度、画布占用和缩放可读性。

只有通过当前版本、目标设备和可复现基准测出的结果，才应作为“千级模型”等产品性能描述；历史 800 模型约 20 FPS 的记录应继续作为演进参考，而不是替代新基准。
