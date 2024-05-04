module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    /**
     * If you are using the new JSX transform from React 17, extend react/jsx-runtime in your
     * eslint config (add "plugin:react/jsx-runtime" to "extends") to disable the relevant rules.
     *
     * @see https://www.npmjs.com/package/eslint-plugin-react/v/7.31.6
     */
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    /**
     * @see https://github.com/shadcn-ui/ui/issues/120#issuecomment-1742144083
     */
    'react/prop-types': [2, { ignore: ['className'] }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
