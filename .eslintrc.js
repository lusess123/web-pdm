const fabric = require('@umijs/fabric')

module.exports = {
    extends: [require.resolve('@umijs/fabric/dist/eslint')],
    rules: {
        'import/no-extraneous-dependencies': 0,
    },
    globals: {},
}
