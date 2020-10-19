const fs = require('fs')
const nodePath = require('path')
// import typescript from 'rollup-plugin-typescript2';
const extraBabelPlugins = [
    [
        'babel-plugin-import',
        {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css'
        },
        'antd'
    ]
]
export default {
    esm: 'rollup',
    disableTypeCheck: true,
    lessInBabelMode: {
        javascriptEnabled: true,
        sourceMap: {}
    },
    extraBabelPlugins,
    extractCSS: true,
    // extraExternals: ['lodash', 'classnames'],
    extraRollupPlugins: []
}
