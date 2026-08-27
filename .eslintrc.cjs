module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: 'detect' },
  },
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended', 'prettier'],
  plugins: ['react', 'prettier', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': 'error',
  },
  ignorePatterns: ['dist', 'node_modules', 'build', 'coverage', 'vite.config.ts'],
  overrides: [
    {
      files: ['tests/**/*.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
      env: { node: true },
    },
  ],
};
