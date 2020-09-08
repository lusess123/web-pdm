import React from 'react';
import { CreateComponent } from '../util';
import ModelNavi from './model-navi';
import GraphPage from '../graph';
export default CreateComponent({
  displayName: 'page',
  render: function render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "console-g6-page"
    }, /*#__PURE__*/React.createElement("div", {
      className: "console-erd-fps"
    }), /*#__PURE__*/React.createElement("div", {
      className: "g6-modelnavi"
    }, /*#__PURE__*/React.createElement(ModelNavi, null)), /*#__PURE__*/React.createElement("div", {
      className: "g6-graph"
    }, /*#__PURE__*/React.createElement(GraphPage, null)));
  }
});