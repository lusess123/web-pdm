import React from 'react'
import ReactDom from 'react-dom'
// import ModelTest from '../g6-test/mock/model-test'
// import ModuleTest from '../g6-test/mock/module-test'
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
import { Tree } from '../tree'
// import ModelTest from '../g6-test/with-field-relation/model-test'
// import ModuleTest from '../g6-test/with-field-relation/module-test'
import WebPdm from '../../src'

import CodePdm from '../../../../docs/type-erd'
import { toModels, toModules } from '../g6-test/trantor/datamap'
import TestModel from '../g6-test/trantor/mock/models-data.json'
import TestModule from '../g6-test/trantor/mock/modules-data.json'
// import ModelTest from '../g6-test/trantor/gw/model.json'
// import ModuleTest from '../g6-test/trantor/gw/module.json'
// import TestModel from '../g6-test/trantor/model'
// import TestModule from '../g6-test/trantor/module'

import './style.less'

const models = toModels(TestModel.res.map(a => a.model))
const modules = toModules(TestModule.res)

// const models = ModelTest
// const modules = ModuleTest

function confirmEnding(str, target) {
    if (str.substr(str.length - target.length, target.length) == target)
        return true
    else return false
}

const onIgnoreEdge = field => {
    return (
        field?.typeMeta?.relationModel === 'base_User' &&
        (confirmEnding(field.name, 'createdBy') ||
            confirmEnding(field.name, 'updatedBy'))
    )
}
const onReload = () => {
    return {
        models,
        modules
    }
}
const onIntl = a => {
    return ''
}
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
ReactDom.render(
    <WebPdm
        components={{ Input, Button, Dropdown, Menu, Select, Tooltip, Tree, Popover }}
        themeColor='green'
        darkness={false}
        models={models}
        modules={modules}
        erdkey={'demo'}
        onIntl={onIntl}
        onlyMode={false}
        // disableIcons={['full', 'reload']}
        IconRenders={{
            ...IconRenders,
            image: <Button size="small" >下载</Button>,
            miniMap: <Button size="small" >显示小地图</Button>,
            miniMapNo: <Button size="small" >屏蔽小地图</Button>,

        }}
        // intl='EN'
        onReload={onReload}
        onModelDetail={a => {
            alert(`打开模型${a.label}(${a.name}) 的查看链接`)
        }}
        onIgnoreEdge={onIgnoreEdge}
    />,
    document.getElementById('app') || document.getElementById('root')
)
