"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentSuboptionsId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.consistentSuboptionsId = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: "Unnecessary array",
            selector: "Property[key.value=/@skylib\\u002F/u] > ArrayExpression > ObjectExpression > Property[key.name=/^(?:folders|overrides|rules|sources)$/u] > ArrayExpression > ObjectExpression > Property[key.name=_id]:not([value.value=/^[\\w.]+$/u])"
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
//# sourceMappingURL=consistent-suboptions-id.js.map