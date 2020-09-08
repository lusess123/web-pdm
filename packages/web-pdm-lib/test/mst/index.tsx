import React from 'react'
import ReactDom from 'react-dom'
import ModelTest from '../g6-test/mock/model-test'
import ModuleTest from '../g6-test/mock/module-test'
import WebPdm from '../../src'


ReactDom.render(
 <WebPdm models={ModelTest} modules={ModuleTest} key={'demo'}  />, 
  document.getElementById('app')||document.getElementById('root')
)
