"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRefTypeParam = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.requireRefTypeParam = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: "Missing type parameter",
        selector: "CallExpression[typeParameters=undefined][arguments.length=0] > Identifier.callee[name=ref]"
    }
]);
//# sourceMappingURL=require-ref-type-param.js.map