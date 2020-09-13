
// import { Tooltip } from 'antd'
import { FileMarkdownOutlined, CloseCircleFilled , SnippetsFilled, SnippetsOutlined, DownloadOutlined, RollbackOutlined,BgColorsOutlined,UnlockOutlined, LockOutlined, ZoomOutOutlined, ZoomInOutlined, BorderOutlined, ArrowUpOutlined, ArrowDownOutlined, ArrowLeftOutlined, ArrowRightOutlined, RetweetOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import React, { isValidElement, useState, useCallback } from 'react' 
import { observer } from 'mobx-react-lite'
import { changeTwoDecimal_f , CreateComponent  } from '../../util'
import { useMst } from '../../context'
// import { Input, Button, Dropdown, Menu, Select, Tooltip, Tree, Popover } from '@terminus/nusi'
import { SketchPicker } from 'react-color'
import { throttle } from 'lodash'

// const components = {
//   Input, Button, Dropdown, Menu, Select, Tooltip, Tree
// }
// import StateStack from '../../state-stack'
// import { undoManager } from '../../context'
//<SnippetsOutlined />
//<SnippetsFilled />
const IconRenders = {
  'container' : <BorderOutlined />,
  'arrow-up': <ArrowUpOutlined />,
  'arrow-down': <ArrowDownOutlined />,
  'arrow-left': <ArrowLeftOutlined />,
  'arrow-right': <ArrowRightOutlined />,
  'retweet': <RetweetOutlined />,
  'pdm' : <FileMarkdownOutlined />,
  'lock': <LockOutlined />,
  'unlock': <UnlockOutlined />,
  'image':<DownloadOutlined />,
  // 'upload':<FileImageOutlined />,
  'min': <ZoomOutOutlined />,
  'max': <ZoomInOutlined />

}


export default observer(({ graph } : { graph : any}) => {
 
  const mst = useMst()
  const undoManager = mst.undoManager
  const { Tooltip, Popover }  = mst.Ui as any
  const [colorPabel, setColorPabel] = useState(false)
  const setColor = useCallback(throttle((color)=>{
     mst.Ui.setThemeColor(color.hex)
    //  setColorPabel(false)
  },200),[colorPabel])

  const zoomNum = graph && changeTwoDecimal_f(parseFloat(mst.graph?.zoom * 100) + '') || 0

  if(!graph) return  <div className='console-erd-toolbar' >正在初始化中....</div>

  return (
  <div className='console-erd-toolbar'>
    <div className='right'>
    <ButtonActon Tooltip={Tooltip} title='撤销' disable={!undoManager.canUndo}  icon={<RollbackOutlined />} onClick={mst.undo.bind(mst)} />
    <ButtonActon Tooltip={Tooltip} title='重做' disable={!undoManager.canRedo} icon={<RollbackOutlined style={{transform: 'scaleX(-1)'}} />} onClick={mst.redo.bind(mst)} />
    <ButtonActon Tooltip={Tooltip} title='放大' disable={zoomNum >=100 } icon='max' onClick={mst.graph.maxZoom.bind(mst.graph, graph)} />
    <span className='zoomNum noselect'>
      {graph && `${(zoomNum) >= 100 ? 100 :(zoomNum) }%` }
    </span>
    <ButtonActon Tooltip={Tooltip} title='缩小' disable={zoomNum < 5 } icon='min' onClick={mst.graph.minZoom.bind(mst.graph, graph)} />
    <ButtonActon Tooltip={Tooltip} title='全景' icon='container' onClick={mst.graph.container.bind(mst.graph, graph)} />
    <ButtonActon Tooltip={Tooltip} title='下载图片' icon='image' onClick={mst.graph.downAsImage.bind(mst.graph, graph)}  />
    <ButtonActon Tooltip={Tooltip} title='切换底色' icon={mst.Ui.darkness ?<SnippetsFilled /> : <SnippetsOutlined />} color={mst.Ui.darkness ? mst.Ui.themeColor : undefined} onClick={mst.Ui.setDarkness.bind(mst.Ui, !mst.Ui.darkness)}  />
    {/* <ButtonActon Tooltip={Tooltip} title='切换' icon='image' onClick={mst.Ui.toggle.bind(mst.Ui, components)}  /> */}
    <Popover placement="rightTop" arrowPointAtCenter footer={null} content={<SketchPicker color={mst.Ui.themeColor}   onChange={setColor} />} visible={colorPabel}>
    <ButtonActon Tooltip={Tooltip} title={`点击${colorPabel? '关闭':'打开'}颜色面板`} color={mst.Ui.themeColor} icon={ colorPabel ? <CloseCircleFilled /> : <BgColorsOutlined/>} onClick={setColorPabel.bind(null, !colorPabel)}  />
    </Popover>
    </div>
    
    </div>)
})

type IButtonActon = {
    title: string,
    icon: string | React.ReactNode,
    onClick?: () => void,
    disable?: boolean,
    Tooltip: any
    color?: string
}

const ButtonActon  = CreateComponent<IButtonActon>({
    render : (props) => {
      const { Tooltip } = props
     const IconRender =  isValidElement(props.icon) ?  props.icon : IconRenders[props.icon] 
     return  <Tooltip title={props.title} ><span style={{color: props.color}} className={classNames({'enable' : !props.disable, 'command-btn' : true })} onClick={ !props.disable ? props.onClick : undefined } >{IconRender}</span></Tooltip>
    }
})
