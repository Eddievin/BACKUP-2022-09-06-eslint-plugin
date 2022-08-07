"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringAlwaysTrue = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_1 = require("../../typescript");
exports.stringAlwaysTrue = utils.wrapRule(typescript_1.typescript["no-restricted-syntax"], [
    {
        message: "Expecting type to include string, unknown",
        selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:string|stringU)$/u] > .arguments:first-child",
        typeIs: utils.TypeGroup.string
    }
]);
//# sourceMappingURL=string-always-true.js.map