module.exports = {
  extends: [require.resolve("@skylib/config/src/eslintrc")],
  // eslint-disable-next-line no-warning-comments
  // fixme
  rules: {
    "@skylib/no-multi-type-tuples": "off",
    "@skylib/no-mutable-signature": "off",
    "@skylib/no-unsafe-object-assignment": "off",
    "@skylib/prefer-alias-for-array-types": "off",
    "@skylib/prefer-readonly": "off",
    "@skylib/prefer-readonly-props": "off",
    "boundaries/element-types": "off",
    "boundaries/no-unknown-files": "off",
    "eslint-comments/require-description": "off",
    "import/no-internal-modules": [
      "warn",
      {
        allow: [
          "@skylib/*/configs/*",
          "@skylib/config/src/*",
          "@typescript-eslint/types/dist/generated/ast-spec",
          "@typescript-eslint/utils/dist/ts-eslint",
          "date-fns/locale/*",
          "jest-extended/all",
          "ts-toolbelt/**"
        ]
      }
    ]
  }
};
