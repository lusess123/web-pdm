import { useEffect, useRef } from 'react';
export const useUpdateItem = ({ currentModel, graph, showNameOrLabel, zoom }) => {
    const firstRef = useRef(true);
    useEffect(() => {
        const modelId = 'model-' + currentModel;
        if (graph) {
            if (firstRef.current) {
                firstRef.current = false;
                return;
            }
        }
        //  alert()
        // if (graph && !firstRef.current) {
        if (graph) {
            const gnodes = graph.getNodes();
            if (!gnodes.length)
                return;
            // alert(nodes.length)
            const zoomNum = graph.getZoom();
            // alert(zoomNum)
            // alert(JSON.stringify(nodes))
            gnodes.forEach((node) => {
                if (node.isSys)
                    return;
                const nodeModel = node.getModel();
                const nodeId = nodeModel.id;
                const data = nodeModel ? nodeModel.data : undefined;
                const isNoModule = (modelId || '').indexOf('module-') >= 0 && ((data && data.moduleKey) !== modelId);
                const isKeySharp = zoomNum <= 0.4;
                // const isCardSharp = zoomNum <= 0.05 * 2
                // const isKeySharp = false
                const isCardSharp = false;
                // alert(isKeySharp)
                graph.updateItem(node, {
                    selected: nodeId === modelId,
                    noSelected: nodeId !== modelId,
                    isNoModule,
                    isKeySharp,
                    isCardSharp,
                    showNameOrLabel
                });
            });
            //  const edges = graph.getEdges()
            //  if(edges.length && currentModel){
            //     edges.forEach(edge => {
            //       if (edge.isSys) return
            //       graph.setItemState(edge, 'active', true )
            //       // edge.attr('stroke','red')
            //     })
            //  }
            // graph.paint()
        }
    }, [currentModel, showNameOrLabel, zoom <= 0.4]);
};
