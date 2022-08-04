"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callableAlwaysTrue = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_1 = require("../../typescript");
exports.callableAlwaysTrue = utils.wrapRule(typescript_1.typescript["restrict-syntax"], [
    {
        message: "Expecting type to include function or unknown",
        selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=callable] > .arguments:first-child",
        typeIs: utils.TypeGroup.function
    }
]);
//# sourceMappingURL=callable-always-true.js.map