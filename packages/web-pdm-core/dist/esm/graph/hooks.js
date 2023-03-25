import { useEffect } from 'react';
import { isEqual } from 'lodash';
export var useUpdateItem = function useUpdateItem(_ref) {
  var currentModel = _ref.currentModel,
    graph = _ref.graph,
    showNameOrLabel = _ref.showNameOrLabel,
    zoom = _ref.zoom,
    themeColor = _ref.themeColor,
    darkness = _ref.darkness;
  // const firstRef = useRef(true)
  useEffect(function () {
    var modelId = 'model-' + currentModel;
    // if(graph)  {
    //     if(firstRef.current){
    //       firstRef.current = false
    //       return
    //     }
    //  }
    // isCardSharp      //  alert(zoom)
    // if (graph && !firstRef.current) {
    if (graph) {
      var gnodes = graph.getNodes();
      if (!gnodes.length) return;
      // alert(nodes.length)
      // const zoomNum = graph.getZoom()
      // alert(zoomNum)
      // alert(JSON.stringify(nodes))
      var t0 = +new Date();
      var isKeySharp = zoom <= 0.4;
      var isCardSharp = zoom <= 0.1;
      gnodes.forEach(function (node) {
        if (!node.isSys) {
          var nodeModel = node.getModel();
          var nodeId = nodeModel.id;
          var data = nodeModel ? nodeModel.data : undefined;
          var isNoModule = (modelId || '').indexOf('module-') >= 0 && (data && data.moduleKey) !== modelId;

          // const isKeySharp = false
          // const isCardSharp = false
          // alert(isKeySharp)
          var currStates = {
            selected: nodeModel.selected,
            noSelected: nodeModel.noSelected,
            isNoModule: nodeModel.isNoModule,
            isKeySharp: nodeModel.isKeySharp,
            isCardSharp: nodeModel.isCardSharp,
            showNameOrLabel: nodeModel.showNameOrLabel,
            themeColor: nodeModel.themeColor,
            darkness: nodeModel.darkness
          };
          var nextStates = {
            selected: nodeId === modelId,
            noSelected: nodeId !== modelId,
            isNoModule: isNoModule,
            isKeySharp: isKeySharp,
            isCardSharp: isCardSharp,
            showNameOrLabel: showNameOrLabel,
            themeColor: themeColor,
            darkness: darkness
          };
          //const ggg = JSON.stringify(cur) !== JSON.stringify(f)
          var change = !isEqual(currStates, nextStates);
          if (change) {
            //if(!eq(cur, f))
            graph.updateItem(node, nextStates);
            //  console.log(ggg)
          }
        }
      });

      var t1 = +new Date();
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
  }, [currentModel, showNameOrLabel, zoom >= 0.4, zoom >= 0.1, zoom !== 0, themeColor, darkness]);
};