import { createRequire } from 'node:module';
import WebPdm from 'web-pdm';
import WebPdmCore from 'web-pdm-core';

const require = createRequire(import.meta.url);
const WebPdmCommonJs = require('web-pdm');
const WebPdmCoreCommonJs = require('web-pdm-core');

if (typeof WebPdm !== 'function') throw new Error('ESM 默认导出不可用');
if (typeof WebPdmCommonJs !== 'function')
  throw new Error('CommonJS 默认导出不可用');
if (typeof WebPdmCore !== 'function')
  throw new Error('Core ESM 默认导出不可用');
if (typeof WebPdmCoreCommonJs !== 'function')
  throw new Error('Core CommonJS 默认导出不可用');

console.log('package exports ok');
