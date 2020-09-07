import { model, Model, prop, modelAction, getRoot } from 'mobx-keystone'
import { Graph } from '@antv/g6'
@model("webpdm/TGraph")
export class TGraph extends Model({
    zoom: prop(0)
}){
     G6Graph :Graph
    //  @modelAction
     setG6Graph(graph: Graph) {
        // alert(this.$modelId)
         this.G6Graph = graph
        // alert(this.$modelId)
        //  window.yyy = getRoot(this)
        //  alert( 'yyy.graph.G6Graph' + yyy.graph.G6Graph)
     }

     @modelAction
     setZoom(zoom: number) {
        this.zoom = zoom
     }
     @modelAction
     minZoom(graph : Graph) {
        // const gwidth = graph.get('width')
        // const gheight = graph.get('height')
        // const point = graph.getCanvasByPoint(gwidth / 2, gheight / 2)
        const zoom = graph.getZoom()
        if (zoom > 0.2) {
            this.zoom = zoom - 0.2
        } else {
            this.zoom = zoom - 0.02
        }
     }

     @modelAction
     maxZoom(graph : Graph) {
        // const gwidth = graph.get('width')
        // const gheight = graph.get('height')
        // const point = graph.getCanvasByPoint(gwidth / 2, gheight / 2)
        const zoom = graph.getZoom()
        if (zoom > 0.2) {
            this.zoom = zoom + 0.2
        } else {
            this.zoom = zoom + 0.02
        }
     }
     @modelAction
     container(graph : Graph) {
         graph.fitView(0)
         this.zoom = graph.getZoom()
     }
    
     @modelAction
     downAsImage() {
        const _graph = this.G6Graph
        if(!_graph) return 
        const oldZoom = this.G6Graph.getZoom()
        const newZoom = 100
        
        _graph.isExporting = true
        _graph.getNodes().filter((a) => !a.isSys).forEach((node) => {
          node.getContainer().show()
             _graph.updateItem(node, {
                isKeySharp: false,
                isCardSharp: false ,
              })
        })
        const gwidth = _graph.get('width')
        const gheight = _graph.get('height')
        const point = _graph.getCanvasByPoint(gwidth / 2, gheight / 2)
        // graph.moveTo({x: point.x , y : point.y})
        _graph.zoomTo(newZoom / 100, {x: point.x , y : point.y})
        _graph.paint()
        _graph.downloadFullImage('模型图', undefined, {
          backgroundColor: 'rgb(245, 247, 255)',
        })
        _graph.isExporting = undefined
        _graph.zoomTo(oldZoom)
        
     }
     
}