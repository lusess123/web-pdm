---
legacy: /next
---

<a name="tPlOC"></a>
## 踩坑和实践分享


<a name="2hOYO"></a>
### 连接线

<br />ER图的连线， "字段" --- "模型" <br />连接点，在G6里面是通过"锚点" 这个概念来实现的<br />


| ![5AA91131-06CD-48A6-8BBD-C2FE93AF8848.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588136918824-2cfa106e-f0f7-4f3e-b299-426371c92b0f.png#align=left&display=inline&height=1246&margin=%5Bobject%20Object%5D&name=5AA91131-06CD-48A6-8BBD-C2FE93AF8848.png&originHeight=1246&originWidth=2106&size=1279016&status=done&style=none&width=2106) | ![F8593258-BA3E-4F5F-B642-7774155DA7B4.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588136926989-d34026c1-f3f5-4f8c-9416-f6fb9d10219f.png#align=left&display=inline&height=335&margin=%5Bobject%20Object%5D&name=F8593258-BA3E-4F5F-B642-7774155DA7B4.png&originHeight=1194&originWidth=1838&size=1068211&status=done&style=none&width=515) |
| --- | --- |
| 连接点在左边 | 连接点在右边 |


<br />“连字段上的锚点”，固定上有两个，分别放在一左一右.**如何根据两个关联模型的相对方位自动选择左边还是右边**？<br />
<br />
<br />
<br />我的方案是在node:dragend事件里面根据相对方位做判断，修改dege的sourceAnchor的值：
```javascript
 graph.on('node:dragend', (ev) => {
    const shape = ev.target
    const node = ev.item
    const edges = node.getEdges()
    const x = ev.x
    edges.forEach((edge) => {
      const sourceNode = edge.getSource()
      const targetNode = edge.getTarget()

      if (node === sourceNode) {
        const edgeModel = edge.getModel()
        const isTo = x < targetNode.getModel().x
        const i = edgeModel.fieldIndex
        const l = edgeModel.fieldsLength
        if (sourceNode !== targetNode) { 
          graph.updateItem(edge, {
            sourceAnchor: !isTo ? i + 2 : 2 + i + l,
            // targetAnchor: isTo ? 0 : 1,
          })

        }

      } else {
        const edgeModel = edge.getModel()
        const isTo = sourceNode.getModel().x < x
        const i = edgeModel.fieldIndex
        const l = edgeModel.fieldsLength

        if (sourceNode !== targetNode) {
        graph.updateItem(edge, {
          sourceAnchor: !isTo ? i + 2 : 2 + i + l,
        })
      }
      }
    }) // ----获取所有的边
```

<br />“连到模型上的锚点”应该没有固定的位置，而是应该在整个模型节点表面自动连接最近的锚点，否则连线会很不好看<br />
<br />
<br />
<br />


| ![BBB8B7C5-068A-4E1C-85F2-A3EE116C80D2.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588138245488-e6eab8cf-339a-46c4-82c0-c40ee057e8a3.png#align=left&display=inline&height=1084&margin=%5Bobject%20Object%5D&name=BBB8B7C5-068A-4E1C-85F2-A3EE116C80D2.png&originHeight=1084&originWidth=1514&size=876975&status=done&style=none&width=1514) | ![608DE2AA-3015-44CA-8A4D-2828EA38313D.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588138310858-5f9276ad-7c78-4a94-b7f0-402bd0dc3306.png#align=left&display=inline&height=1186&margin=%5Bobject%20Object%5D&name=608DE2AA-3015-44CA-8A4D-2828EA38313D.png&originHeight=1186&originWidth=1734&size=948049&status=done&style=none&width=1734) |
| --- | --- |
| 旧版本“连到模型上的锚点”是固定在模型的两边 | 最新版本“连到模型上的锚点”会自动找到整个周边最接近的点 |


<br />实现思路是，当我在edge没有设置锚点的时候，g6会自动选择最接近的锚点，因为我在整个模型图上面都设置了无数的锚点可供选择：
```javascript
    getAnchorPoints(cfg) {
      const {
        config,
        data,
      } = cfg
      const {
        fields,
      } = data
      const h = config.headerHeight + getLength(fields.length) * config.fieldHeight
      return [[0, config.headerHeight / 2 / h], // 左上方
      [1, config.headerHeight / 2 / h], // 右上方
      ...fields.map((field, index) => {
        const x = 10 / config.width
        const l = config.headerHeight + config.fieldHeight * (index + 1) - config.fieldHeight / 2
        const y = l / h
        return [x, y]
      }), ...fields.map((field, index) => {
        const x = (config.width - 10) / config.width
        const l = config.headerHeight + config.fieldHeight * (index + 1) - config.fieldHeight / 2
        const y = l / h
        return [x, y]
      }),
      ...getTopAnch(50),
     ...getBottomAnch(50),
     ...getLeftAnch(100),
     ...getRightAnch(100),
    ]
```
上下左右的边界总共设置了300个锚点，并且均匀分布<br />
<br />

<a name="6IGxj"></a>
### 布局算法选择

<br />对于ER图来说，布局效果的好坏很影响整体的观感。[g6 内置了各种各样的布局](https://g6.antv.vision/zh/docs/api/layout/Graph)，到底哪一种最适合ER图呢？<br />


| ![B21C9A4F-566E-43AA-B077-F0897DA98834.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588140199877-89698070-c195-4852-87a1-eb73b7e39a63.png#align=left&display=inline&height=1358&margin=%5Bobject%20Object%5D&name=B21C9A4F-566E-43AA-B077-F0897DA98834.png&originHeight=1358&originWidth=2316&size=1314821&status=done&style=none&width=2316)

 | ![7B2EE233-E3D9-44B5-B4D9-1EAFFF05EB92.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588140208864-f1eac2fe-bf72-4a4b-8190-a9aa9e6c2ce6.png#align=left&display=inline&height=1394&margin=%5Bobject%20Object%5D&name=7B2EE233-E3D9-44B5-B4D9-1EAFFF05EB92.png&originHeight=1394&originWidth=1652&size=1083333&status=done&style=none&width=1652) | ![FD8ACE85-1901-4157-8CAA-09EC1E093DCC.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588140216177-62b07b4b-c295-46ba-96b8-1ece48b58d4c.png#align=left&display=inline&height=1334&margin=%5Bobject%20Object%5D&name=FD8ACE85-1901-4157-8CAA-09EC1E093DCC.png&originHeight=1334&originWidth=1826&size=1028342&status=done&style=none&width=1826) | ![8E6536A6-1007-435A-8B3F-2BE275636860.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588140844047-a0922410-2456-453d-b05c-219aa794758b.png#align=left&display=inline&height=1386&margin=%5Bobject%20Object%5D&name=8E6536A6-1007-435A-8B3F-2BE275636860.png&originHeight=1386&originWidth=1934&size=1137435&status=done&style=none&width=1934) |
| --- | --- | --- | --- |
| 层次布局 | grid布局 | concentric布局 | 力导布局 |


<br />试过各种各样的布局<br />最开始用的是层次布局，但是当没有关联的模型多的话，会在同一水平上排很长的模型， 看起来层次布局适合于流程图的情况<br />最后一个是力导布局（force）<br />力导布局最接近结果了，但是这个默认布局有个问题，没有关联关系的模型会拉得很开，造成空间上的浪费。<br />我最后解决的思路是，虚拟一个不可见的节点，把所有的模型拉在一起。<br />

```javascript

const createSysNode = () => {

  return  {
    id: 'model-SYS-CENTER-POINT',
    type: 'circle',
    isSys: true,
    isKeySharp: true,
    size:  10,
  }

}
```

<br />最终结果：<br />
<br />![638978A4-5A10-4576-986B-2BD3A509080C.png](https://cdn.nlark.com/yuque/0/2020/png/250863/1588147821674-a4562cc3-7151-4319-94d7-e48f72442f86.png#align=left&display=inline&height=1304&margin=%5Bobject%20Object%5D&name=638978A4-5A10-4576-986B-2BD3A509080C.png&originHeight=1304&originWidth=1690&size=1121802&status=done&style=none&width=1690)<br />
<br />
<br />由于力导向布局不是一次性布局好的，中间会产生多次布局，变化会反应到界面上，因此会有动画的效果。<br />
<br />注意：<br />
<br />[g6的graph的布局是支持webworker的](https://g6.antv.vision/zh/docs/manual/middle/layout#%E4%BD%BF%E7%94%A8-web-worker)，但是对于subgraphLayout 方式并不支持webworker, 需要自己实现。<br />如果使用es方式引用g6的化，webworker并不会支持，原因是es 代码需要经过webpack预处理，如果要解决在这个问题，webpack需要配置[worker-loader](https://www.webpackjs.com/loaders/worker-loader/)，用于封装webwoker执行逻辑的代码。
```javascript
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
      },
```

<br />
<br />
<br />
<br />

<a name="RSDvc"></a>
### 性能优化

<br />通过引入fps测试组件来衡量性能优化的程度<br />

```javascript
export const useFpsHook = () => {
  const fpsRef = useRef(null)
  useEffect(() => {
    if (fpsRef.current && window.SYS_backEndConfig && window.SYS_backEndConfig.ERD_FPS) {
      const stats = new Stats() // alert(stats.dom)

      stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom

      fpsRef.current.appendChild(stats.dom)
      stats.dom.style.position = 'relative'

      function animate() {
        stats.begin() // monitored code goes here

        stats.end()
        requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    }
  }, [])
  return {
    fpsRef,
  }
}
```
![21D2E555-F70B-4BD7-A799-174B8B102A2E.png](https://cdn.nlark.com/yuque/0/2020/png/250863/1588147821658-ce332202-2378-4b2b-ac4a-9615cca7c734.png#align=left&display=inline&height=294&margin=%5Bobject%20Object%5D&name=21D2E555-F70B-4BD7-A799-174B8B102A2E.png&originHeight=294&originWidth=494&size=93996&status=done&style=none&width=494)<br />从最开始的FPS 个位数，800 个模型情况，到现在的 20 左右 ，以下记录一些优化心得。<br />
<br />![1487709-20190809150507384-1624695011.png](https://cdn.nlark.com/yuque/0/2020/png/250863/1588147821894-651b35ab-c463-438d-bf90-d7efbbecdeeb.png#align=left&display=inline&height=353&margin=%5Bobject%20Object%5D&name=1487709-20190809150507384-1624695011.png&originHeight=353&originWidth=678&size=52005&status=done&style=none&width=678)<br />
<br />以上的图我们可以推出这个结论：
>        性能 =  1 /（画布大小 * 节点对象数量）

因此性能优化的大体思路就是让 画布越小， 可视区域的节点对象数量越少。<br />
<br />**缩小画布**<br />**<br />**![DB424001-A1F4-40F1-8F25-7CA8561759B8.png](https://cdn.nlark.com/yuque/0/2020/png/250863/1588147821642-9bbb019f-2068-4a39-a19f-b1929a4e3a9a.png#align=left&display=inline&height=270&margin=%5Bobject%20Object%5D&name=DB424001-A1F4-40F1-8F25-7CA8561759B8.png&originHeight=364&originWidth=782&size=94461&status=done&style=none&width=579)**<br />**<br />代码：
```javascript
  <Popover footer={false} content={<RadioGroup value={zoomNum * 2} onChange={zoomChange} >
        <Radio value={200}>100%</Radio>
        <Radio value={100}>50%</Radio>
        <Radio value={20}>10%</Radio>
      </RadioGroup>} placement='bottom' >
      {graph && `${zoomNum * 2 }%` }
      </Popover>
```

<br />真实缩放比例其实是1.13%，我其实是把画布缩小了一半，显示比例*2，性能提升还是挺明显的，这个其实是可以继续缩小，还有很大的优化空间。<br />
<br />
<br />**减少可视区域的节点数量**<br />**<br />我们发现：<br />


| 缩放比例越小 | 缩放比例越大 |
| --- | --- |
| ![0D84075E-E987-4125-A257-5B357678BF8C.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588131029353-7f4ca53f-6b84-491c-bfaa-9d84536ce02f.png#align=left&display=inline&height=1074&margin=%5Bobject%20Object%5D&name=0D84075E-E987-4125-A257-5B357678BF8C.png&originHeight=1074&originWidth=1428&size=596128&status=done&style=none&width=1428) | ![D94A188C-F8B1-4085-8554-77B8D5A834BF.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/150917/1588131052471-82746406-ea60-402b-9254-87d9c26dba09.png#align=left&display=inline&height=1174&margin=%5Bobject%20Object%5D&name=D94A188C-F8B1-4085-8554-77B8D5A834BF.png&originHeight=1174&originWidth=1624&size=621290&status=done&style=none&width=1624) |
| 模型数量越多，<br />但是模型的细节就看不清楚 | 模型细节就越多，<br />但是模型数量越小 |


<br />不清楚的地方，我们干脆就不显示，“所见即所渲染”<br />核心代码：
```javascript
  graph.on('beforepaint', _.throttle(() => {
    // alert()
    const gWidth  = graph.get('width')
    const gHeight = graph.get('height')
    // 获取视窗左上角对应画布的坐标点
    const topLeft = graph.getPointByCanvas(0, 0) // 获取视窗右下角对应画布坐标点

    const bottomRight = graph.getPointByCanvas(gWidth, gHeight)
    graph.getNodes().filter((a) => !a.isSys).forEach((node) => {
      const model = node.getModel()
      if (model.isSys) {
        node.getContainer().hide()
        return
      }
      const {
        config,
        data: _data,
      } = model
      const h = (config.headerHeight + _data.fields.length * config.fieldHeight + 4) / 2
      const w = config.width / 2 // 如果节点不在视窗中，隐藏该节点，则不绘制
      // note:由于此应用中有minimap，直接隐藏节点会影响缩略图视图，直接隐藏节点具体内容

      if (!model.selected && (model.x + w < topLeft.x - 200 || model.x - w > bottomRight.x || model.y + h < topLeft.y || model.y - h > bottomRight.y)) {
        node.getContainer().hide()
      } else {
        // 节点在视窗中，则展示
        node.getContainer().show()
      }
    })
    const edges = graph.getEdges()
    edges.forEach((edge) => {
      let sourceNode = edge.get('sourceNode')
      let targetNode = edge.get('targetNode')

      if (targetNode.getModel().isSys) {
        edge.hide()
        return
      }

      if (!sourceNode.getContainer().get('visible') && !targetNode.getContainer().get('visible')) {
        edge.hide()
      } else {
        edge.show()
      }
    })
  }, 10))
```


1. 在graph “beforepaint”里面做判断显示和隐藏逻辑，
1. G6 对show 和 hide 的实现跟HTML 不一样，可以真正的不render对象
1. 另外加入了throttle 防止频繁渲染。






