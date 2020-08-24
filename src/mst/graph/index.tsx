import React, { useEffect, useRef, useCallback } from 'react'
import G6 from '@antv/g6'
import { useMst } from '../context'
import register from './item'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'
import './model.scss'
import GraphEvent from './event'
import { initStyle } from './item/style'

export default observer(() => {
  const { setRef } = useLocal()
  return <div ref={setRef} className='graph' />
})

const useLocal = () => {
  const mst = useMst()

  const containerRef = useRef({})
  const erdGraph = useRef<any>(null)
  useEffect(() => { register() }, [])
  useEffect(
    () => {
      const { Nodes , edges } = mst
      if (!erdGraph.current) {
         erdGraph.current = render(containerRef.current, mst.Nodes, mst.edges)
         erdGraph.current.fitView(0)
      }
      else {

        // erdGraph.current.changeData({ nodes: Nodes, edges })
        //erdGraph.current.changeData({ nodes: mst.Nodes, edges: mst.edges })
        //erdGraph.current.render()
        // erdGraph.current.isLayouting = true
        // alert(JSON.stringify( mst.Nodes))
        console.log('h:',Nodes)
        layout(erdGraph.current,  Nodes , edges)
        erdGraph.current.fitView(0)
      }
    }, [mst.Nodes])
  const setRef = useCallback((ref) => { containerRef.current = ref }, [containerRef])
  return {
    containerRef,
    setRef
  }
}

// const MINZOOM = 0.01

const render = (container: any, nodes: any, edges: any) => {
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight - 450
  const styleConfig = initStyle({primaryColor: 'blue'}).style
  const graph = new G6.Graph({
    height,
    width: container.offsetWidth - 20,
    container,
    fitView: true,
    fitCenter: true,
    animate: true,
    defaultNode: {
      color: '#5B8FF9',
      style: {
        fill: '#9EC9FF',
        lineWidth: 3,
      },
    },
    nodeStateStyles: {
      default: {
        fill: '#9EC9FF',
      }
    },
    defaultEdge : styleConfig.default.edge,
    edgeStateStyles: {
      default: styleConfig.default.edge,
    },
    minZoom: 0.001,
    // layout: {
    //   type: 'force',
    //   condense: true,
    //   cols: 3,
    //   workerEnabled: true,
    //   linkDistance: 0 ,
    //   alphaDecay: 0.2 ,
    //   preventOverlap: true,
    //   collideStrength: 0.5,
    //   nodeSpacing: -180,
    //   onLayoutEnd: () => {
    //     graph.isLayouting = false
    //     graph.fitView(0)
    //   }
    // }

    //   layout1 : {
    //   alphaDecay: 0.2 ,
    //   type: 'force',
    //   // collideStrength: 0.5,
    //   // nodeSpacing: (d) => {
    //   //   if (d.id === 'model-SYS-CENTER-POINT') {
    //   //     return 500;
    //   //   }
    //   //   return -150;
    //   // },

    //   // nodeStrength: d => {
    //   //   if (d.id === 'model-SYS-CENTER-POINT') {
    //   //     return : 500;
    //   //   }
    //   //   return 0;
    //   // },
    //   preventOverlap: true,
    //   onLayoutEnd: () => {
    //     graph.fitView(0)
    //   }

    // },

    modes: {
      default: [
        'drag-canvas', {
          type: 'zoom-canvas',
          minZoom: 0.0001,
          maxZoom: 2.1,
          // enableOptimize: true,
        },
        {
          type: 'drag-node',
          // enableDelegate: true,
        },
      ],
    },
    plugins: [
      new G6.Minimap({
        type: 'delegate',
        viewportClassName: 'g6-minimap-viewport-erd',
        delegateStyle: {
          fill: 'rgba(0,0,0,0.10)',
        },
      })
    ]
  })
  GraphEvent(graph)
  // const x = nodes[0].x
  graph.data({ nodes, edges })
  graph.isLayouting = true
  graph.render()
  // layout(graph, nodes)
  return graph
}



const layout = (graph, nodes: any, edges) => {
  // graph.getNodes().filter((a) => !a.isSys).forEach((node: any) => {
  //    [node.x, node.y] = [undefined, undefined];
  // })
  // graph.clear()

  // graph.changeData({nodes, edges})
  graph.changeData({nodes, edges})

  graph.getNodes().filter((a) => !a.isSys).forEach((node: any) => {
    // node.x = undefined
    // node.y = undefined
    const model = node.getModel()
    if (!model.visible) {
      // node.getContainer().hide()
      graph.hideItem(node)
      // return
    }
  })

  const _edges = graph.getEdges()
  _edges.forEach((edge: any) => {
    let sourceNode = edge.get('sourceNode')
    let targetNode = edge.get('targetNode')
    const targetModel = targetNode.getModel()
    if (!targetModel.visible || !sourceNode.getModel().visible) {
      edge.hide()
      // return
    }
  })

  // alert(nodes[0].x)
  // if (nodes.length > 0 &&  !nodes[0].x)
    graph.isLayouting = true
    graph.updateLayout({

      type: 'force',
      condense: true,
      cols: 3,
      workerEnabled: true,
      linkDistance: 0 ,
      alphaDecay: 0.2 ,
      preventOverlap: true,
      collideStrength: 0.5,
      nodeSpacing: -180,
      onLayoutEnd: () => {
        graph.isLayouting = false
        graph.fitView(0)
        // const nodes = graph.getNodes()
        // const nodes = graph.getNodes().reduce((pre, n) => {
        //   const { x, y, id } = n.getModel()
        //   return {
        //     ...pre,
        //     [id!]: {
        //       x,
        //       y,
        //     },
        //   }
        // }, {})
        // sessionStorage.setItem('console-erd-graph', JSON.stringify(nodes))
      }

    })
   
    // graph.layout()
    graph.fitView(0)

    return graph

}