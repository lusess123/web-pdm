import { defineConfig } from 'dumi'

export default defineConfig({
    description: '一个用G6做的ER图工具，最终目标是想做成在线版的 powerdesigner',
    title: 'web-pdm',
    favicon:
        'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
    logo:
        'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
    outputPath: 'docs-dist',
    alias: {
        'web-pdm': '/es'
    },
    chainWebpack(memo, { env, webpack, createCSSRule }) {
        // 设置 alias
        memo.resolve.alias.set('webpdm', '/src')
    },
    // includes: ['doc'],
    mode: 'doc',
    // theme: {
    //   '@c-primary': '#ff652f',
    // },
    antd: {
        dark: true
        // compact: true,
    },
    resolve: {
        includes: ['docs']
        // previewLangs: []
    },
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        [
            'umi-plugin-react',
            {
                antd: true, // 重点在这里。。。我没有发现到antd是false
                dva: false,
                dynamicImport: false,
                title: 'simple-umi',
                dll: false,

                routes: {
                    exclude: [/components\//]
                }
            }
        ]
    ]

    // more config: https://d.umijs.org/config
})
