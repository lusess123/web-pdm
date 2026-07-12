import { pluginLess } from '@rsbuild/plugin-less';
import { pluginSass } from '@rsbuild/plugin-sass';
import { defineConfig } from '@rspress/core';
import { pluginPreview } from '@rspress/plugin-preview';
import { resolve } from 'node:path';

export default defineConfig({
  root: 'docs',
  outDir: 'docs-dist',
  icon: '/brand/web-pdm-icon.svg',
  logo: {
    light: '/brand/web-pdm-mark-light.svg',
    dark: '/brand/web-pdm-mark-dark.svg',
  },
  logoText: 'web-pdm',
  lang: 'en',
  locales: [
    {
      lang: 'en',
      label: 'English',
      title: 'web-pdm',
      description: 'A lightweight, extensible React ER diagram workspace',
    },
    {
      lang: 'zh',
      label: '简体中文',
      title: 'web-pdm',
      description: '轻量、可扩展的 React ER 图工作台',
    },
  ],
  // G6 accesses browser APIs during module initialization, so the docs site is
  // emitted as a static client application instead of rendering pages in Node.
  ssg: false,
  route: {
    exclude: [
      'erd.tsx',
      'type-erd.tsx',
      'typedata.tsx',
      '首页.tsx',
      '品牌标识.tsx',
      '空图示例.tsx',
      '旧路由跳转.tsx',
      '文案类型.ts',
      '样式声明.d.ts',
    ],
  },
  title: 'web-pdm',
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
    darkMode: 'auto',
    localeRedirect: 'never',
    nav: [
      { text: 'navGuide', link: '/guide/' },
      { text: 'navExamples', link: '/demo/' },
      { text: 'navConfig', link: '/config/' },
      { text: 'GitHub', link: 'https://github.com/lusess123/web-pdm' },
    ],
    sidebar: {
      '/guide/': [
        { text: 'sidebarIntroduction', link: '/guide/' },
        { text: 'sidebarGettingStarted', link: '/guide/getting-started' },
        { text: 'sidebarModels', link: '/guide/model' },
        { text: 'sidebarRelations', link: '/guide/relation' },
        { text: 'sidebarToolbar', link: '/guide/toolbar' },
        { text: 'DDD & Domain Models', link: '/guide/ddd' },
        { text: 'G6 Practices', link: '/guide/next' },
        { text: 'sidebarMigration', link: '/guide/migration' },
        { text: 'sidebarFaq', link: '/guide/faq' },
      ],
      '/zh/guide/': [
        { text: '介绍', link: '/zh/guide/' },
        { text: '快速开始', link: '/zh/guide/getting-started' },
        { text: '模型', link: '/zh/guide/model' },
        { text: '关联关系', link: '/zh/guide/relation' },
        { text: '工具栏', link: '/zh/guide/toolbar' },
        { text: 'DDD 与领域模型', link: '/zh/guide/ddd' },
        { text: 'G6 实践', link: '/zh/guide/next' },
        { text: '升级迁移', link: '/zh/guide/migration' },
        { text: '常见问题', link: '/zh/guide/faq' },
      ],
    },
    footer: {
      message: 'MIT Licensed · Copyright © 2019-present web-pdm',
    },
  },
});
