
import { Modal, Popover, Select, Tooltip, Badge } from 'antd'
import { FileMarkdownOutlined, FileImageOutlined, RollbackOutlined,  UnlockOutlined, LockOutlined, ZoomOutOutlined, ZoomInOutlined, BorderOutlined, ArrowUpOutlined, ArrowDownOutlined, ArrowLeftOutlined, ArrowRightOutlined, RetweetOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import React, { isValidElement } from 'react' 
import { observer, useObserver, Observer, useLocalStore } from 'mobx-react-lite'
import { changeTwoDecimal_f , CreateComponent  } from '../../util'
import { useMst } from '../../context'
// import StateStack from '../../state-stack'
// import { undoManager } from '../../context'

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
  'image':<FileImageOutlined />,
  'upload':<FileImageOutlined />,
  'min': <ZoomOutOutlined />,
  'max': <ZoomInOutlined />

}


export default observer(({ graph } : { graph : any}) => {
 
  const mst = useMst()
  const undoManager = mst.undoManager

  const zoomNum = graph && changeTwoDecimal_f(parseFloat(mst.graph?.zoom * 100) + '') || 0

  if(!graph) return  <div className='console-erd-toolbar' >正在初始化中....</div>

  return (
  <div className='console-erd-toolbar'>
    <div className='right'>
    <ButtonActon title='撤销' disable={!undoManager.canUndo}  icon={<RollbackOutlined />} onClick={mst.undo.bind(mst)} />
    <ButtonActon title='重做' disable={!undoManager.canRedo} icon={<RollbackOutlined style={{transform: 'scaleX(-1)'}} />} onClick={mst.redo.bind(mst)} />
    <ButtonActon title='放大' disable={zoomNum >=100 } icon='max' onClick={mst.graph.maxZoom.bind(mst.graph, graph)} />
    <span className='zoomNum noselect'>
      {graph && `${(zoomNum) >= 100 ? 100 :(zoomNum) }%` }
    </span>
    <ButtonActon title='缩小' disable={zoomNum < 5 } icon='min' onClick={mst.graph.minZoom.bind(mst.graph, graph)} />
    <ButtonActon title='全景' icon='container' onClick={mst.graph.container.bind(mst.graph, graph)} />
    <ButtonActon title='下载图片' icon='image' onClick={mst.graph.downAsImage.bind(mst.graph, graph)}  />
    </div>

    </div>)
})

type IButtonActon = {
    title: string,
    icon: string | React.ReactNode,
    onClick?: () => void,
    disable?: boolean
}

const ButtonActon  = CreateComponent<IButtonActon>({
    render : (props) => {
     const IconRender =  isValidElement(props.icon) ?  props.icon : IconRenders[props.icon] 
     return  <Tooltip title={props.title} ><span className={classNames({'enable' : !props.disable, 'command-btn' : true })} onClick={ !props.disable ? props.onClick : undefined } >{IconRender}</span></Tooltip>
    }
})
