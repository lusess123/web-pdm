import React from 'react';
import classnames from 'classnames';
import { CreateComponent } from '../util';
import ModelNavi from './model-navi';
import GraphPage from '../graph';
import { useMst } from '../context';
export default CreateComponent({
    displayName: 'page',
    render(props) {
        const mst = useMst();
        // alert( mst.sys.height)
        // debugger
        return React.createElement("div", { className: classnames('console-g6-page', props.className), style: { height: mst.sys.height } },
            React.createElement("div", { className: 'console-erd-fps' }),
            React.createElement("div", { className: 'g6-modelnavi' },
                React.createElement(ModelNavi, null)),
            React.createElement("div", { className: 'g6-graph' },
                React.createElement(GraphPage, null)));
    }
});
