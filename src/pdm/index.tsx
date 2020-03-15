import { InboxOutline } from '@ant-design/icons'
import { message, Upload } from 'antd'
import { useDispatch } from 'dva'
import React from 'react'
const PdmToJson = require('./pdm-json')
import { ConvertTo } from './util'

const { Dragger } = Upload

export default ({width, title}) => {
  const dispatch =  useDispatch()

  const props = {
    name: 'file',
    multiple: true,
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    transformFile(file) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload =  async (a) => {
          // alert(a.target.result)
          const aa = await PdmToJson(a.target.result)
          console.log(aa)
          const erds = ConvertTo(aa)
          console.log(erds)
          dispatch({
            type: `${'erd'}/load`,
            ...erds,
          })
        }
      })
    },
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
     }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
     } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
     }
    },
  }

  return   (
  <Dragger {...props} style={{width}}>
  <p className='ant-upload-drag-icon'>
  {title || 'PDM'}
  </p>
</Dragger>
 )
}

