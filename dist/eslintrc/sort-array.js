"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortArray = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.sortArray = utils.wrapRule(misc_1.misc["sort-array"], [
    {
        selector: [
            "Property[key.name=files] > ArrayExpression",
            "Property[key.name=/^(?:allow|disallow|filesToLint|filesToSkip|pattern|propertyPattern|selector)$/u] > ArrayExpression"
        ]
    }
]);
//# sourceMappingURL=sort-array.js.map