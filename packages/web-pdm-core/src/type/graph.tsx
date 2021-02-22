import { model, Model, prop, modelAction } from 'mobx-keystone'
import { Graph } from '@antv/g6/dist/g6.min.js'
@model('webpdm/TGraph')
export class TGraph extends Model({
    zoom: prop(0)
}) {
    G6Graph: Graph
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
        //  alert(zoom)
        this.zoom = zoom
    }
    @modelAction
    minZoom(graph: Graph) {
        // const gwidth = graph.get('width')
        // const gheight = graph.get('height')
        // const point = graph.getCanvasByPoint(gwidth / 2, gheight / 2)
        const zoom = this.zoom
        if (zoom > 0.2) {
            this.zoom = zoom - 0.1
        } else {
            this.zoom = zoom - 0.02
        }
    }

    @modelAction
    maxZoom(graph: Graph) {
        // const gwidth = graph.get('width')
        // const gheight = graph.get('height')
        // const point = graph.getCanvasByPoint(gwidth / 2, gheight / 2)
        const zoom = this.zoom
        if (zoom > 0.2) {
            this.zoom = zoom + 0.1
        } else {
            this.zoom = zoom + 0.02
        }
    }
    @modelAction
    container(graph: Graph) {
        graph.fitView(0)
        this.zoom = graph.getZoom()
    }

    @modelAction
    downAsImage() {
        const _graph: any = this.G6Graph
        if (!_graph) return
        const oldZoom = this.G6Graph.getZoom()
        //const newZoom = 100

        _graph.isExporting = true
        _graph
            .getNodes()
            .filter((a: any) => !a.isSys)
            .forEach(node => {
                node.getContainer().show()
                _graph.updateItem(node, {
                    isKeySharp: false,
                    isCardSharp: false
                })
            })
        const gwidth = _graph.get('width')
        const gheight = _graph.get('height')
        const point = _graph.getCanvasByPoint(gwidth / 2, gheight / 2)
        // graph.moveTo({x: point.x , y : point.y})
        // _graph.zoomTo(0.6, {x: point.x , y : point.y})
        // _graph.paint()
        // this.setZoom(0.6)
        _graph.zoomTo(0.8)
        _graph.downloadFullImage('模型图', undefined, {
            backgroundColor: 'rgb(245, 247, 255)'
        })
        _graph.isExporting = undefined
        _graph.zoomTo(oldZoom)
        this.setZoom(oldZoom)
        _graph
            .getNodes()
            .filter(a => !a.isSys)
            .forEach(node => {
                node.getContainer().show()
                _graph.updateItem(node, {
                    isKeySharp: oldZoom < 0.4,
                    isCardSharp: false
                })
            })
    }

    actionEdges(currentModel: string) {
        if (!this.G6Graph) return
        this.G6Graph.getEdges().forEach(edge => {
            const edgeData = edge.getModel()
            if (edgeData.target !== 'model-SYS-CENTER-POINT') {
                edge.setState('active', false)
                if (
                    edgeData.source === 'model-' + currentModel ||
                    edgeData.target === 'model-' + currentModel
                ) {
                    edge.setState('active', true)
                    edge.toFront()
                }
            }
        })
    }
}
