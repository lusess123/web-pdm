// import { Tooltip } from 'antd'
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
import classNames from 'classnames'
import React, { isValidElement, useState, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { changeTwoDecimal_f, CreateComponent } from '../../util'
import { useMst } from '../../context'
import { SketchPicker } from 'react-color'
import { throttle } from 'lodash'

// import StateStack from '../../state-stack'
// import { undoManager } from '../../context'
//<SnippetsOutlined />
//<Snip/** @type {*} */
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
type TIconRenders = typeof IconRenders
export type TIconRendersKeys = keyof TIconRenders

export default observer(({ graph }: { graph: any }) => {
    const mst = useMst()
    const intl = mst.intl
    const undoManager = mst.undoManager
    const { Tooltip, Popover } = mst.Ui as any
    const _IconRenders: any = { ...IconRenders, ...mst.Ui.IconRenders }
    const [colorPabel, setColorPabel] = useState(false)
    const setColor = useCallback(
        throttle(color => {
            mst.Ui.setThemeColor(color.hex)
            //  setColorPabel(false)
        }, 200),
        [colorPabel]
    )

    const zoomNum =
        (graph &&
            changeTwoDecimal_f(parseFloat(mst.graph?.zoom * 100 + '') + '')) ||
        0

    if (!graph)
        return (
            <div className='console-erd-toolbar'>
                {intl('正在初始化中')}....
            </div>
        )

    return (
        <div className='console-erd-toolbar'>
            <div className='right'>
                <ButtonActon
                    IconRenders={_IconRenders}
                    key={1}
                    Tooltip={Tooltip}
                    title={intl('撤销')}
                    color={
                        mst.Ui.darkness && undoManager.canUndo
                            ? mst.Ui.themeColor
                            : undefined
                    }
                    disable={!undoManager.canUndo}
                    icon="undo"
                    onClick={mst.undo.bind(mst)}
                />
                <ButtonActon
                    IconRenders={_IconRenders}
                    key={2}
                    Tooltip={Tooltip}
                    title={intl('重做')}
                    color={
                        mst.Ui.darkness && undoManager.canRedo
                            ? mst.Ui.themeColor
                            : undefined
                    }
                    disable={!undoManager.canRedo}
                    icon="redo"
                    onClick={mst.redo.bind(mst)}
                />
                <ButtonActon
                    IconRenders={_IconRenders}
                    key={3}
                    Tooltip={Tooltip}
                    title={intl('放大')}
                    color={mst.Ui.darkness ? mst.Ui.themeColor : undefined}
                    disable={zoomNum >= 100}
                    icon='max'
                    onClick={mst.graph.maxZoom.bind(mst.graph, graph)}
                />
                <span className='zoomNum noselect'>
                    {graph && `${zoomNum >= 100 ? 100 : zoomNum}%`}
                </span>
                <ButtonActon
                    IconRenders={_IconRenders}
                    key={4}
                    Tooltip={Tooltip}
                    title={intl('缩小')}
                    color={mst.Ui.darkness ? mst.Ui.themeColor : undefined}
                    disable={zoomNum < 5}
                    icon='min'
                    onClick={mst.graph.minZoom.bind(mst.graph, graph)}
                />
                <ButtonActon
                    IconRenders={_IconRenders}
                    key={5}
                    Tooltip={Tooltip}
                    title={intl('全景')}
                    color={mst.Ui.darkness ? mst.Ui.themeColor : undefined}
                    icon='full'
                    onClick={mst.graph.container.bind(mst.graph, graph)}
                />
                <ButtonActon
                    IconRenders={_IconRenders}
                    key={6}
                    Tooltip={Tooltip}
                    title={intl(
                        mst.sys.disableMiniMap ? '显示小地图' : '屏蔽小地图'
                    )}
                    color={mst.Ui.darkness ? mst.Ui.themeColor : undefined}
                    icon={mst.sys.disableMiniMap ? 'miniMap' : 'miniMapNo'}
                    onClick={mst.sys.setDisableMiniMap.bind(
                        mst.sys,
                        !mst.sys.disableMiniMap
                    )}
                />
                <ButtonActon
                    IconRenders={_IconRenders}
                    key={6}
                    Tooltip={Tooltip}
                    title={intl('刷新数据')}
                    color={mst.Ui.darkness ? mst.Ui.themeColor : undefined}
                    icon='reload'
                    onClick={mst.reload.bind(mst)}
                />
                <ButtonActon
                    IconRenders={_IconRenders}
                    key={7}
                    Tooltip={Tooltip}
                    title={intl('下载图片')}
                    color={mst.Ui.darkness ? mst.Ui.themeColor : undefined}
                    icon='image'
                    onClick={mst.graph.downAsImage.bind(mst.graph, graph)}
                />
                <ButtonActon
                    IconRenders={_IconRenders}
                    key={8}
                    Tooltip={Tooltip}
                    title={
                        !mst.sys.dagreLayout
                            ? intl('切换层次布局')
                            : intl('切换关联布局')
                    }
                    icon={
                        !mst.sys.dagreLayout ? (
                            'dagreLayout'
                        ) : (
                                'relationLayout'
                            )
                    }
                    color={mst.Ui.darkness ? mst.Ui.themeColor : undefined}
                    onClick={mst.sys.setDagreLayout.bind(
                        mst.sys,
                        !mst.sys.dagreLayout
                    )}
                />
                <ButtonActon
                    IconRenders={_IconRenders}
                    key={9}
                    Tooltip={Tooltip}
                    title={intl('切换底色')}
                    icon={
                        mst.Ui.darkness ? (
                            'darkness'
                        ) : (
                                'light'
                            )
                    }
                    color={mst.Ui.darkness ? mst.Ui.themeColor : undefined}
                    onClick={mst.Ui.setDarkness.bind(mst.Ui, !mst.Ui.darkness)}
                />
                {/* <ButtonActon Tooltip={Tooltip} title='切换' icon='image' onClick={mst.Ui.toggle.bind(mst.Ui, components)}  /> */}
                <Popover
                    placement='rightTop'
                    arrowPointAtCenter
                    footer={null}
                    content={
                        <SketchPicker
                            color={mst.Ui.themeColor}
                            onChange={setColor}
                        />
                    }
                    visible={colorPabel}
                >
                    <ButtonActon
                        IconRenders={_IconRenders}
                        Tooltip={Tooltip}
                        title={`${intl('点击')}${colorPabel ? intl('关闭') : intl('打开')
                            } ${intl('颜色面板')}`}
                        color={mst.Ui.themeColor}
                        icon={
                            colorPabel ? (
                                'colorClose'
                            ) : (
                                    'colorOpen'
                                )
                        }
                        onClick={setColorPabel.bind(null, !colorPabel)}
                    />
                </Popover>
            </div>
        </div>
    )
})

type IButtonActon = {
    title: string
    icon: string | React.ReactNode
    onClick?: () => void
    disable?: boolean
    Tooltip: any
    color?: string
    IconRenders: Record<string, React.ReactNode>
}

const ButtonActon = CreateComponent<IButtonActon>({
    render: props => {
        const { Tooltip } = props

        const IconRender = isValidElement(props.icon)
            ? props.icon
            : props.IconRenders[props.icon as string]
        return (
            <Tooltip title={props.title}>
                <span
                    style={{ color: props.color }}
                    className={classNames({
                        enable: !props.disable,
                        'command-btn': true
                    })}
                    onClick={!props.disable ? props.onClick : undefined}
                >
                    {IconRender}
                </span>
            </Tooltip>
        )
    }
})
