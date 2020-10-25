import { useEffect } from 'react';
import { isEqual } from 'lodash';
export const useUpdateItem = ({ currentModel, graph, showNameOrLabel, zoom, themeColor, darkness }) => {
    // const firstRef = useRef(true)
    useEffect(() => {
        const modelId = 'model-' + currentModel;
        // if(graph)  {
        //     if(firstRef.current){
        //       firstRef.current = false
        //       return
        //     }
        //  }
        // isCardSharp      //  alert(zoom)
        // if (graph && !firstRef.current) {
        if (graph) {
            const gnodes = graph.getNodes();
            if (!gnodes.length)
                return;
            // alert(nodes.length)
            // const zoomNum = graph.getZoom()
            // alert(zoomNum)
            // alert(JSON.stringify(nodes))
            const t0 = +new Date();
            const isKeySharp = zoom <= 0.4;
            const isCardSharp = zoom <= 0.1;
            gnodes.forEach((node) => {
                if (!node.isSys) {
                    const nodeModel = node.getModel();
                    const nodeId = nodeModel.id;
                    const data = nodeModel ? nodeModel.data : undefined;
                    const isNoModule = (modelId || '').indexOf('module-') >= 0 &&
                        (data && data.moduleKey) !== modelId;
                    // const isKeySharp = false
                    // const isCardSharp = false
                    // alert(isKeySharp)
                    const currStates = {
                        selected: nodeModel.selected,
                        noSelected: nodeModel.noSelected,
                        isNoModule: nodeModel.isNoModule,
                        isKeySharp: nodeModel.isKeySharp,
                        isCardSharp: nodeModel.isCardSharp,
                        showNameOrLabel: nodeModel.showNameOrLabel,
                        themeColor: nodeModel.themeColor,
                        darkness: nodeModel.darkness
                    };
                    const nextStates = {
                        selected: nodeId === modelId,
                        noSelected: nodeId !== modelId,
                        isNoModule,
                        isKeySharp,
                        isCardSharp,
                        showNameOrLabel,
                        themeColor,
                        darkness
                    };
                    //const ggg = JSON.stringify(cur) !== JSON.stringify(f)
                    const change = !isEqual(currStates, nextStates);
                    if (change) {
                        //if(!eq(cur, f))
                        graph.updateItem(node, nextStates);
                        //  console.log(ggg)
                    }
                }
            });
            const t1 = +new Date();
            //  alert(t1 - t0)
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
    }, [
        currentModel,
        showNameOrLabel,
        zoom >= 0.4,
        zoom >= 0.1,
        zoom !== 0,
        themeColor,
        darkness
    ]);
};
