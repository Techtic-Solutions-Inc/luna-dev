/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['plugin:react/recommended', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
