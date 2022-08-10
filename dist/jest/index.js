"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jest = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const no_toThrow_literal_1 = require("./no-toThrow-literal");
const prefer_toBe_1 = require("./prefer-toBe");
const prefer_toStrictEqual_1 = require("./prefer-toStrictEqual");
exports.jest = utils.prefixKeys("jest/", {
    "no-toThrow-literal": no_toThrow_literal_1.noToThrowLiteral,
    "prefer-toBe": prefer_toBe_1.preferToBe,
    "prefer-toStrictEqual": prefer_toStrictEqual_1.preferToStrictEqual
});
//# sourceMappingURL=index.js.map