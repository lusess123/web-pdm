import React from 'react'
import WebPdm from 'web-pdm'
import { models, modules } from './typedata'
// import 'antd/dist/antd.css'
import './style.less'

export default () => {
    return (
        <WebPdm
            models={models}
            onModelDetail={a => {
                alert(`打开模型${a.label}(${a.name}) 的查看链接`)
            }}
            modules={modules}
            erdkey='api'
            height='600'
            className='console-g6-page-dumi-api'
        />
    )
}
