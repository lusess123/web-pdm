import { defineConfig } from 'father';

import { readdirSync } from 'fs';
import { join } from 'path';

// utils must build before core
// runtime must build before renderer-react
// components dependencies order: form -> table -> list

// const headPkgs: string[] = ['button', 'tag']; // 添加button和tag
// const tailPkgs = readdirSync(join(__dirname, 'packages')).filter(
//   (pkg) => pkg.charAt(0) !== '.' && !headPkgs.includes(pkg),
// );

const pkgs = [ "web-pdm-core" , "web-pdm-lib" ]

const type = process.env.BUILD_TYPE;

let config = {};

if (type === 'lib') {
  config = {
    cjs: {},
    esm: false,
    runtimeHelpers: true,
    pkgs,
    extraBabelPlugins: [
      ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
    ],
  };
}

if (type === 'es') {
  config = {
    cjs: false,
    esm: {
      type: 'babel',
    },
    runtimeHelpers: true,
    pkgs,
    extraBabelPlugins: [
      // [require('./scripts/replaceLib')],
      ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
    ],
  };
}

export default config;
