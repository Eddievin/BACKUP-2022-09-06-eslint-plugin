"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortEslintrcSynonyms = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.sortEslintrcSynonyms = utils.wrapRule(misc_1.misc["sort-array"], [
    { selector: "ArrayExpression" }
]);
//# sourceMappingURL=sort-eslintrc-synonyms.js.map