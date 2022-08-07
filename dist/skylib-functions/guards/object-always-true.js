"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectAlwaysTrue = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_1 = require("../../typescript");
exports.objectAlwaysTrue = utils.wrapRule(typescript_1.typescript["no-restricted-syntax"], [
    {
        message: "Expecting type to include object, unknown",
        selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:object|objectU)$/u] > .arguments:first-child",
        typeIs: utils.TypeGroup.object
    }
]);
//# sourceMappingURL=object-always-true.js.map