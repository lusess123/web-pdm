import React from 'react';
import classnames from 'classnames';
import { CreateComponent } from '../util';
import ModelNavi from './model-navi';
import GraphPage from '../graph';
export default CreateComponent({
  displayName: 'page',
  render: function render(props) {
    return /*#__PURE__*/React.createElement("div", {
      className: classnames('console-g6-page', props.className),
      style: props.style
    }, /*#__PURE__*/React.createElement("div", {
      className: "console-erd-fps"
    }), /*#__PURE__*/React.createElement("div", {
      className: "g6-modelnavi"
    }, /*#__PURE__*/React.createElement(ModelNavi, null)), /*#__PURE__*/React.createElement("div", {
      className: "g6-graph"
    }, /*#__PURE__*/React.createElement(GraphPage, null)));
  }
});