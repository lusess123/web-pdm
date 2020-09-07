import React, { useEffect, useRef, useCallback } from 'react'
import G6, { Graph } from '@antv/g6'
import { useMst } from '../context'
import register from './item'
import { observer } from 'mobx-react-lite'
import ToolBar from '../components/model-toolbar'
import './model.scss'
import GraphEvent from './event'
import { initStyle } from './item/style'
import { useUpdateItem } from './hooks'
import { tuple } from 'antd/lib/_util/type'
// import mst from 'test/mst'


export default observer(() => {
  const { setRef, erdGraph } = useLocal()
  return <>
  <ToolBar graph={erdGraph} />
  <div ref={setRef} className='graph' />
  </>
})

const useLocal = () => {
  const mst = useMst()
  // window.kkk = mst

  const containerRef = useRef(null)
  const erdGraphRef = useRef<Graph>(null)
  useEffect(() => { register() }, [])
  useEffect(
    () => {
      // alert()
      const { Nodes , edges } = mst
      if (!erdGraphRef.current) {
        //  alert(mst.Nodes.length)
        // alert(mst === window.kkk)
         erdGraphRef.current = render(containerRef.current, mst.Nodes, mst.edges, mst)
        //  alert(mst.graph.$modelId)
        async(() => {
          mst.graph.setG6Graph(erdGraphRef.current)
        })
        
        //  window.kkk1 = mst
      }
      else {
        // alert(mst.Nodes.length)
        layout(erdGraphRef.current,  Nodes , edges, mst)
        erdGraphRef.current.fitView(0)
      }
      
    }, [ mst.sys.checkedKeys, mst])
  const setRef = useCallback((ref) => { containerRef.current = ref }, [containerRef])
  useEffect(() => {
    const graph = erdGraphRef.current
    if(graph) {
      const gwidth = graph.get('width')
      const gheight = graph.get('height')
      const point = graph.getCanvasByPoint(gwidth / 2, gheight / 2)

      graph.zoomTo(mst.graph.zoom, point)
    }

  } , [mst.graph.zoom])

  useUpdateItem({
    currentModel : mst.sys.currentModel,
    graph : erdGraphRef.current as any,
    showNameOrLabel: mst.sys.showNameOrLabel
  })
  return {
    containerRef,
    setRef,
    erdGraph : erdGraphRef.current
  }
}

// const MINZOOM = 0.01
// const toolbar = new G6.ToolBar();
// const edgeBundling = new G6.Bundling({
//   bundleThreshold: 0.6,
//   K: 100,
// });
const render = (container: any, nodes: any, edges: any, mst) => {
  const height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 45
  // alert(height)
  const styleConfig = initStyle({primaryColor: 'blue'}).style

  const graph = new G6.Graph({
    height,
    width: container.offsetWidth - 20,
    container,
    fitView: true,

    fitCenter: true,
    enabledStack: true,
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
    maxZoom: 1.1,
    // layout : {
    //   type: 'force',
    //   condense: true,
    //   cols: 3,
    //   // workerEnabled: true,
    //   linkDistance: 0 ,
    //   alphaDecay: 0.2 ,
    //   preventOverlap: true,
    //   collideStrength: 0.5,
    //   nodeSpacing: -180,
    //   onLayoutEnd: () => {
    //     graph.isLayouting = false
    //     graph.fitView(0)

    // },

    modes: {
      default: [
        'drag-canvas', {
          type: 'zoom-canvas',
          minZoom: 0.0001,
          // enableOptimize: true,
          // optimizeZoom: true,
          maxZoom: 2.1,
          // enableOptimize: true,
        },
        {
          type: 'drag-node',
          // enableDelegate: true,
        },
        {
          type: 'edge-tooltip',
          formatText: (model) => {
            return model.tooltip;
          },
          offset: 10
        },
        // {
        //   type: 'activate-relations',
        //   resetSelected: true,
        //   trigger: 'click'
        // },
      ],
    },
    plugins: [
      // toolbar,
      new G6.Minimap({
        type: 'delegate',
        viewportClassName: 'g6-minimap-viewport-erd',
        delegateStyle: {
          fill: 'rgba(0,0,0,0.10)',
        },
      })
    ]
  })
  // alert(mst === window.kkk)
  GraphEvent(graph, mst)
  // const x = nodes[0].x
  // edgeBundling.bundling({ nodes, edges });
  graph.data({ nodes, edges })
  graph.isLayouting = true
  graph.render()
  // layout(graph, nodes)
  return graph
}



const layout = (graph : Graph, nodes: any, edges, mst) => {
  // graph.clear()
  graph.changeData({nodes, edges})

  // graph.getNodes().filter((a) => !a.isSys).forEach((node: any) => {
  //   // node.x = undefined
  //   // node.y = undefined
  //   const model = node.getModel()
  //   if (!model.visible) {
  //     // node.getContainer().hide()
  //     graph.hideItem(node)
  //     // return
  //   }
  // })

  // const _edges = graph.getEdges()
  // _edges.forEach((edge: any) => {
  //   let sourceNode = edge.get('sourceNode')
  //   let targetNode = edge.get('targetNode')
  //   const targetModel = targetNode.getModel()
  //   if (!targetModel.visible || !sourceNode.getModel().visible) {
  //     edge.hide()
  //     // return
  //   }
  // })

  // alert(graph.getNodes().length)

    graph.isLayouting = true
    async(() => graph.updateLayout({

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
      }

    }))
   
    // graph.fitView(0)

    return graph

}

const async = (fun) => {
  setTimeout(fun,500)
}