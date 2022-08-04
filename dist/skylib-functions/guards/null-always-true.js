"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nullAlwaysTrue = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_1 = require("../../typescript");
exports.nullAlwaysTrue = utils.wrapRule(typescript_1.typescript["restrict-syntax"], [
    {
        message: "Expecting type to include null or unknown",
        selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=null] > .arguments:first-child",
        typeIs: utils.TypeGroup.null
    }
]);
//# sourceMappingURL=null-always-true.js.map