export default {
  extends: ['stylelint-config-standard-scss'],
  ignores: [
    'docs-dist/**',
    '**/dist/**',
    'docs/style.less',
    'packages/*/test/**',
    'node_modules/**',
  ],
  rules: {
    'selector-class-pattern': null,
  },
};
