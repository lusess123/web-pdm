import { createRequire } from 'node:module'
import WebPdm from 'web-pdm'

const require = createRequire(import.meta.url)
const WebPdmCommonJs = require('web-pdm')

if (typeof WebPdm !== 'function') throw new Error('ESM 默认导出不可用')
if (typeof WebPdmCommonJs !== 'function') throw new Error('CommonJS 默认导出不可用')

console.log('package exports ok')
