import React from 'react'
import WebPdm from 'web-pdm'
import { models , modules } from './typedata'
import 'antd/dist/antd.css'
import './style.less'

export default  () => {
    return <WebPdm models={models} modules={modules} erdkey='api' height="550" className="console-g6-page-dumi-api" />
}