"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferAssign = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferAssign = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Use "o.assign" function instead',
        selector: "CallExpression > .callee[object.name=Object][property.name=assign]"
    }
]);
//# sourceMappingURL=prefer-assign.js.map