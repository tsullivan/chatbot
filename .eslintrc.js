module.exports = {
  parserOptions: { ecmaVersion: 8 },
  env: {
    node: true,
    commonjs: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier', 'node'],
  rules: {
    'node/exports-style': ['error', 'module.exports'],
    'node/no-missing-require': [
      'error',
      {
        allowModules: [],
        resolvePaths: ['/path/to/a/modules/directory'],
        tryExtensions: ['.js', '.json', '.node'],
      },
    ],
    'prettier/prettier': 2,
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    indent: ['error', 2],
    'no-shadow': ['error'],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: ['error', 'always'],
  },
  overrides: [
    {
      files: ['*/*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
};
