import React from 'react';
export * from 'web-pdm-core';
import WebPdmCore from 'web-pdm-core';
import { Input, Button, Dropdown, Menu, Select, Tooltip, Popover } from 'antd';
import { 
// FileMarkdownOutlined,
ReloadOutlined, 
// CloseCircleFilled,
PictureOutlined, PictureFilled, SnippetsFilled, SnippetsOutlined, DownloadOutlined, PartitionOutlined, UngroupOutlined, RollbackOutlined, BgColorsOutlined, 
// UnlockOutlined,
// LockOutlined,
ZoomOutOutlined, ZoomInOutlined, BorderOutlined, } from '@ant-design/icons';
import { Tree } from './tree';
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
const WebPdm = (props) => {
    return React.createElement(WebPdmCore, Object.assign({ IconRenders: IconRenders, components: { Input, Button, Dropdown, Menu, Select, Tooltip, Tree, Popover } }, props));
};
export default WebPdm;
