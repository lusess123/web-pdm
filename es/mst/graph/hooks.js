import { useEffect, useRef } from 'react';
export var useUpdateItem = function useUpdateItem(_ref) {
  var currentModel = _ref.currentModel,
      graph = _ref.graph,
      showNameOrLabel = _ref.showNameOrLabel,
      zoom = _ref.zoom;
  var firstRef = useRef(true);
  useEffect(function () {
    var modelId = 'model-' + currentModel;

    if (graph) {
      if (firstRef.current) {
        firstRef.current = false;
        return;
      }
    } //  alert()
    // if (graph && !firstRef.current) {


    if (graph) {
      var gnodes = graph.getNodes();
      if (!gnodes.length) return; // alert(nodes.length)

      var zoomNum = graph.getZoom(); // alert(zoomNum)
      // alert(JSON.stringify(nodes))

      gnodes.forEach(function (node) {
        if (node.isSys) return;
        var nodeModel = node.getModel();
        var nodeId = nodeModel.id;
        var data = nodeModel ? nodeModel.data : undefined;
        var isNoModule = (modelId || '').indexOf('module-') >= 0 && (data && data.moduleKey) !== modelId;
        var isKeySharp = zoomNum <= 0.4; // const isCardSharp = zoomNum <= 0.05 * 2
        // const isKeySharp = false

        var isCardSharp = false; // alert(isKeySharp)

        graph.updateItem(node, {
          selected: nodeId === modelId,
          noSelected: nodeId !== modelId,
          isNoModule: isNoModule,
          isKeySharp: isKeySharp,
          isCardSharp: isCardSharp,
          showNameOrLabel: showNameOrLabel
        });
      }); //  const edges = graph.getEdges()
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