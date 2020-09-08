import React, { useEffect, useState } from 'react'
import { applySnapshot, onSnapshot, withoutUndo } from 'mobx-keystone'
import { useMst  } from './mst/context'
import { observer } from 'mobx-react-lite'
import { Provider, createRootStore  } from './mst/context'
import MSTPage from './mst/components'
import './style.scss'


export const Page = observer(({ models, modules, key, className, style, height }) => {
    const data = useMst()
    useEffect(() => {
      onSnapshot(data, snapshot => {
           sessionStorage.setItem('web-pdm' + key, JSON.stringify(snapshot))
      })
      const localdata = sessionStorage.getItem('web-pdm'+ key)
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

export default ({ models, modules, key, className,  style, height}) => {
    const [rootStore] = useState(() => {
      return createRootStore({
        sys : {
          height 
        }
      })
    })
    return <Provider value={rootStore}>
     <Page models={models} modules={modules} key={key} className={className} style={style} height={height} />
    </Provider>
}



