import dva from 'dva'
import React from 'react'
import ReactDom from 'react-dom'
// import Page , { DvaModel } from '../src'
// import getAllModelsTest from './g6-test/mock/model-test'
// import getAllModulesTest from './g6-test/mock/module-test'
// init(ErdPdmPage)

import MstPage from './mst'

// alert()
// // 创建应用
const app = dva()
// app.model(DvaModel({namespace: 'erd'}) as any)
// // 注册视图
app.router(() => (
  <MstPage />
))

// // 启动应用
app.start('#app')
// init(ErdPdmPage)
// document.appendChild(new HTMLDivElement({}))
// import './testg6'

// const i = 9
// const fff = [0..i]

ReactDom.render(<MstPage />, document.getElementById('app'))
