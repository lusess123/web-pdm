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

export const Page = observer<IWebPdmProps>(({ models, modules, erdkey, className, style, height, onIgnoreEdge }) => {
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
        withoutUndo(() => 
        {
          applySnapshot(data,sdata)
          data.sys.setOnIgnoreEdge(onIgnoreEdge)
        }
          
          )
       
      }
      
  
    }, [])
    return <MSTPage className={className} style={style} />
  })

const WebPDM :SFC<IWebPdmProps>  = (props) => {
    const [rootStore] = useState(() => {
      return createRootStore({
        sys : {
          height: props.height,
          onIgnoreEdge: props.onIgnoreEdge
        }
      })
    })
    return <Provider value={rootStore}>
     <Page {...props} />
    </Provider>
}

export default WebPDM



