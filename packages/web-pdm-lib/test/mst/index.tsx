import React from 'react'
import ReactDom from 'react-dom'
import ModelTest from '../g6-test/mock/model-test'
import ModuleTest from '../g6-test/mock/module-test'
import WebPdm from '../../src'
import CodePdm from '../../../../docs/type-erd'


ReactDom.render(
  <div>
  {/* <CodePdm /> */}
  <WebPdm models={ModelTest} modules={ModuleTest} key={'demo'}  /></div>, 
  document.getElementById('app')||document.getElementById('root')
)
