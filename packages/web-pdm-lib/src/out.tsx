import React from 'react'
export * from 'web-pdm-core'
import { IWebPdmProps } from 'web-pdm-core'
import WebPdmCore from 'web-pdm-core'
import { Input, Button, Dropdown, Menu, Select, Tooltip, Popover } from 'antd'
import {
    // FileMarkdownOutlined,
    ReloadOutlined,
    // CloseCircleFilled,
    PictureOutlined,
    PictureFilled,
    SnippetsFilled,
    SnippetsOutlined,
    DownloadOutlined,
    PartitionOutlined,
    UngroupOutlined,
    RollbackOutlined,
    BgColorsOutlined,
    // UnlockOutlined,
    // LockOutlined,
    ZoomOutOutlined,
    ZoomInOutlined,
    BorderOutlined,
    // ArrowUpOutlined,
    // ArrowDownOutlined,
    // ArrowLeftOutlined,
    // ArrowRightOutlined,
    // RetweetOutlined
} from '@ant-design/icons'
import { Tree } from './tree'

const IconRenders = {

    undo: <RollbackOutlined />,
    redo: <RollbackOutlined style={{ transform: 'scaleX(-1)' }} />,
    min: <ZoomOutOutlined />,
    max: <ZoomInOutlined />,
    full: <BorderOutlined />,
    miniMap: <PictureFilled />,
    miniMapNo: <PictureOutlined />,
    dagreLayout: <PartitionOutlined />,
    relationLayout: <UngroupOutlined />,
    reload: <ReloadOutlined />,
    image: <DownloadOutlined />,
    darkness: <SnippetsFilled />,
    light: <SnippetsOutlined />,
    colorClose: <BgColorsOutlined />,
    colorOpen: <BgColorsOutlined />
}

const WebPdm: React.FunctionComponent<IWebPdmProps> = (props) => {
    return <WebPdmCore
        IconRenders={IconRenders}
        components={{ Input, Button, Dropdown, Menu, Select, Tooltip, Tree, Popover }}
        {...props} />
}
export default WebPdm