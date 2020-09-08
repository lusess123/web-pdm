import React from 'react';
import classnames from 'classnames';
import { CreateComponent } from '../util';
import ModelNavi from './model-navi';
import GraphPage from '../graph';
import { useMst } from '../context';
export default CreateComponent({
  displayName: 'page',
  render: function render(props) {
    var mst = useMst(); // alert( mst.sys.height)

    debugger;
    return /*#__PURE__*/React.createElement("div", {
      className: classnames('console-g6-page', props.className),
      style: {
        height: mst.sys.height
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "console-erd-fps"
    }), /*#__PURE__*/React.createElement("div", {
      className: "g6-modelnavi"
    }, /*#__PURE__*/React.createElement(ModelNavi, null)), /*#__PURE__*/React.createElement("div", {
      className: "g6-graph"
    }, /*#__PURE__*/React.createElement(GraphPage, null)));
  }
});