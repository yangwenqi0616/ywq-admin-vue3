/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    singleQuote: 0, // 允许单引号
    '@typescript-eslint/no-this-alias': ['off'],
    'comma-dangle': ['error', 'never'] // 不允许尾随逗号
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
};
