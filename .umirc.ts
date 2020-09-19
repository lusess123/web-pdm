import { defineConfig } from 'dumi';
const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

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
  dynamicImport: {},
  exportStatic: {},
  // mpa: {},
  antd: {},
  // esbuild: {},
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
    //http://localhost:8001
    { title: 'API', path: '/typedoc' },
    { title: 'GitHub', path: 'https://github.com/lusess123/web-pdm' },
    { title: '更新日志', path: 'https://github.com/lusess123/web-pdm/blob/master/packages/web-pdm-lib/CHANGELOG.md' },
  ],
  chainWebpack(memo){
    memo.plugin('CompressionPlugin').use(new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: productionGzipExtensions,
      // 只处理大于xx字节 的文件，默认：0
      threshold: 10240,
      // 示例：一个1024b大小的文件，压缩后大小为768b，minRatio : 0.75
      minRatio: 0.8, // 默认: 0.8
      // 是否删除源文件，默认: false
      deleteOriginalAssets: false
    }));
  }
});
