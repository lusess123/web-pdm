import React from 'react'
import WebPdm from '../src'
import ModelTest from '../test/g6-test/mock/model-test'
import ModuleTest from '../test/g6-test/mock/module-test'
// import "../test/style.less"
import './style.less'

export default  () => {
    return <WebPdm models={ModelTest} modules={ModuleTest} key='codedemo' height="450" className="console-g6-page-dumi" />
}

//ReactDom.render(<Page />, document.getElementById('app'))

