import dva from 'dva'
import React from 'react'
import Page , { DvaModel } from '../src'
import getAllModelsTest from './g6-test/mock/model-test'
import getAllModulesTest from './g6-test/mock/module-test'


import init from  './unstated'


const ErdPdmPage =  (props) => {
   const { getModels, getModules } = {
    getModels: async () =>  ({ res: getAllModelsTest }),
    getModules: async () => ({ res: getAllModulesTest }),
   }
   return (
   <Page {...props}
     getModels={getModels}
     getModules={getModules}
     isFullScreen
       />
   )
}
// init(ErdPdmPage)

import MstPage from './mst'


// // 创建应用
const app = dva()
// app.model(DvaModel({namespace: 'erd'}) as any)
// // 注册视图
app.router(() => (
  <div>
  <MstPage />
  </div>
))
// // 启动应用
app.start('#app')
// init(ErdPdmPage)
// document.appendChild(new HTMLDivElement({}))
// import './testg6'

// const i = 9
// const fff = [0..i]
