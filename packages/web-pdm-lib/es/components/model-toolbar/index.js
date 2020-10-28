// import { Tooltip } from 'antd'
import { 
// FileMarkdownOutlined,
ReloadOutlined, 
// CloseCircleFilled,
PictureOutlined, PictureFilled, SnippetsFilled, SnippetsOutlined, DownloadOutlined, PartitionOutlined, UngroupOutlined, RollbackOutlined, BgColorsOutlined, 
// UnlockOutlined,
// LockOutlined,
ZoomOutOutlined, ZoomInOutlined, BorderOutlined, } from '@ant-design/icons';
import classNames from 'classnames';
import React, { isValidElement, useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { changeTwoDecimal_f, CreateComponent } from '../../util';
import { useMst } from '../../context';
import { SketchPicker } from 'react-color';
import { throttle } from 'lodash';
// import StateStack from '../../state-stack'
// import { undoManager } from '../../context'
//<SnippetsOutlined />
//<Snip/** @type {*} */
const IconRenders = {
    undo: React.createElement(RollbackOutlined, null),
    redo: React.createElement(RollbackOutlined, { style: { transform: 'scaleX(-1)' } }),
    min: React.createElement(ZoomOutOutlined, null),
    max: React.createElement(ZoomInOutlined, null),
    full: React.createElement(BorderOutlined, null),
    miniMap: React.createElement(PictureFilled, null),
    miniMapNo: React.createElement(PictureOutlined, null),
    dagreLayout: React.createElement(PartitionOutlined, null),
    relationLayout: React.createElement(UngroupOutlined, null),
    reload: React.createElement(ReloadOutlined, null),
    image: React.createElement(DownloadOutlined, null),
    darkness: React.createElement(SnippetsFilled, null),
    light: React.createElement(SnippetsOutlined, null),
    colorClose: React.createElement(BgColorsOutlined, null),
    colorOpen: React.createElement(BgColorsOutlined, null)
};
export default observer(({ graph }) => {
    var _a;
    const mst = useMst();
    const intl = mst.intl;
    const undoManager = mst.undoManager;
    const { Tooltip, Popover } = mst.Ui;
    const _IconRenders = Object.assign(Object.assign({}, IconRenders), mst.Ui.IconRenders);
    const [colorPabel, setColorPabel] = useState(false);
    const setColor = useCallback(throttle(color => {
        mst.Ui.setThemeColor(color.hex);
        //  setColorPabel(false)
    }, 200), [colorPabel]);
    const zoomNum = (graph &&
        changeTwoDecimal_f(parseFloat(((_a = mst.graph) === null || _a === void 0 ? void 0 : _a.zoom) * 100 + '') + '')) ||
        0;
    if (!graph)
        return (React.createElement("div", { className: 'console-erd-toolbar' },
            intl('正在初始化中'),
            "...."));
    return (React.createElement("div", { className: 'console-erd-toolbar' },
        React.createElement("div", { className: 'right' },
            React.createElement(ButtonActon, { IconRenders: _IconRenders, key: 1, Tooltip: Tooltip, title: intl('撤销'), color: mst.Ui.darkness && undoManager.canUndo
                    ? mst.Ui.themeColor
                    : undefined, disable: !undoManager.canUndo, icon: "undo", onClick: mst.undo.bind(mst) }),
            React.createElement(ButtonActon, { IconRenders: _IconRenders, key: 2, Tooltip: Tooltip, title: intl('重做'), color: mst.Ui.darkness && undoManager.canRedo
                    ? mst.Ui.themeColor
                    : undefined, disable: !undoManager.canRedo, icon: "redo", onClick: mst.redo.bind(mst) }),
            React.createElement(ButtonActon, { IconRenders: _IconRenders, key: 3, Tooltip: Tooltip, title: intl('放大'), color: mst.Ui.darkness ? mst.Ui.themeColor : undefined, disable: zoomNum >= 100, icon: 'max', onClick: mst.graph.maxZoom.bind(mst.graph, graph) }),
            React.createElement("span", { className: 'zoomNum noselect' }, graph && `${zoomNum >= 100 ? 100 : zoomNum}%`),
            React.createElement(ButtonActon, { IconRenders: _IconRenders, key: 4, Tooltip: Tooltip, title: intl('缩小'), color: mst.Ui.darkness ? mst.Ui.themeColor : undefined, disable: zoomNum < 5, icon: 'min', onClick: mst.graph.minZoom.bind(mst.graph, graph) }),
            React.createElement(ButtonActon, { IconRenders: _IconRenders, key: 5, Tooltip: Tooltip, title: intl('全景'), color: mst.Ui.darkness ? mst.Ui.themeColor : undefined, icon: 'full', onClick: mst.graph.container.bind(mst.graph, graph) }),
            React.createElement(ButtonActon, { IconRenders: _IconRenders, key: 6, Tooltip: Tooltip, title: intl(mst.sys.disableMiniMap ? '显示小地图' : '屏蔽小地图'), color: mst.Ui.darkness ? mst.Ui.themeColor : undefined, icon: mst.sys.disableMiniMap ? 'miniMap' : 'miniMapNo', onClick: mst.sys.setDisableMiniMap.bind(mst.sys, !mst.sys.disableMiniMap) }),
            React.createElement(ButtonActon, { IconRenders: _IconRenders, key: 6, Tooltip: Tooltip, title: intl('刷新数据'), color: mst.Ui.darkness ? mst.Ui.themeColor : undefined, icon: 'reload', onClick: mst.reload.bind(mst) }),
            React.createElement(ButtonActon, { IconRenders: _IconRenders, key: 7, Tooltip: Tooltip, title: intl('下载图片'), color: mst.Ui.darkness ? mst.Ui.themeColor : undefined, icon: 'image', onClick: mst.graph.downAsImage.bind(mst.graph, graph) }),
            React.createElement(ButtonActon, { IconRenders: _IconRenders, key: 8, Tooltip: Tooltip, title: !mst.sys.dagreLayout
                    ? intl('切换层次布局')
                    : intl('切换关联布局'), icon: !mst.sys.dagreLayout ? ('dagreLayout') : ('relationLayout'), color: mst.Ui.darkness ? mst.Ui.themeColor : undefined, onClick: mst.sys.setDagreLayout.bind(mst.sys, !mst.sys.dagreLayout) }),
            React.createElement(ButtonActon, { IconRenders: _IconRenders, key: 9, Tooltip: Tooltip, title: intl('切换底色'), icon: mst.Ui.darkness ? ('darkness') : ('light'), color: mst.Ui.darkness ? mst.Ui.themeColor : undefined, onClick: mst.Ui.setDarkness.bind(mst.Ui, !mst.Ui.darkness) }),
            React.createElement(Popover, { placement: 'rightTop', arrowPointAtCenter: true, footer: null, content: React.createElement(SketchPicker, { color: mst.Ui.themeColor, onChange: setColor }), visible: colorPabel },
                React.createElement(ButtonActon, { IconRenders: _IconRenders, Tooltip: Tooltip, title: `${intl('点击')}${colorPabel ? intl('关闭') : intl('打开')} ${intl('颜色面板')}`, color: mst.Ui.themeColor, icon: colorPabel ? ('colorClose') : ('colorOpen'), onClick: setColorPabel.bind(null, !colorPabel) })))));
});
const ButtonActon = CreateComponent({
    render: props => {
        const mst = useMst();
        // const disableIcons = mst.Ui.disableIcons.reduce((pre, cur) => ({ ...pre, [cur]: true }), {})
        const { Tooltip } = props;
        if (mst.Ui.disableIcons.indexOf(props.icon) >= 0)
            return null;
        const IconRender = isValidElement(props.icon)
            ? props.icon
            : props.IconRenders[props.icon];
        return (React.createElement(Tooltip, { title: props.title },
            React.createElement("span", { style: { color: props.color }, className: classNames({
                    enable: !props.disable,
                    'command-btn': true
                }), onClick: !props.disable ? props.onClick : undefined }, IconRender)));
    }
});
