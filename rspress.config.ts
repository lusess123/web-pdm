import { pluginLess } from '@rsbuild/plugin-less';
import { pluginSass } from '@rsbuild/plugin-sass';
import { defineConfig } from '@rspress/core';
import { pluginPreview } from '@rspress/plugin-preview';
import { resolve } from 'node:path';

export default defineConfig({
  root: 'docs',
  outDir: 'docs-dist',
  // G6 accesses browser APIs during module initialization, so the docs site is
  // emitted as a static client application instead of rendering pages in Node.
  ssg: false,
  route: {
    exclude: ['erd.tsx', 'type-erd.tsx', 'typedata.tsx'],
  },
  title: 'web-pdm',
  description: '轻量、可扩展的在线 ER 图工具',
  globalStyles: resolve(__dirname, 'docs/style.less'),
  plugins: [pluginPreview()],
  builderConfig: {
    plugins: [pluginLess(), pluginSass()],
    resolve: {
      alias: {
        'web-pdm': resolve(__dirname, 'packages/web-pdm-lib/src'),
        'web-pdm-core': resolve(__dirname, 'packages/web-pdm-core/src'),
      },
    },
  },
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '示例', link: '/demo/' },
      { text: '配置', link: '/config/' },
      { text: 'GitHub', link: 'https://github.com/lusess123/web-pdm' },
    ],
    sidebar: {
      '/guide/': [
        { text: '介绍', link: '/guide/' },
        { text: '快速开始', link: '/guide/getting-started' },
        { text: '模型', link: '/guide/model' },
        { text: '关联关系', link: '/guide/relation' },
        { text: '工具栏', link: '/guide/toolbar' },
        { text: '升级', link: '/guide/migration' },
        { text: '常见问题', link: '/guide/faq' },
      ],
    },
    footer: {
      message: 'MIT Licensed · Copyright © 2019-present web-pdm',
    },
  },
});
