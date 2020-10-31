import React, { useEffect, useRef, useCallback } from 'react';
import G6 from '@antv/g6';
import { withoutUndo } from 'mobx-keystone';
import { useSize } from 'ahooks';
import { useMst } from '../context';
import register from './item';
import { observer } from 'mobx-react-lite';
import ToolBar from '../components/model-toolbar';
import './model.scss';
import GraphEvent from './event';
import { initStyle } from './item/style';
import { useUpdateItem } from './hooks';
// import { debounce } from 'lodash'
// import mst from 'test/mst'
export default observer(() => {
    // const mst = useMst()
    const { setRef, erdGraph, containerRef } = useLocal();
    // const size = useSize(containerRef);
    return (React.createElement(React.Fragment, null,
        React.createElement(ToolBar, { graph: erdGraph }),
        React.createElement("div", { ref: setRef, className: 'graph' })));
});
const useLocal = () => {
    const mst = useMst();
    // window.kkk = mst
    const containerRef = useRef(null);
    const erdGraphRef = useRef(null);
    const miniMapRef = useRef(null);
    useEffect(() => {
        register(mst);
    }, []);
    const checkRef = useRef(+new Date());
    const size = useSize(containerRef);
    useEffect(() => {
        // alert()
        // const { Nodes , edges } = mst
        if (!erdGraphRef.current) {
            //  alert(mst.Nodes.length)
            // alert(mst === window.kkk)
            //alert('erdGraphRef.current = render')
            const Obj = render(containerRef.current, mst.Nodes, mst.edges, mst);
            erdGraphRef.current = Obj.graph;
            miniMapRef.current = Obj.miniMap;
            //alert('erdGraphRef.current')
            //  alert(mst.graph.$modelId)
            async(() => {
                mst.graph.setG6Graph(erdGraphRef.current);
                // layout(erdGraphRef.current,  Nodes , edges, mst)
            });
            //  window.kkk1 = mst
        }
        else {
            //alert('  layout(erdGraphRef.current,  mst.Nodes ' + mst.Nodes.length)
            layout(erdGraphRef.current, mst.Nodes, mst.edges, mst);
            // erdGraphRef.current.fitView(0)
        }
    }, [JSON.stringify(mst.sys.checkedKeys), mst]);
    useEffect(() => {
        if (erdGraphRef.current && size.width && size.height) {
            // alert(erdGraphRef.current['isLayouting'])
            if (!erdGraphRef.current['isLayouting']) {
                const documentHeight = window.innerHeight ||
                    document.documentElement.clientHeight ||
                    document.body.clientHeight;
                const height = mst.sys.height === '100%'
                    ? documentHeight - 45
                    : mst.sys.height - 45;
                erdGraphRef.current.changeSize(size.width, height);
                erdGraphRef.current.fitView(0);
            }
        }
    }, [size.height, size.width]);
    const setRef = useCallback(ref => {
        containerRef.current = ref;
    }, [containerRef]);
    useEffect(() => {
        // debounce(()=> {
        const graph = erdGraphRef.current;
        if (graph) {
            const gwidth = graph.get('width');
            const gheight = graph.get('height');
            const point = graph.getCanvasByPoint(gwidth / 2, gheight / 2);
            graph.zoomTo(mst.graph.zoom, point);
        }
        // }
        //  }, 100)()
    }, [mst.graph.zoom]);
    const reloadRef = useRef(false);
    useEffect(() => {
        // debounce(()=> {
        const graph = erdGraphRef.current;
        if (graph) {
            if (!reloadRef.current) {
                reloadRef.current = true;
                return;
            }
            // alert()
            graph.clear();
            graph.data({ nodes: mst.Nodes, edges: mst.edges });
            graph.render();
            const isLargar = graph.getNodes().length > 50;
            graph.updateLayout({
                type: mst.sys.dagreLayout ? 'dagre' : 'force',
                condense: true,
                cols: 3,
                workerEnabled: true,
                linkDistance: 0,
                alphaDecay: isLargar ? 0.3 : 0.15,
                preventOverlap: true,
                // collideStrength: 0.5,
                //   type: 'dagre',
                //   // controlPoints: true,
                //   // nodeSize: [40, 20],
                // nodesep: 1,
                // ranksep: 1,
                // align: 'DL',
                // nodesep: 100, // 节点水平间距(px)
                // ranksep: 200, // 每一层节点之间间距
                nodeSpacing: isLargar ? -100 : -180,
                onLayoutEnd: () => {
                    async(() => {
                        // alert()
                        graph['isLayouting'] = false;
                        // graph['isLayouting'] = false
                        // alert('endlayout')
                        graph.fitView(0);
                        withoutUndo(() => {
                            mst.graph.setZoom(graph.getZoom());
                        });
                        // alert('onLayoutEnd')
                    }, 1000);
                }
            });
            if (mst.sys.dagreLayout) {
                async(() => {
                    //  alert()
                    graph.fitView(0);
                }, 1000);
            }
        }
    }, [mst.sys.dagreLayout]);
    //  alert('useUpdateItem' + mst.graph.zoom)
    useUpdateItem({
        currentModel: mst.sys.currentModel,
        graph: erdGraphRef.current,
        showNameOrLabel: mst.sys.showNameOrLabel,
        zoom: mst.graph.zoom,
        checkNum: checkRef.current,
        themeColor: mst.Ui.themeColor,
        darkness: mst.Ui.darkness
    });
    useEffect(() => {
        var _a, _b;
        if (erdGraphRef.current && miniMapRef.current) {
            // alert()
            if (!mst.sys.disableMiniMap) {
                (_a = erdGraphRef.current) === null || _a === void 0 ? void 0 : _a.removePlugin(miniMapRef.current);
            }
            else {
                const miniMap = new G6.Minimap({
                    type: 'delegate',
                    viewportClassName: 'g6-minimap-viewport-erd',
                    delegateStyle: {
                        fill: 'rgba(0,0,0,0.10)'
                    }
                });
                miniMapRef.current = miniMap;
                (_b = erdGraphRef.current) === null || _b === void 0 ? void 0 : _b.addPlugin(miniMap);
            }
        }
    }, [mst.sys.disableMiniMap]);
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
    const documentHeight = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    const height = mst.sys.height === '100%'
        ? documentHeight - 45
        : mst.sys.height - 45;
    // const height = mst.sys.height
    // alert(height)
    // alert(height)
    const styleConfig = initStyle({ primaryColor: mst.Ui.themeColor }).style;
    const isLargar = nodes.length > 50;
    // alert(isLargar)
    const miniMap = new G6.Minimap({
        type: 'delegate',
        viewportClassName: 'g6-minimap-viewport-erd',
        delegateStyle: {
            fill: 'rgba(0,0,0,0.10)'
        }
    });
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
                size: 3
            }
        },
        minZoom: 0.01,
        maxZoom: 1.1,
        layout: {
            type: mst.sys.dagreLayout ? 'dagre' : 'force',
            condense: true,
            cols: 3,
            workerEnabled: true,
            linkDistance: 0,
            alphaDecay: isLargar ? 0.3 : undefined,
            preventOverlap: true,
            // collideStrength: 0.5,
            nodeSpacing: isLargar ? -100 : -180,
            onLayoutEnd: () => {
                graph['isLayouting'] = false;
                graph['endLayout'] = true;
                graph.fitView(0);
                graph['endLayout'] = false;
                withoutUndo(() => {
                    mst.graph.setZoom(graph.getZoom());
                });
            }
        },
        modes: {
            default: [
                'drag-canvas',
                {
                    type: 'zoom-canvas',
                    minZoom: 0.0001,
                    // enableOptimize: true,
                    // optimizeZoom: true,
                    maxZoom: 2.1
                    // enableOptimize: true,
                },
                {
                    type: 'drag-node'
                    // enableDelegate: true,
                },
                {
                    type: 'edge-tooltip',
                    formatText: model => {
                        return model.tooltip;
                    },
                    offset: 10
                }
                // {
                //   type: 'activate-relations',
                //   resetSelected: true,
                //   trigger: 'click'
                // },
            ]
        },
        plugins: [
        // toolbar,
        // ...[mst.sys.disableMiniMap ? [] : [miniMap]]
        ]
    });
    // alert(mst === window.kkk)
    GraphEvent(graph, mst);
    // miniMap.init
    // const x = nodes[0].x
    // edgeBundling.bundling({ nodes, edges });
    graph.data({ nodes, edges });
    graph['isLayouting'] = true;
    graph.render();
    graph.fitView(0);
    if (mst.sys.dagreLayout) {
        async(() => {
            // alert()
            graph.fitView(0);
            withoutUndo(() => {
                mst.graph.setZoom(graph.getZoom());
            });
        });
    }
    // layout(graph, nodes)
    return { graph, miniMap };
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
const async = (fun, time = 500) => {
    setTimeout(fun, time);
};
