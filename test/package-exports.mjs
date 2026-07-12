import { readFile } from 'node:fs/promises';
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

const stylesheet = await readFile(
  new URL('../packages/web-pdm-lib/dist/style.css', import.meta.url),
  'utf8',
);
for (const selector of [
  '.console-g6-page',
  '.console-models-tree',
  '.console-erd-toolbar',
  '.graph',
  '.web-pdm-button',
]) {
  if (!stylesheet.includes(selector)) {
    throw new Error(`web-pdm/style.css 缺少核心样式：${selector}`);
  }
}

console.log('package exports ok');
