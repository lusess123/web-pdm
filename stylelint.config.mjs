export default {
  extends: ['stylelint-config-standard-scss'],
  ignores: [
    'docs-dist/**',
    '**/dist/**',
    'docs/style.less',
    'packages/web-pdm-core/**',
    'packages/*/test/**',
    'node_modules/**',
  ],
  rules: {
    'selector-class-pattern': null,
  },
};
