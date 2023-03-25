import { debounce, throttle } from 'lodash';
// declare interface Graph {
//   isLayouting : boolean
// }

export default (function (graph, mst) {
  // alert(mst === window.kkk)
  // alert(mst.graph.G6Graph)
  var setZoom = debounce(function (zoom) {
    mst.graph.setZoom(zoom);
  }, 100);
  graph.on('wheelzoom', throttle(function () {
    // console.log(graph.getZoom())
    // alert()
    // setZoom(graph.getZoom())
    mst.graph.setZoom(graph.getZoom());

    // whZoom()
  }, 200));
  graph.on('beforepaint', throttle(function () {
    // alert()
    if (graph['isLayouting']) {
      //  graph.getNodes().filter((a) => !a.isSys).forEach((node) => {
      //   node.getContainer().hide()
      //   // node.getEdges().forEach(a=>a.hide())
      //  })
      return;
    }
    var isExporting = graph['isExporting'];
    var gWidth = graph.get('width');
    var gHeight = graph.get('height');
    // 获取视窗左上角对应画布的坐标点
    var topLeft = graph.getPointByCanvas(0, 0); // 获取视窗右下角对应画布坐标点

    var bottomRight = graph.getPointByCanvas(gWidth, gHeight);
    graph.getNodes().filter(function (a) {
      return !a['isSys'];
    }).forEach(function (node) {
      var model = node.getModel();
      if (model.isSys) return;
      if (!model.visible) {
        // node.getContainer().hide()
        graph.hideItem(node);
        // return
      }

      if (isExporting) return;
      var _data = model['data'];
      var config = model['config'];
      var h = (config.headerHeight + _data.fields.length * config.fieldHeight + 4) / 2;
      var w = config.width / 2; // 如果节点不在视窗中，隐藏该节点，则不绘制
      // note:由于此应用中有minimap，直接隐藏节点会影响缩略图视图，直接隐藏节点具体内容

      if (!model.selected && (model.x + w < topLeft.x - 200 || model.x - w > bottomRight.x || model.y + h < topLeft.y || model.y - h > bottomRight.y)) {
        node.getContainer().hide();
        node.getEdges().forEach(function (a) {
          return a.hide();
        });
      } else {
        // 节点在视窗中，则展示
        node.getContainer().show();
        node.getEdges().forEach(function (a) {
          return a.show();
        });
      }
    });
    var endLayout = graph['endLayout'];
    if (endLayout || 1) {
      // alert('endLayout')

      graph.getEdges().forEach(function (edge) {
        var sourceNode = edge.get('sourceNode');
        var targetNode = edge.get('targetNode');
        var targetModel = targetNode.getModel();
        var edgeModel = edge.getModel();
        if ((targetModel.visible || sourceNode.getModel().visible) && graph.getZoom() >= 0.3) {
          if (!edgeModel.self && !edgeModel.isSys) {
            var isTo = sourceNode.getModel().x < targetNode.getModel().x;
            var i = edgeModel.fieldIndex;
            var l = edgeModel.fieldsLength;

            // const isTo = targetModel.x > sourceNode.getModel().x
            var sourceAnchor = !isTo ? i + 2 : 2 + i + l;
            // if (targetModel.targetAnchor !== targetAnchor)
            //   // edge.set('targetAnchor', targetAnchor)
            graph.updateItem(edge, {
              sourceAnchor: sourceAnchor
            });
          }
        }
        if (!targetModel.visible || !sourceNode.getModel().visible) {
          edge.hide();
          // return
        }
        // if (isExporting) return

        if (!sourceNode.getContainer().get('visible') && !targetNode.getContainer().get('visible')) {
          edge.hide();
        } else {
          edge.show();
        }
      });
    }
  }, 300)); // graph.on('node:dblclick', (ev) => {
  // })

  //return graph
  //}

  //------------------
  // graph.on('canvas:dragend', () => {
  //   const canvasElement = graph.get('canvas').get('el')
  //   canvasElement.style.cursor = 'grab'

  // })
  //-----------

  graph.on('canvas:dragstart', function () {
    var canvasElement = graph.get('canvas').get('el');
    canvasElement.style.cursor = 'grabbing';
  });

  // canvas:dragend
  graph.on('canvas:dragend', function () {
    var canvasElement = graph.get('canvas').get('el');
    canvasElement.style.cursor = 'grab';
  });
  graph.on('node:click', function (ev) {
    var target = ev.target;
    if (target.attr('click')) {
      var _target$attr, _target$attr$relation;
      // props.toolBarCommand && props.toolBarCommand('click', {
      //   node: ev.item.getModel().id,
      //   arg: target.attr('arg'),
      //   click: target.attr('click'),
      // })
      // alert(mst.graph === window.ggg)
      // alert(mst.graph.G6Graph)
      // mst.graph.setG6Graph('3333')
      // alert(mst === window.kkk)
      // alert(window.kkk.graph.G6Graph)
      // mst.graph.setG6Graph(graph)

      // alert(JSON.stringify({
      //      node: ev.item.getModel().id,
      //      arg: target.attr('arg'),
      //      click: target.attr('click'),
      // }))
      var click = target.attr('click');
      if (click === 'modelEdit') {
        // const id :string = ev.item.getModel().id
        // const modelId = id.replace('model-', '')
        if (mst.sys.onModelDetail) {
          mst.sys.onModelDetail(ev.item.getModel().data);
        }
      }
      if (click === 'arrangeShow') {
        mst.arrangeShow(target.attr('arg'));
      }
      if ((_target$attr = target.attr('arg')) !== null && _target$attr !== void 0 && (_target$attr$relation = _target$attr.relationModel) !== null && _target$attr$relation !== void 0 && _target$attr$relation.id) {
        var _target$attr2, _target$attr2$relatio;
        mst.sys.centerCurrentModel([(_target$attr2 = target.attr('arg')) === null || _target$attr2 === void 0 ? void 0 : (_target$attr2$relatio = _target$attr2.relationModel) === null || _target$attr2$relatio === void 0 ? void 0 : _target$attr2$relatio.id]);
      }
    } else {
      if (ev.item.getModel().id) {
        var id = ev.item.getModel().id;
        var modelId = id.replace('model-', '');
        //  ev.item.toFront()
        mst.sys.setCurrentModel([modelId]);
        //  alert(id.replace('model-', ''))
      }
    }
  });

  graph.on('node:mouseout', function (ev) {
    var item = ev.item;
    var autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    item.getContainer().findAll(function (sharp) {
      return sharp.attr('fieldHover');
    }).forEach(function (sharp) {
      if (sharp.attr('fill-old')) {
        sharp.attr('fill', sharp.attr('fill-old'));
        sharp.attr('fill-old', undefined);
      }
      if (sharp.attr('opacity-old')) {
        sharp.attr('opacity', sharp.attr('opacity-old'));
        sharp.attr('opacity-old', undefined);
      }
    });
    graph.paint();
    graph.setAutoPaint(autoPaint);
  });
  graph.on('node:mousemove', function (ev) {
    var target = ev.target,
      item = ev.item; // alert(target.attr('text'))

    var autoPaint = graph.get('autoPaint');
    graph.get('canvas').set('localRefresh', false);
    graph.setAutoPaint(false); // if (target.attr('fieldBg')) {
    //   item.setState('fieldHover-' + target.attr('fieldName'), true)
    // }

    var fieldName = target.attr('fieldName');
    item.getContainer().findAll(function (sharp) {
      return sharp.attr('fieldHover');
    }).forEach(function (sharp) {
      if (sharp.attr('fill-old')) {
        sharp.attr('fill', sharp.attr('fill-old'));
        sharp.attr('fill-old', undefined);
      }
      if (sharp.attr('fieldHoverShow')) {
        sharp.attr('opacity', 0); // sharp.attr('opacity-old', undefined)
      }

      if (sharp.attr('fieldName') === fieldName) {
        sharp.attr('fill-old', sharp.attr('fill'));
        sharp.attr('fill', sharp.attr('fieldBg') ? 'rgb(204,204,204)' : 'white');
        if (sharp.attr('fieldHoverShow')) {
          sharp.attr('opacity-old', sharp.attr('opacity')); // alert(sharp.attr('opacity'))

          sharp.attr('opacity', 1);
        }
      }
    }); // item.refresh()

    graph.paint();
    graph.setAutoPaint(autoPaint);
  });
  graph.on('node:dragend', function (ev) {
    // const shape = ev.target
    var node = ev.item;
    var edges = node.getEdges();
    // const edges = graph.getEdges()
    edges.forEach(function (edge) {
      var sourceNode = edge.get('sourceNode');
      var targetNode = edge.get('targetNode');
      var targetModel = targetNode.getModel();
      var edgeModel = edge.getModel();
      if ((targetModel.visible || sourceNode.getModel().visible) && graph.getZoom() >= 0.3) {
        if (!edgeModel.self && !edgeModel.isSys) {
          var isTo = sourceNode.getModel().x < targetNode.getModel().x;
          var i = edgeModel.fieldIndex;
          var l = edgeModel.fieldsLength;

          // const isTo = targetModel.x > sourceNode.getModel().x
          var sourceAnchor = !isTo ? i + 2 : 2 + i + l;
          // if (targetModel.targetAnchor !== targetAnchor)
          //   // edge.set('targetAnchor', targetAnchor)
          graph.updateItem(edge, {
            sourceAnchor: sourceAnchor
          });
        }
      }
      if (!targetModel.visible || !sourceNode.getModel().visible) {
        edge.hide();
        // return
      }
      // if (isExporting) return

      if (!sourceNode.getContainer().get('visible') && !targetNode.getContainer().get('visible')) {
        edge.hide();
      } else {
        edge.show();
      }
    });
  });
});