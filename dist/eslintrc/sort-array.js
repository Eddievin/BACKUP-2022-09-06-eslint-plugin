"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortArray = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.sortArray = utils.wrapRule(misc_1.misc["sort-array"], [
    {
        selector: "Property[key.name=/^(?:allow|disallow|files|filesToLint|filesToSkip|ignoreSelector|pattern|propertyPattern|selector)$/u] > ArrayExpression",
        triggerByComment: false
    }
]);
//# sourceMappingURL=sort-array.js.map