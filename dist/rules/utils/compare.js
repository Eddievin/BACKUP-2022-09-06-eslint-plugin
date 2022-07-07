"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = void 0;
const tslib_1 = require("tslib");
const natural_compare_1 = tslib_1.__importDefault(require("natural-compare"));
/**
 * Compares two strings.
 *
 * @param x - Value 1.
 * @param y - Value 2.
 * @returns Comparison result.
 */
function compare(x, y) {
    return (0, natural_compare_1.default)(x.replace(re, callback), y.replace(re, callback));
}
exports.compare = compare;
const map = { ":": ".", ".": ":" };
const re = /[.:]/gu;
/**
 * Returns replacement character.
 *
 * @param char - Character.
 * @returns Replacement character.
 */
function callback(char) {
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
    return map[char];
}
//# sourceMappingURL=compare.js.map