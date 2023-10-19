// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        // args: 'after-used',
        args: 'none',
        ignoreRestSiblings: false,
      },
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
}
