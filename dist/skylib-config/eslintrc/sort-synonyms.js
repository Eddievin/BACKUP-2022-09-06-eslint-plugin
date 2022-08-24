"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortSynonyms = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.sortSynonyms = utils.wrapRule(misc_1.misc["sort-array"], [
    { triggerByComment: false }
]);
//# sourceMappingURL=sort-synonyms.js.map