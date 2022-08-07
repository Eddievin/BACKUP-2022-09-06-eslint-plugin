"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyAlwaysTrue = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_1 = require("../../typescript");
exports.emptyAlwaysTrue = utils.wrapRule(typescript_1.typescript["no-restricted-syntax"], [
    {
        message: "Expecting type to include null, undefined or unknown",
        selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=empty] > .arguments:first-child",
        typeIsOneOf: [utils.TypeGroup.null, utils.TypeGroup.undefined]
    }
]);
//# sourceMappingURL=empty-always-true.js.map