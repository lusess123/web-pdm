// const fs = require('fs')
// const nodePath = require('path')
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
    esm: 'babel',
    cjs: 'babel',
    extraBabelPlugins
  }