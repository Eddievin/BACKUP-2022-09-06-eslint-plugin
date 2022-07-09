module.exports = {
  rules: {
    "@skylib/sort-keys": [
      "warn",
      {
        overrides: [
          {
            _id: "utils-createRule",
            customOrder: [
              "name",
              "fixable",
              "isOptions",
              "defaultOptions",
              "subOptionsKey",
              "isSubOptions",
              "defaultSubOptions",
              "messages",
              "create"
            ],
            selector:
              "CallExpression[callee.object.name=utils][callee.property.name=createRule] > ObjectExpression"
          },
          {
            _id: "utils-testRule",
            customOrder: [
              "only",
              "name",
              "filename",
              "settings",
              "options",
              "code",
              "output",
              "errors"
            ],
            selector:
              "CallExpression[callee.object.name=utils][callee.property.name=testRule] > ArrayExpression > ObjectExpression"
          }
        ]
      }
    ]
  }
};
