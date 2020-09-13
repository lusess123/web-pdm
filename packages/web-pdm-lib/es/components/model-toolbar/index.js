// import { Tooltip } from 'antd'
import { FileMarkdownOutlined, CloseCircleFilled, SnippetsFilled, SnippetsOutlined, DownloadOutlined, PartitionOutlined, UngroupOutlined, RollbackOutlined, BgColorsOutlined, UnlockOutlined, LockOutlined, ZoomOutOutlined, ZoomInOutlined, BorderOutlined, ArrowUpOutlined, ArrowDownOutlined, ArrowLeftOutlined, ArrowRightOutlined, RetweetOutlined } from '@ant-design/icons';
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
//<SnippetsOutlined />
//<SnippetsFilled />
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
            React.createElement(ButtonActon, { Tooltip: Tooltip, title: '\u64A4\u9500', color: mst.Ui.darkness && undoManager.canUndo ? mst.Ui.themeColor : undefined, disable: !undoManager.canUndo, icon: React.createElement(RollbackOutlined, null), onClick: mst.undo.bind(mst) }),
            React.createElement(ButtonActon, { Tooltip: Tooltip, title: '\u91CD\u505A', color: mst.Ui.darkness && undoManager.canRedo ? mst.Ui.themeColor : undefined, disable: !undoManager.canRedo, icon: React.createElement(RollbackOutlined, { style: { transform: 'scaleX(-1)' } }), onClick: mst.redo.bind(mst) }),
            React.createElement(ButtonActon, { Tooltip: Tooltip, title: '\u653E\u5927', color: mst.Ui.darkness ? mst.Ui.themeColor : undefined, disable: zoomNum >= 100, icon: 'max', onClick: mst.graph.maxZoom.bind(mst.graph, graph) }),
            React.createElement("span", { className: 'zoomNum noselect' }, graph && `${(zoomNum) >= 100 ? 100 : (zoomNum)}%`),
            React.createElement(ButtonActon, { Tooltip: Tooltip, title: '\u7F29\u5C0F', color: mst.Ui.darkness ? mst.Ui.themeColor : undefined, disable: zoomNum < 5, icon: 'min', onClick: mst.graph.minZoom.bind(mst.graph, graph) }),
            React.createElement(ButtonActon, { Tooltip: Tooltip, title: '\u5168\u666F', color: mst.Ui.darkness ? mst.Ui.themeColor : undefined, icon: 'container', onClick: mst.graph.container.bind(mst.graph, graph) }),
            React.createElement(ButtonActon, { Tooltip: Tooltip, title: '\u4E0B\u8F7D\u56FE\u7247', color: mst.Ui.darkness ? mst.Ui.themeColor : undefined, icon: 'image', onClick: mst.graph.downAsImage.bind(mst.graph, graph) }),
            React.createElement(ButtonActon, { Tooltip: Tooltip, title: mst.sys.dagreLayout ? '切换层次布局' : '切换关联布局', icon: mst.sys.dagreLayout ? React.createElement(PartitionOutlined, null) : React.createElement(UngroupOutlined, null), color: mst.Ui.darkness ? mst.Ui.themeColor : undefined, onClick: mst.sys.setDagreLayout.bind(mst.sys, !mst.sys.dagreLayout) }),
            React.createElement(ButtonActon, { Tooltip: Tooltip, title: '\u5207\u6362\u5E95\u8272', icon: mst.Ui.darkness ? React.createElement(SnippetsFilled, null) : React.createElement(SnippetsOutlined, null), color: mst.Ui.darkness ? mst.Ui.themeColor : undefined, onClick: mst.Ui.setDarkness.bind(mst.Ui, !mst.Ui.darkness) }),
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
