import React from 'react'
import WebPdm from 'web-pdm'
import { models , modules } from './typedata'
// import "../test/style.less"
import './style.less'

export default  () => {
    return <WebPdm models={models} modules={modules} key='api' height="750" className="console-g6-page-dumi" />
}