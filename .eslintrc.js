module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'prettier'],
  plugins: ['react', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'warn',
  },
};
