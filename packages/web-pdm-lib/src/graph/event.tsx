import { debounce, throttle } from 'lodash'
import { Graph } from '@antv/g6'
import { RootInstance } from '../type'



export default (graph:Graph, mst : RootInstance) => {
  // alert(mst === window.kkk)
  // alert(mst.graph.G6Graph)
  const setZoom = debounce((zoom)=> {
    mst.graph.setZoom(zoom)
  }, 100)

  graph.on('wheelzoom', throttle(() => {
    // console.log(graph.getZoom())
    // alert()
    // setZoom(graph.getZoom())
    mst.graph.setZoom(graph.getZoom())

    // whZoom()
  },200))
   
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
        node.getEdges().forEach(a=>a.hide())
      } else {
        // 节点在视窗中，则展示
        node.getContainer().show()
        node.getEdges().forEach(a=>a.show())
        
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

  graph.on('node:click', (ev) => {
    const {
      target,
    } = ev
    
    if (target.attr('click')) {
      // props.toolBarCommand && props.toolBarCommand('click', {
      //   node: ev.item.getModel().id,
      //   arg: target.attr('arg'),
      //   click: target.attr('click'),
      // })
      // alert(mst.graph === window.ggg)
      // alert(mst.graph.G6Graph)
      // mst.graph.setG6Graph('3333')
      // alert(mst === window.kkk)
      // alert(window.kkk.graph.G6Graph)
      // mst.graph.setG6Graph(graph)

      // alert(JSON.stringify({
      //      node: ev.item.getModel().id,
      //      arg: target.attr('arg'),
      //      click: target.attr('click'),
      // }))
      if(target.attr('click') === 'modelEdit') {
        // const id :string = ev.item.getModel().id
        // const modelId = id.replace('model-', '')
        if(mst.sys.onModelDetail) {
             mst.sys.onModelDetail(ev.item.getModel().data)
        }
        
      }
      if(target.attr('arg')?.relationModel?.id) {
        mst.sys.centerCurrentModel([target.attr('arg')?.relationModel?.id])
      }
      

    } else {
       if(ev.item.getModel().id) {
         const id :string = ev.item.getModel().id
         const modelId = id.replace('model-', '')
        //  ev.item.toFront()
         mst.sys.setCurrentModel([modelId])
        //  alert(id.replace('model-', ''))
       }
    }
  })

  graph.on('node:mouseout', (ev) => {
    const {
      item,
    } = ev
    const autoPaint = graph.get('autoPaint')
    graph.setAutoPaint(false)
    item.getContainer().findAll((sharp) => sharp.attr('fieldHover')).forEach((sharp) => {
      if (sharp.attr('fill-old')) {
        sharp.attr('fill', sharp.attr('fill-old'))
        sharp.attr('fill-old', undefined)
      }

      if (sharp.attr('opacity-old')) {
        sharp.attr('opacity', sharp.attr('opacity-old'))
        sharp.attr('opacity-old', undefined)
      }
    })
    graph.paint()
    graph.setAutoPaint(autoPaint)
  })


  graph.on('node:mousemove', (ev) => {
    const {
      target,
      item,
    } = ev // alert(target.attr('text'))

    const autoPaint = graph.get('autoPaint')
    graph.get('canvas').set('localRefresh', false)
    graph.setAutoPaint(false) // if (target.attr('fieldBg')) {
    //   item.setState('fieldHover-' + target.attr('fieldName'), true)
    // }

    const fieldName = target.attr('fieldName')
    item.getContainer().findAll((sharp) => sharp.attr('fieldHover')).forEach((sharp) => {
      if (sharp.attr('fill-old')) {
        sharp.attr('fill', sharp.attr('fill-old'))
        sharp.attr('fill-old', undefined)
      }

      if (sharp.attr('fieldHoverShow')) {
        sharp.attr('opacity', 0) // sharp.attr('opacity-old', undefined)
      }

      if (sharp.attr('fieldName') === fieldName) {
        sharp.attr('fill-old', sharp.attr('fill'))
        sharp.attr('fill', sharp.attr('fieldBg') ? 'rgb(204,204,204)' : 'white')

        if (sharp.attr('fieldHoverShow')) {
          sharp.attr('opacity-old', sharp.attr('opacity')) // alert(sharp.attr('opacity'))

          sharp.attr('opacity', 1)
        }
      }
    }) // item.refresh()

    graph.paint()
    graph.setAutoPaint(autoPaint)
  })
  
  graph.on('node:dragend', (ev) => {
    // const shape = ev.target
    const node = ev.item
    const edges = node.getEdges()
    // const edges = graph.getEdges()
    edges.forEach((edge: any) => {
      let sourceNode = edge.get('sourceNode')
      let targetNode = edge.get('targetNode')
      const targetModel = targetNode.getModel()
      const edgeModel = edge.getModel()
      if((targetModel.visible || sourceNode.getModel().visible) && graph.getZoom() >= 0.3 ) {
      if(!edgeModel.self && !edgeModel.isSys) {
        const isTo = sourceNode.getModel().x < targetNode.getModel().x
        const i = edgeModel.fieldIndex
        const l = edgeModel.fieldsLength

        // const isTo = targetModel.x > sourceNode.getModel().x
        const sourceAnchor = (!isTo ? i + 2 : 2 + i + l)
        // if (targetModel.targetAnchor !== targetAnchor)
        //   // edge.set('targetAnchor', targetAnchor)
          graph.updateItem(edge, { sourceAnchor })
      }
     }

      if (!targetModel.visible || !sourceNode.getModel().visible) {
        edge.hide()
        // return
      }
      // if (isExporting) return

      if (!sourceNode.getContainer().get('visible') && !targetNode.getContainer().get('visible')) {
        edge.hide()
      } else {
        edge.show()
      }
    })
  })

}