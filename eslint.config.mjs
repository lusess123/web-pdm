import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['docs-dist/**', 'packages/*/dist/**', 'node_modules/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-case-declarations': 'off',
      'no-constant-condition': 'off',
      'no-extra-boolean-cast': 'off',
      'no-fallthrough': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-useless-assignment': 'off',
      'prefer-const': 'off',
    },
  },
);
