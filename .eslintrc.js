module.exports = {
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
  },
  env: {
    node: true,
    es2017: true,
    mongodb: true,
  },
  extends: "eslint:recommended",
  rules: {
    "no-multiple-empty-lines": "warn",
    "no-var": "error",
    "prefer-const": "error",
  },
};
