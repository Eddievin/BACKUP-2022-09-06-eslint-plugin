module.exports = {
  extends: [require.resolve("@skylib/config/src/eslintrc")],
  rules: {
    "@skylib/disallow-by-regexp": "off",
    "@skylib/prefer-readonly": "off",
    "eslint-comments/require-description": "off"
  }
};
