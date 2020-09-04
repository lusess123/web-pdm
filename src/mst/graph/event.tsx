import { debounce, throttle } from 'lodash'
import { Graph } from '@antv/g6'
 import { RootInstance } from '../type'

export default (graph:Graph, mst : RootInstance) => {

  graph.on('wheelzoom', throttle(() => {
    // console.log(graph.getZoom())
    // alert()
    mst.graph.setZoom(graph.getZoom())

    // whZoom()
  },300))
   
  graph.on('beforepaint', throttle(() => {
    // alert()
    if(graph.isLayouting) return
    const isExporting = graph['isExporting']
    const gWidth = graph.get('width')
    const gHeight = graph.get('height')
    // 获取视窗左上角对应画布的坐标点
    const topLeft = graph.getPointByCanvas(0, 0) // 获取视窗右下角对应画布坐标点

    const bottomRight = graph.getPointByCanvas(gWidth, gHeight)
    graph.getNodes().filter((a) => !a.isSys).forEach((node) => {
      const model = node.getModel()
      if(model.isSys) return
      if (!model.visible) {
        // node.getContainer().hide()
        graph.hideItem(node)
        // return
      }
      if (isExporting) return
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
    edges.forEach((edge: any) => {
      let sourceNode = edge.get('sourceNode')
      let targetNode = edge.get('targetNode')
      const targetModel = targetNode.getModel()
      if (!edge.getModel().self) {
        const isTo = targetModel.x > sourceNode.getModel().x
        const targetAnchor = (isTo ? 0 : 1)
        if (targetModel.targetAnchor !== targetAnchor)
          // edge.set('targetAnchor', targetAnchor)
          graph.updateItem(edge, { targetAnchor })
      }

      if (!targetModel.visible || !sourceNode.getModel().visible) {
        edge.hide()
        // return
      }
      if (isExporting) return

      if (!sourceNode.getContainer().get('visible') && !targetNode.getContainer().get('visible')) {
        edge.hide()
      } else {
        edge.show()
      }
    })
  }, 300)) // graph.on('node:dblclick', (ev) => {
  // })

  //return graph
//}

   //------------------
    // graph.on('canvas:dragend', () => {
    //   const canvasElement = graph.get('canvas').get('el')
    //   canvasElement.style.cursor = 'grab'
  
    // })
   //-----------
   
   graph.on('canvas:dragstart', () => {
    const canvasElement = graph.get('canvas').get('el')
    canvasElement.style.cursor = 'grabbing'
  })

  // canvas:dragend
  graph.on('canvas:dragend', () => {
    const canvasElement = graph.get('canvas').get('el')
    canvasElement.style.cursor = 'grab'
  })
}