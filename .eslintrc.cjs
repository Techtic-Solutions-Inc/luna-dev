module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: ['plugin:react/recommended', 'prettier'],
  plugins: ['react'],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
};
