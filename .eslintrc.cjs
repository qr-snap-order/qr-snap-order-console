module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:perfectionist/recommended-natural',
    'prettier',
    'plugin:storybook/recommended',
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
    /**
     * @see https://eslint-plugin-perfectionist.azat.io/rules/sort-imports
     */
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        groups: [
          'type',
          ['builtin', 'external'],
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'object',
          'unknown',
        ],
        'internal-pattern': ['@/**'],
      },
    ],
    'perfectionist/sort-objects': 'off',
    'perfectionist/sort-object-types': 'off',
    /**
     * @see https://eslint-plugin-perfectionist.azat.io/rules/sort-jsx-props#sort-jsx-props
     */
    'perfectionist/sort-jsx-props': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        groups: ['reserved', 'id', 'class', 'unknown', 'callback'],
        'custom-groups': {
          reserved: ['ref', 'key', 'children', 'dangerouslySetInnerHTML'],
          id: 'id',
          class: ['class', 'className'],
          callback: 'on[A-Z]*',
        },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
