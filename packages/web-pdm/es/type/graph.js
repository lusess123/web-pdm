var _dec, _class, _class2, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

import { model, Model, prop, modelAction } from 'mobx-keystone';
export var TGraph = (_dec = model("webpdm/TGraph"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Model) {
  _inherits(TGraph, _Model);

  var _super = _createSuper(TGraph);

  function TGraph() {
    var _this;

    _classCallCheck(this, TGraph);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.G6Graph = void 0;
    return _this;
  }

  _createClass(TGraph, [{
    key: "setG6Graph",
    //  @modelAction
    value: function setG6Graph(graph) {
      // alert(this.$modelId)
      this.G6Graph = graph; // alert(this.$modelId)
      //  window.yyy = getRoot(this)
      //  alert( 'yyy.graph.G6Graph' + yyy.graph.G6Graph)
    }
  }, {
    key: "setZoom",
    value: function setZoom(zoom) {
      //  alert(zoom)
      this.zoom = zoom;
    }
  }, {
    key: "minZoom",
    value: function minZoom(graph) {
      // const gwidth = graph.get('width')
      // const gheight = graph.get('height')
      // const point = graph.getCanvasByPoint(gwidth / 2, gheight / 2)
      var zoom = graph.getZoom();

      if (zoom > 0.2) {
        this.zoom = zoom - 0.2;
      } else {
        this.zoom = zoom - 0.02;
      }
    }
  }, {
    key: "maxZoom",
    value: function maxZoom(graph) {
      // const gwidth = graph.get('width')
      // const gheight = graph.get('height')
      // const point = graph.getCanvasByPoint(gwidth / 2, gheight / 2)
      var zoom = graph.getZoom();

      if (zoom > 0.2) {
        this.zoom = zoom + 0.2;
      } else {
        this.zoom = zoom + 0.02;
      }
    }
  }, {
    key: "container",
    value: function container(graph) {
      graph.fitView(0);
      this.zoom = graph.getZoom();
    }
  }, {
    key: "downAsImage",
    value: function downAsImage() {
      var _graph = this.G6Graph;
      if (!_graph) return;
      var oldZoom = this.G6Graph.getZoom();
      var newZoom = 100;
      _graph.isExporting = true;

      _graph.getNodes().filter(function (a) {
        return !a.isSys;
      }).forEach(function (node) {
        node.getContainer().show();

        _graph.updateItem(node, {
          isKeySharp: false,
          isCardSharp: false
        });
      });

      var gwidth = _graph.get('width');

      var gheight = _graph.get('height');

      var point = _graph.getCanvasByPoint(gwidth / 2, gheight / 2); // graph.moveTo({x: point.x , y : point.y})


      _graph.zoomTo(newZoom / 100, {
        x: point.x,
        y: point.y
      });

      _graph.paint();

      _graph.downloadFullImage('模型图', undefined, {
        backgroundColor: 'rgb(245, 247, 255)'
      });

      _graph.isExporting = undefined;

      _graph.zoomTo(oldZoom);
    }
  }, {
    key: "actionEdges",
    value: function actionEdges(currentModel) {
      this.G6Graph.getEdges().forEach(function (edge) {
        var edgeData = edge.getModel();

        if (edgeData.target !== 'model-SYS-CENTER-POINT') {
          edge.setState('active', false);

          if (edgeData.source === 'model-' + currentModel || edgeData.target === 'model-' + currentModel) {
            edge.setState('active', true);
          }
        }
      });
    }
  }]);

  return TGraph;
}(Model({
  zoom: prop(0)
})), _temp), (_applyDecoratedDescriptor(_class2.prototype, "setZoom", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "setZoom"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "minZoom", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "minZoom"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "maxZoom", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "maxZoom"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "container", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "container"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "downAsImage", [modelAction], Object.getOwnPropertyDescriptor(_class2.prototype, "downAsImage"), _class2.prototype)), _class2)) || _class);