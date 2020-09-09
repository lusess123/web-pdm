import { defineConfig } from 'dumi';

export default defineConfig({
  description:'一个用G6做的ER图工具，最终目标是想做成在线版的 powerdesigner',
  title: 'web-pdm',
  favicon:
    'http://zyking.xyz/logo.png',
  logo:
   'http://zyking.xyz/logo.png',
  outputPath: 'docs-dist',
  mode: 'site',
  resolve : {
    includes: ['docs']
  },
  menus: {
    '/guide': [
      {
        title: '介绍',
        children: ['guide/index', 'guide/getting-started'],
      },
      {
        title: '模型定义',
        children: ['guide/model', 'guide/relation'],
      },
      {
        title: '工具栏',
        children: ['guide/toolbar'],
      },
      {
        title: '其他',
        children: ['guide/migration', 'guide/faq', 'guide/next','guide/ddd'],
      },
    ],
  },
  navs: [
    null,
    { title: 'GitHub', path: 'https://github.com/lusess123/web-pdm' },
    { title: '更新日志', path: 'https://github.com/lusess123/web-pdm/releases' },
  ],
});
