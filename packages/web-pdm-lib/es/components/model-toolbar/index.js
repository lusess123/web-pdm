// import { Tooltip } from 'antd'
import { FileMarkdownOutlined, CloseCircleFilled, DownloadOutlined, RollbackOutlined, BgColorsOutlined, UnlockOutlined, LockOutlined, ZoomOutOutlined, ZoomInOutlined, BorderOutlined, ArrowUpOutlined, ArrowDownOutlined, ArrowLeftOutlined, ArrowRightOutlined, RetweetOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React, { isValidElement, useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { changeTwoDecimal_f, CreateComponent } from '../../util';
import { useMst } from '../../context';
// import { Input, Button, Dropdown, Menu, Select, Tooltip, Tree, Popover } from '@terminus/nusi'
import { SketchPicker } from 'react-color';
import { throttle } from 'lodash';
// const components = {
//   Input, Button, Dropdown, Menu, Select, Tooltip, Tree
// }
// import StateStack from '../../state-stack'
// import { undoManager } from '../../context'
const IconRenders = {
    'container': React.createElement(BorderOutlined, null),
    'arrow-up': React.createElement(ArrowUpOutlined, null),
    'arrow-down': React.createElement(ArrowDownOutlined, null),
    'arrow-left': React.createElement(ArrowLeftOutlined, null),
    'arrow-right': React.createElement(ArrowRightOutlined, null),
    'retweet': React.createElement(RetweetOutlined, null),
    'pdm': React.createElement(FileMarkdownOutlined, null),
    'lock': React.createElement(LockOutlined, null),
    'unlock': React.createElement(UnlockOutlined, null),
    'image': React.createElement(DownloadOutlined, null),
    // 'upload':<FileImageOutlined />,
    'min': React.createElement(ZoomOutOutlined, null),
    'max': React.createElement(ZoomInOutlined, null)
};
export default observer(({ graph }) => {
    var _a;
    const mst = useMst();
    const undoManager = mst.undoManager;
    const { Tooltip, Popover } = mst.Ui;
    const [colorPabel, setColorPabel] = useState(false);
    const setColor = useCallback(throttle((color) => {
        mst.Ui.setThemeColor(color.hex);
        //  setColorPabel(false)
    }, 200), [colorPabel]);
    const zoomNum = graph && changeTwoDecimal_f(parseFloat(((_a = mst.graph) === null || _a === void 0 ? void 0 : _a.zoom) * 100) + '') || 0;
    if (!graph)
        return React.createElement("div", { className: 'console-erd-toolbar' }, "\u6B63\u5728\u521D\u59CB\u5316\u4E2D....");
    return (React.createElement("div", { className: 'console-erd-toolbar' },
        React.createElement("div", { className: 'right' },
            React.createElement(ButtonActon, { Tooltip: Tooltip, title: '\u64A4\u9500', disable: !undoManager.canUndo, icon: React.createElement(RollbackOutlined, null), onClick: mst.undo.bind(mst) }),
            React.createElement(ButtonActon, { Tooltip: Tooltip, title: '\u91CD\u505A', disable: !undoManager.canRedo, icon: React.createElement(RollbackOutlined, { style: { transform: 'scaleX(-1)' } }), onClick: mst.redo.bind(mst) }),
            React.createElement(ButtonActon, { Tooltip: Tooltip, title: '\u653E\u5927', disable: zoomNum >= 100, icon: 'max', onClick: mst.graph.maxZoom.bind(mst.graph, graph) }),
            React.createElement("span", { className: 'zoomNum noselect' }, graph && `${(zoomNum) >= 100 ? 100 : (zoomNum)}%`),
            React.createElement(ButtonActon, { Tooltip: Tooltip, title: '\u7F29\u5C0F', disable: zoomNum < 5, icon: 'min', onClick: mst.graph.minZoom.bind(mst.graph, graph) }),
            React.createElement(ButtonActon, { Tooltip: Tooltip, title: '\u5168\u666F', icon: 'container', onClick: mst.graph.container.bind(mst.graph, graph) }),
            React.createElement(ButtonActon, { Tooltip: Tooltip, title: '\u4E0B\u8F7D\u56FE\u7247', icon: 'image', onClick: mst.graph.downAsImage.bind(mst.graph, graph) }),
            React.createElement(Popover, { placement: "rightTop", arrowPointAtCenter: true, footer: null, content: React.createElement(SketchPicker, { color: mst.Ui.themeColor, onChange: setColor }), visible: colorPabel },
                React.createElement(ButtonActon, { Tooltip: Tooltip, title: `点击${colorPabel ? '关闭' : '打开'}颜色面板`, color: mst.Ui.themeColor, icon: colorPabel ? React.createElement(CloseCircleFilled, null) : React.createElement(BgColorsOutlined, null), onClick: setColorPabel.bind(null, !colorPabel) })))));
});
const ButtonActon = CreateComponent({
    render: (props) => {
        const { Tooltip } = props;
        const IconRender = isValidElement(props.icon) ? props.icon : IconRenders[props.icon];
        return React.createElement(Tooltip, { title: props.title },
            React.createElement("span", { style: { color: props.color }, className: classNames({ 'enable': !props.disable, 'command-btn': true }), onClick: !props.disable ? props.onClick : undefined }, IconRender));
    }
});
