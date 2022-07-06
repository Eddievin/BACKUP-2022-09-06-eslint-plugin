// eslint-disable-next-line @skylib/custom/eslintrc-no-temp  -- Postponed
module.exports = {
  rules: {
    "@skylib/consistent-filename": "off",
    "@skylib/consistent-import": "off",
    "@skylib/custom": "off",
    "@skylib/no-multi-type-tuples": "off",
    "@skylib/no-mutable-signature": "off",
    "@skylib/no-unsafe-object-assignment": "off",
    "@skylib/prefer-alias-for-array-types": "off",
    "@skylib/prefer-readonly": "off",
    "@skylib/prefer-readonly-props": "off",
    "complexity": ["warn", 25],
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
    ],
    "import/no-nodejs-modules": "off",
    "max-depth": ["warn", 5]
  }
};
