/** @deprecated Use eslint.config.js (ESLint flat config). Kept for JAW-9133 ticket compatibility. */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: ['plugin:react/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  ignorePatterns: ['dist', 'build', 'node_modules'],
};
