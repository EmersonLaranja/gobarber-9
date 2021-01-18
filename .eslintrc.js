module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off', // let you change a received param. We need to change this, because the Sequelize will need it in a moment
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }], // some moments we'll declare the next method but we'll not be using it
  },
};
