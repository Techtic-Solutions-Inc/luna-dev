module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: ['plugin:react/recommended', 'prettier'],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
