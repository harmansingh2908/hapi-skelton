module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ['standard', 'eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'linebreak-style': [2, 'unix'],
    quotes: [1, 'single'],
    semi: [2, 'always'],
    'prettier/prettier': [2, null, '@prettier'],
    'no-console': 2,
    'no-undef': 2, // disallow use of undeclared variables unless mentioned in a /*global */ block
    'no-undefined': 2, // disallow use of undefined variable (off by default)
    'no-undef-init': 2, // disallow use of undefined when initializing variables
    'no-unused-vars': [2, { vars: 'all', args: 'none' }], // disallow declaration of variables that are not used in the code
    'no-var': 2, // require let or const instead of var (off by default),
    camelcase: [2, { properties: 'always' }]
  }
};
