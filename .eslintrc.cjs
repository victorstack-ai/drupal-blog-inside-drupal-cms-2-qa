module.exports = {
  env: {
    node: true,
    es2023: true,
    mocha: true
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: "script"
  },
  rules: {
    "no-console": "off"
  }
};
