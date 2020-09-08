import "antd/es/tooltip/style/css";
import _Tooltip from "antd/es/tooltip";
import { FileMarkdownOutlined, FileImageOutlined, RollbackOutlined, UnlockOutlined, LockOutlined, ZoomOutOutlined, ZoomInOutlined, BorderOutlined, ArrowUpOutlined, ArrowDownOutlined, ArrowLeftOutlined, ArrowRightOutlined, RetweetOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React, { isValidElement } from 'react';
import { observer } from 'mobx-react-lite';
import { changeTwoDecimal_f, CreateComponent } from '../../util';
import { useMst } from '../../context'; // import StateStack from '../../state-stack'

import { undoManager } from '../../context';
var IconRenders = {
  'container': /*#__PURE__*/React.createElement(BorderOutlined, null),
  'arrow-up': /*#__PURE__*/React.createElement(ArrowUpOutlined, null),
  'arrow-down': /*#__PURE__*/React.createElement(ArrowDownOutlined, null),
  'arrow-left': /*#__PURE__*/React.createElement(ArrowLeftOutlined, null),
  'arrow-right': /*#__PURE__*/React.createElement(ArrowRightOutlined, null),
  'retweet': /*#__PURE__*/React.createElement(RetweetOutlined, null),
  'pdm': /*#__PURE__*/React.createElement(FileMarkdownOutlined, null),
  'lock': /*#__PURE__*/React.createElement(LockOutlined, null),
  'unlock': /*#__PURE__*/React.createElement(UnlockOutlined, null),
  'image': /*#__PURE__*/React.createElement(FileImageOutlined, null),
  'upload': /*#__PURE__*/React.createElement(FileImageOutlined, null),
  'min': /*#__PURE__*/React.createElement(ZoomOutOutlined, null),
  'max': /*#__PURE__*/React.createElement(ZoomInOutlined, null)
};
export default observer(function (_ref) {
  var _mst$graph;

  var graph = _ref.graph;
  var mst = useMst();
  var zoomNum = graph && changeTwoDecimal_f(parseFloat(((_mst$graph = mst.graph) === null || _mst$graph === void 0 ? void 0 : _mst$graph.zoom) * 100) + '') || 0;
  if (!graph) return /*#__PURE__*/React.createElement("div", {
    className: "console-erd-toolbar"
  }, "\u6B63\u5728\u521D\u59CB\u5316\u4E2D....");
  return /*#__PURE__*/React.createElement("div", {
    className: "console-erd-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "right"
  }, /*#__PURE__*/React.createElement(ButtonActon, {
    title: "\u64A4\u9500",
    disable: !undoManager.canUndo,
    icon: /*#__PURE__*/React.createElement(RollbackOutlined, null),
    onClick: mst.undo.bind(mst)
  }), /*#__PURE__*/React.createElement(ButtonActon, {
    title: "\u91CD\u505A",
    disable: !undoManager.canRedo,
    icon: /*#__PURE__*/React.createElement(RollbackOutlined, {
      style: {
        transform: 'scaleX(-1)'
      }
    }),
    onClick: mst.redo.bind(mst)
  }), /*#__PURE__*/React.createElement(ButtonActon, {
    title: "\u653E\u5927",
    disable: zoomNum >= 100,
    icon: "max",
    onClick: mst.graph.maxZoom.bind(mst.graph, graph)
  }), /*#__PURE__*/React.createElement("span", {
    className: "zoomNum noselect"
  }, graph && "".concat(zoomNum >= 100 ? 100 : zoomNum, "%")), /*#__PURE__*/React.createElement(ButtonActon, {
    title: "\u7F29\u5C0F",
    disable: zoomNum < 5,
    icon: "min",
    onClick: mst.graph.minZoom.bind(mst.graph, graph)
  }), /*#__PURE__*/React.createElement(ButtonActon, {
    title: "\u5168\u666F",
    icon: "container",
    onClick: mst.graph.container.bind(mst.graph, graph)
  }), /*#__PURE__*/React.createElement(ButtonActon, {
    title: "\u4E0B\u8F7D\u56FE\u7247",
    icon: "image",
    onClick: mst.graph.downAsImage.bind(mst.graph, graph)
  })));
});
var ButtonActon = CreateComponent({
  render: function render(props) {
    var IconRender = isValidElement(props.icon) ? props.icon : IconRenders[props.icon];
    return /*#__PURE__*/React.createElement(_Tooltip, {
      title: props.title
    }, /*#__PURE__*/React.createElement("span", {
      className: classNames({
        'enable': !props.disable,
        'command-btn': true
      }),
      onClick: !props.disable ? props.onClick : undefined
    }, IconRender));
  }
});