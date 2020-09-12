var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { model, Model, prop, modelAction } from 'mobx-keystone';
let TGraph = class TGraph extends Model({
    zoom: prop(0)
}) {
    //  @modelAction
    setG6Graph(graph) {
        // alert(this.$modelId)
        this.G6Graph = graph;
        // alert(this.$modelId)
        //  window.yyy = getRoot(this)
        //  alert( 'yyy.graph.G6Graph' + yyy.graph.G6Graph)
    }
    setZoom(zoom) {
        //  alert(zoom)
        this.zoom = zoom;
    }
    minZoom(graph) {
        // const gwidth = graph.get('width')
        // const gheight = graph.get('height')
        // const point = graph.getCanvasByPoint(gwidth / 2, gheight / 2)
        const zoom = this.zoom;
        if (zoom > 0.2) {
            this.zoom = zoom - 0.1;
        }
        else {
            this.zoom = zoom - 0.02;
        }
    }
    maxZoom(graph) {
        // const gwidth = graph.get('width')
        // const gheight = graph.get('height')
        // const point = graph.getCanvasByPoint(gwidth / 2, gheight / 2)
        const zoom = this.zoom;
        if (zoom > 0.2) {
            this.zoom = zoom + 0.1;
        }
        else {
            this.zoom = zoom + 0.02;
        }
    }
    container(graph) {
        graph.fitView(0);
        this.zoom = graph.getZoom();
    }
    downAsImage() {
        const _graph = this.G6Graph;
        if (!_graph)
            return;
        const oldZoom = this.G6Graph.getZoom();
        //const newZoom = 100
        _graph.isExporting = true;
        _graph.getNodes().filter((a) => !a.isSys).forEach((node) => {
            node.getContainer().show();
            _graph.updateItem(node, {
                isKeySharp: false,
                isCardSharp: false,
            });
        });
        const gwidth = _graph.get('width');
        const gheight = _graph.get('height');
        const point = _graph.getCanvasByPoint(gwidth / 2, gheight / 2);
        // graph.moveTo({x: point.x , y : point.y})
        // _graph.zoomTo(0.6, {x: point.x , y : point.y})
        // _graph.paint()
        // this.setZoom(0.6)
        _graph.zoomTo(0.8);
        _graph.downloadFullImage('模型图', undefined, {
            backgroundColor: 'rgb(245, 247, 255)',
        });
        _graph.isExporting = undefined;
        _graph.zoomTo(oldZoom);
        this.setZoom(oldZoom);
        _graph.getNodes().filter((a) => !a.isSys).forEach((node) => {
            node.getContainer().show();
            _graph.updateItem(node, {
                isKeySharp: oldZoom < 0.4,
                isCardSharp: false,
            });
        });
    }
    actionEdges(currentModel) {
        if (!this.G6Graph)
            return;
        this.G6Graph.getEdges().forEach(edge => {
            const edgeData = edge.getModel();
            if (edgeData.target !== 'model-SYS-CENTER-POINT') {
                edge.setState('active', false);
                if (edgeData.source === 'model-' + currentModel || edgeData.target === 'model-' + currentModel) {
                    edge.setState('active', true);
                    edge.toFront();
                }
            }
        });
    }
};
__decorate([
    modelAction
], TGraph.prototype, "setZoom", null);
__decorate([
    modelAction
], TGraph.prototype, "minZoom", null);
__decorate([
    modelAction
], TGraph.prototype, "maxZoom", null);
__decorate([
    modelAction
], TGraph.prototype, "container", null);
__decorate([
    modelAction
], TGraph.prototype, "downAsImage", null);
TGraph = __decorate([
    model("webpdm/TGraph")
], TGraph);
export { TGraph };
