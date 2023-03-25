import { defineConfig } from 'dumi';
const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

export default defineConfig({
  title: 'web-pdm',
  outputPath: 'docs-dist',
  locales: [{ id: 'en-US', name: 'English' },{ id: 'zh-CN', name: '中文' }, ],
  autoAlias: false,
  themeConfig: {
    footer: "Open-source MIT Licensed | Copyright © 2019-present<br />Powered by self",
    hd: { rules: [] },
    rtl: true,
    favicon: 'https://erd.zyking.xyz/assets/logo.png',
    logo: 'https://erd.zyking.xyz/assets/logo.png',
    navs: {
      'en-US': [
        { title: 'API', path: '/typedoc/' },
        { title: 'GitHub', path: 'https://github.com/lusess123/web-pdm' },
        { title: 'Changelog', path: 'https://github.com/lusess123/web-pdm/blob/master/packages/web-pdm-lib/CHANGELOG.md' },
      ],
      'zh-CN': [
        { title: 'API', path: '/typedoc/' },
        { title: 'GitHub', path: 'https://github.com/lusess123/web-pdm' },
        { title: '更新日志', path: 'https://github.com/lusess123/web-pdm/blob/master/packages/web-pdm-lib/CHANGELOG.md' },
      ],

    },
    sidebar: {
      // 'zh-CN':[

      // ]
      '/guide': [
        {
          title: '介绍',
          children: [
            { title: "首页", link: 'guide/index' },
             { title: "快速开始", link: 'guide/getting-started' }
            ],
        },
        {
          title: '模型定义',
          children: [
            { title: "模型", link: 'guide/model' },
             { title: "关联关系", link: 'guide/relation' }
            ],
        },
        {
          title: '工具栏',
          children: [
            { title: "工具", link: 'guide/toolbar' }
          ],
        },
        {
          title: '其他',
          children: [
            { title: "升级", link: 'guide/migration' }, 
            { title: "解答", link: 'guide/faq' }, 
            { title: "下一步", link: 'guide/next' }, 
            { title: "模型驱动", link: 'guide/ddd' }
          ],
        },
      ],
    }

  },
  hash: true,

  // resolve: {
  //   includes: ['docs']
  // },
  // dynamicImport: {},
  exportStatic: {},
  // mpa: {},
  // antd: {},
  // esbuild: {},

  chainWebpack(memo: any) {
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
