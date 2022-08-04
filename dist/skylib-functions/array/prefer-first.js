"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferFirst = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferFirst = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    {
        message: 'Use "a.first" instead',
        selector: "CallExpression[callee.object.name=a][callee.property.name=get] > Literal.arguments:nth-child(2)[value=0]"
    }
]);
//# sourceMappingURL=prefer-first.js.map