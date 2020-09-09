const ConsoleWebpack = require("ak-webpack");
const processPath = process.cwd()
const path = require('path')
console.log(path.resolve(processPath, '../../doce'))
module.exports = ConsoleWebpack({
  devServer: {
    https: false ,
  },
}, 'web-pdm', {
  tsLoaderInclude: [
    path.resolve(processPath, '../../docs')
  ]
});
