import React, { useEffect, useState } from 'react'
import { applySnapshot, onSnapshot, withoutUndo } from 'mobx-keystone'
import { useMst  } from './context'
import { observer } from 'mobx-react-lite'
import { Provider, createRootStore  } from './context'
import MSTPage from './components'
export * from './type/config'
// import './style.scss'


export const Page = observer<any>(({ models, modules, erdkey, className, style, height }) => {
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

export default ({ models, modules, erdkey, className,  style, height}) => {
    const [rootStore] = useState(() => {
      return createRootStore({
        sys : {
          height 
        }
      })
    })
    return <Provider value={rootStore}>
     <Page models={models} modules={modules} key={erdkey} className={className} style={style} height={height} />
    </Provider>
}



