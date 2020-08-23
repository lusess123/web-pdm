import React, { useEffect, useRef, useCallback } from 'react'
import G6 from '@antv/g6'
import { useMst } from '../context'
import register from './item'
import { observer } from 'mobx-react-lite'
import './model.scss'

export default observer(() => {
  const { setRef } = useLocal()
  return <div ref={setRef} className='graph' />
})

const useLocal = () => {
  const mst = useMst()

  const containerRef = useRef({})
  useEffect(() => { register() }, [])
  useEffect(
    () => {
      if (mst.Nodes.length)
        render(containerRef.current, mst.Nodes, mst.edges)
    }, [mst.Nodes.length > 0])
  const setRef = useCallback((ref) => { containerRef.current = ref }, [containerRef])
  return {
    containerRef,
    setRef
  }
}

// const MINZOOM = 0.01

const render = (container: any, nodes: any, edges: any) => {
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight - 450
  const graph = new G6.Graph({
    height,
    width: container.offsetWidth - 20,
    container,
    fitView: true,
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
          // maxZoom: 2.1,
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
  graph.on('node:dragend1', () => {
    const nodes = graph.getNodes().reduce((pre, n) => {
      const { x, y, id } = n.getModel()
      return {
        ...pre,
        [id!]: {
          x,
          y,
        },
      }
    }, {})
    sessionStorage.setItem('console-erd-graph', JSON.stringify(nodes))
  })
  graph.on('canvas:dragend', () => {
    const canvasElement = graph.get('canvas').get('el')
    canvasElement.style.cursor = 'grab'

  })
  const x = nodes[0].x
  graph.data({ nodes, edges })
  graph.render()
  // alert(nodes[0].x)
  if (!x)
    graph.updateLayout({
      // alphaDecay: 0.2,
      type: 'force',
      preventOverlap: true,
      onLayoutEnd: () => {
        graph.fitView(0)
        // console.log(nodes)
        // const nodes = graph.getNodes()
        const nodes = graph.getNodes().reduce((pre, n) => {
          const { x, y, id } = n.getModel()
          return {
            ...pre,
            [id!]: {
              x,
              y,
            },
          }
        }, {})
        // sessionStorage.setItem('console-erd-graph', JSON.stringify(nodes))
      }

    })
}

