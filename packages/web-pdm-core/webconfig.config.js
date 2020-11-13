const ConsoleWebpack = require('ak-webpack')

const processPath = process.cwd()
const path = require('path')

module.exports = ConsoleWebpack(
    {
        devServer: {
            https: false
        }
    },
    'web-pdm',
    {
        tsLoaderInclude: [path.resolve(processPath, '../../docs')]
    }
)
