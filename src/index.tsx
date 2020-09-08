import React, { useEffect } from 'react'
import { applySnapshot, onSnapshot, withoutUndo } from 'mobx-keystone'
import { useMst  } from './mst/context'
import { observer } from 'mobx-react-lite'
import { Provider, rootStore  } from './mst/context'
import MSTPage from './mst/components'
import './style.scss'


export const Page = observer(({ models, modules, key }) => {
    const data = useMst()
    useEffect(() => {
      onSnapshot(data, snapshot => {
           sessionStorage.setItem('web-pdm' + key, JSON.stringify(snapshot))
      })
      const localdata = sessionStorage.getItem('web-pdm')
      if(!localdata) {
        withoutUndo(() => data.init({ modelData: models, moduleData: modules }))
      } else {
        const sdata = JSON.parse(localdata)
        withoutUndo(() => applySnapshot(data,sdata))
      }
      
  
    }, [])
    return <MSTPage />
  })

export default ({ models, modules, key }) => {
    return <Provider value={rootStore}>
     <Page models={models} modules={modules} key={key} />
    </Provider>
}



