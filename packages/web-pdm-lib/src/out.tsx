import React, { useEffect, useState, FunctionComponent } from 'react'
import { applySnapshot, onSnapshot, withoutUndo } from 'mobx-keystone'
import { useMst  } from './context'
import { observer } from 'mobx-react-lite'
import { Provider, createRootStore  } from './context'
import MSTPage from './components'
import { ModelConfig , ModuleConfig, FieldConfig, IComponentConfig, TData } from './type/config'
export * from './type/config'
// import './style.scss'

export interface IWebPdmProps {
  models : ModelConfig[], 
  modules : ModuleConfig[], 
  erdkey : string, 
  className?: string, 
  style?: any, 
  height?: string | number,
  onIgnoreEdge?: (field: FieldConfig) => boolean,
  components: IComponentConfig,
  onModelDetail?: (model: ModelConfig) => void,
  themeColor?: string,
  darkness?: boolean,
  onReload? : () => TData,
  intl?: 'CH' | 'EN',
  onIntl?: (string) => string
}

export const Page = observer<IWebPdmProps>(({ onIntl, onReload, onModelDetail, models, modules, erdkey, className, style, height, onIgnoreEdge, components }) => {
    const data = useMst()
    useEffect(() => {
      onSnapshot(data, snapshot => {
           sessionStorage.setItem('web-pdm' + erdkey, JSON.stringify(snapshot))
           sessionStorage.setItem('web-pdm-fields' + erdkey, JSON.stringify(Array.from(data.Fields.entries())))
      })
      const localdata = sessionStorage.getItem('web-pdm'+ erdkey)
      if(!localdata) {
        withoutUndo(() => data.initData(models, modules))
      } else {
        const sdata = JSON.parse(localdata)
        sdata.sys.height = height
        withoutUndo(() => 
        {
          const localFieldsdata = sessionStorage.getItem('web-pdm-fields'+ erdkey)
          if(localFieldsdata) {
            data.setFields(new Map(JSON.parse(localFieldsdata)))
          }
          applySnapshot(data,sdata)
          data.sys.setOnIgnoreEdge(onIgnoreEdge)
          data.sys.setOnModelDetail(onModelDetail)
          data.Ui.registComponents(components)
          data.setOnReload(onReload!)
          data.onIntl = onIntl!
          
         
        }
          
          )
       
      }
      
  
    }, [])
    return <MSTPage className={className} style={style} />
  })

const WebPDM :FunctionComponent<IWebPdmProps>  = (props) => {
    const [rootStore] = useState(() => {
      return createRootStore({
        sys : {
          height: props.height,
          onIgnoreEdge: props.onIgnoreEdge,
          onModelDetail: props.onModelDetail,
          intl : props.intl
        },
        Ui : {
          themeColor: props.themeColor,
          darkness: props.darkness
        },
        components : props.components,
        onReload: props.onReload,
        onIntl: props.onIntl
      })
    })
    return <Provider value={rootStore}>
     {rootStore && <Page {...props} />}
    </Provider>
}

export default WebPDM



