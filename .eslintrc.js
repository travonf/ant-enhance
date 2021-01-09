module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'no-alert': 0,
    'no-console': 0,
    'import/no-extraneous-dependencies': 0,
    '@typescript-eslint/no-shadow': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/consistent-type-imports': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
  },
};
