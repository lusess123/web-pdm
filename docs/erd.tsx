import React from 'react'
import WebPdm from 'web-pdm'
import ModelTest from '../test/g6-test/mock/model-test'
import ModuleTest from '../test/g6-test/mock/module-test'
// import "../test/style.less"
import './style.less'
import 'antd/dist/antd.css'

export default  () => {
    return <WebPdm models={ModelTest} modules={ModuleTest} erdkey='codedemo' height="750" className="console-g6-page-dumi" />
}

//ReactDom.render(<Page />, document.getElementById('app'))

