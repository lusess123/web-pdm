import React, { useEffect, useState, SFC } from 'react'
import { applySnapshot, onSnapshot, withoutUndo } from 'mobx-keystone'
import { useMst  } from './context'
import { observer } from 'mobx-react-lite'
import { Provider, createRootStore  } from './context'
import MSTPage from './components'
import { ModelConfig , ModuleConfig, FieldConfig } from './type/config'
export * from './type/config'
// import './style.scss'

export interface IWebPdmProps {
  models : ModelConfig[], 
  modules : ModuleConfig[], 
  erdkey : string, 
  className?: string, 
  style?: any, 
  height?: string | number,
  onIgnoreEdge?: (field: FieldConfig) => boolean
}

export const Page = observer<IWebPdmProps>(({ models, modules, erdkey, className, style, height }) => {
    const data = useMst()
    useEffect(() => {
      onSnapshot(data, snapshot => {
           sessionStorage.setItem('web-pdm' + erdkey, JSON.stringify(snapshot))
      })
      const localdata = sessionStorage.getItem('web-pdm'+ erdkey)
      if(!localdata) {
        withoutUndo(() => data.initData(models, modules))
      } else {
        const sdata = JSON.parse(localdata)
        sdata.sys.height = height
        withoutUndo(() => applySnapshot(data,sdata))
      }
      
  
    }, [])
    return <MSTPage className={className} style={style} />
  })

const WebPDM :SFC<IWebPdmProps>  = ({ models, modules, erdkey, className, onIgnoreEdge, style, height}) => {
    const [rootStore] = useState(() => {
      return createRootStore({
        sys : {
          height,
          onIgnoreEdge
        }
      })
    })
    return <Provider value={rootStore}>
     <Page models={models} modules={modules} erdkey={erdkey} className={className} style={style} height={height} />
    </Provider>
}

export default WebPDM



