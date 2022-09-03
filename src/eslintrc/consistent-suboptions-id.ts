import * as utils from "../utils";
import { misc } from "../misc";

export const consistentSuboptionsId = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "Unnecessary array",
      selector:
        "Property[key.value=/@skylib\\u002F/u] > ArrayExpression > ObjectExpression > Property[key.name=/^(?:folders|overrides|rules|sources)$/u] > ArrayExpression > ObjectExpression > Property[key.name=_id]:not([value.value=/^[\\w.]+$/u])"
    }
  ],
  docs: {
    description: "Requires consistent IDs.",
    failExamples: `
      module.exports = {
        rules: {
          "@skylib/sort-keys": [
            "warn",
            {
              overrides: [{ _id: "a-b" }]
            }
          ]
        }
      };
    `,
    passExamples: `
      module.exports = {
        rules: {
          "@skylib/sort-keys": [
            "warn",
            {
              overrides: [{ _id: "a.b" }]
            }
          ]
        }
      };
    `
  }
});
