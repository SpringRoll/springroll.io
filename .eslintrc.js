module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    mocha: true,
    node: true
  },
  globals: {
    assert: true,
    expect: true,
    should: true,
    springroll: true
  },
  plugins: ["node", "prettier"],
  extends: ["eslint:recommended", "plugin:vue/essential"],
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false
      }
    ],
    "space-before-blocks": [
      "error",
      { functions: "always", keywords: "always", classes: "always" }
    ],
    "keyword-spacing": ["error"],
    indent: ["error", 2],
    semi: ["error", "always", { omitLastInOneLineBlock: true }],
    "no-console": [0],
    quotes: [2, "single"],
    curly: ["error", "all"],
    "no-var": "error"
  }
};
