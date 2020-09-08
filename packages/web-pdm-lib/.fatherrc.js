const fs = require('fs');
const nodePath = require('path');
const extraBabelPlugins = [
  [
    'babel-plugin-import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    },
    'antd',
  ],
];
export default {
  esm: 'babel',
  disableTypeCheck: true,
  // lessInBabelMode: {
  //   javascriptEnabled: true,
  //   sourceMap: {},
  // },
  extraBabelPlugins,
  // extractCSS: true,
  // extraExternals: ['lodash', 'classnames'],
  // extraRollupPlugins: [],
};
