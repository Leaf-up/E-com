module.exports = {
  root: true,
  env: { browser: true, es2015: true },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:react/jsx-runtime",
    'eslint-config-prettier',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', '*.d.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint', 'prettier'],
  overrides: [
    {
      'files': ['*.ts', '*.tsx'],
      'parserOptions': {
        'ecmaVersion': 2015,
        'sourceType': 'module',
        'project': ['**/tsconfig.json']
      }
    }
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'arrow-parens': 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'object-curly-newline': 'off',
    'no-bitwise': 'off',
    'lines-between-class-members': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    '@typescript-eslint/no-explicit-any': 'error',
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error"
  },
  'noInlineConfig': true
}
