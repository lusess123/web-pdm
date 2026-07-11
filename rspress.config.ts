import { pluginLess } from '@rsbuild/plugin-less';
import { pluginSass } from '@rsbuild/plugin-sass';
import { defineConfig } from '@rspress/core';
import { pluginPreview } from '@rspress/plugin-preview';
import { resolve } from 'node:path';

export default defineConfig({
  root: 'docs',
  outDir: 'docs-dist',
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
      '旧路由跳转.tsx',
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
        { text: 'sidebarMigration', link: '/guide/migration' },
        { text: 'sidebarFaq', link: '/guide/faq' },
      ],
    },
    footer: {
      message: 'MIT Licensed · Copyright © 2019-present web-pdm',
    },
  },
});
