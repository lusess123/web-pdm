import React, { useEffect, useRef, useCallback } from 'react';
import G6 from '@antv/g6';
import { withoutUndo } from 'mobx-keystone';
import { useMst } from '../context';
import register from './item';
import { observer } from 'mobx-react-lite';
import ToolBar from '../components/model-toolbar';
import './model.scss';
import GraphEvent from './event';
import { initStyle } from './item/style';
import { useUpdateItem } from './hooks';
// import mst from 'test/mst'
export default observer(() => {
    const mst = useMst();
    const { setRef, erdGraph } = useLocal();
    return React.createElement(React.Fragment, null,
        React.createElement(ToolBar, { graph: erdGraph }),
        React.createElement("div", { ref: setRef, className: 'graph' }));
});
const useLocal = () => {
    const mst = useMst();
    // window.kkk = mst
    const containerRef = useRef(null);
    const erdGraphRef = useRef(null);
    useEffect(() => { register(); }, []);
    const checkRef = useRef(+new Date());
    useEffect(() => {
        // alert()
        // const { Nodes , edges } = mst
        if (!erdGraphRef.current) {
            //  alert(mst.Nodes.length)
            // alert(mst === window.kkk)
            erdGraphRef.current = render(containerRef.current, mst.Nodes, mst.edges, mst);
            //  alert(mst.graph.$modelId)
            async(() => {
                mst.graph.setG6Graph(erdGraphRef.current);
                // layout(erdGraphRef.current,  Nodes , edges, mst)
            });
            //  window.kkk1 = mst
        }
        else {
            // alert(mst.Nodes.length)
            layout(erdGraphRef.current, mst.Nodes, mst.edges, mst);
            // erdGraphRef.current.fitView(0)
        }
    }, [JSON.stringify(mst.sys.checkedKeys), mst]);
    const setRef = useCallback((ref) => { containerRef.current = ref; }, [containerRef]);
    useEffect(() => {
        const graph = erdGraphRef.current;
        if (graph) {
            const gwidth = graph.get('width');
            const gheight = graph.get('height');
            const point = graph.getCanvasByPoint(gwidth / 2, gheight / 2);
            graph.zoomTo(mst.graph.zoom, point);
        }
    }, [mst.graph.zoom]);
    //  alert('useUpdateItem' + mst.graph.zoom)
    useUpdateItem({
        currentModel: mst.sys.currentModel,
        graph: erdGraphRef.current,
        showNameOrLabel: mst.sys.showNameOrLabel,
        zoom: mst.graph.zoom,
        checkNum: checkRef.current,
        themeColor: mst.Ui.themeColor
    });
    return {
        containerRef,
        setRef,
        erdGraph: erdGraphRef.current
    };
};
// const MINZOOM = 0.01
// const toolbar = new G6.ToolBar();
// const edgeBundling = new G6.Bundling({
//   bundleThreshold: 0.6,
//   K: 100,
// });
const render = (container, nodes, edges, mst) => {
    const documentHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    const height = mst.sys.height === '100%' ? (documentHeight - 45) : (mst.sys.height - 45);
    // const height = mst.sys.height
    // alert(height)
    // alert(height)
    const styleConfig = initStyle({ primaryColor: mst.Ui.themeColor }).style;
    const isLargar = nodes.length > 50;
    // alert(isLargar)
    const graph = new G6.Graph({
        height,
        width: container.offsetWidth - 20,
        container,
        fitView: true,
        fitCenter: true,
        enabledStack: true,
        animate: true,
        // animate: true,
        defaultEdge: styleConfig.default.edge,
        edgeStateStyles: {
            default: styleConfig.default.edge,
            active: {
                opacity: 1,
                size: 3,
            }
        },
        minZoom: 0.01,
        maxZoom: 1.1,
        layout: {
            type: 'force',
            condense: true,
            cols: 3,
            workerEnabled: true,
            linkDistance: 0,
            alphaDecay: isLargar ? 0.3 : 0.15,
            preventOverlap: true,
            // collideStrength: 0.5,
            nodeSpacing: isLargar ? -100 : -180,
            onLayoutEnd: () => {
                graph.isLayouting = false;
                graph.fitView(0);
                withoutUndo(() => {
                    mst.graph.setZoom(graph.getZoom());
                });
                // // alert()
                // // alert('end' + graph.getZoom())
                // mst.graph.setZoom(graph.getZoom())
                // checkRef.current = + new Date()
            }
        },
        modes: {
            default: [
                'drag-canvas', {
                    type: 'zoom-canvas',
                    minZoom: 0.0001,
                    // enableOptimize: true,
                    // optimizeZoom: true,
                    maxZoom: 2.1,
                },
                {
                    type: 'drag-node',
                },
                {
                    type: 'edge-tooltip',
                    formatText: (model) => {
                        return model.tooltip;
                    },
                    offset: 10
                },
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
    });
    // alert(mst === window.kkk)
    GraphEvent(graph, mst);
    // const x = nodes[0].x
    // edgeBundling.bundling({ nodes, edges });
    graph.data({ nodes, edges });
    graph.isLayouting = true;
    graph.render();
    // layout(graph, nodes)
    return graph;
};
const layout = (graph, nodes, edges, mst) => {
    // graph.clear()
    graph.changeData({ nodes, edges });
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
    // const isLargar = graph.getNodes().length > 50 
    // // alert(isLargar)
    // graph.isLayouting = true
    // async(() => graph.updateLayout({
    //   type: 'force',
    //   condense: true,
    //   // cols: 3,
    //   workerEnabled: true,
    //   linkDistance: 0,
    //   alphaDecay: isLargar ? 0.1 : 0.3,
    //   // preventOverlap: false,
    //   // collideStrength: 0.5,
    //   // nodeSpacing: -1000,
    //   onLayoutEnd: () => {
    //     graph.isLayouting = false
    //     // graph.fitView(0)
    //     alert()
    //     // mst.graph.setZoom(graph.getZoom())
    //   }
    // }))
    // graph.fitView(0)
    return graph;
};
const async = (fun) => {
    setTimeout(fun, 500);
};
