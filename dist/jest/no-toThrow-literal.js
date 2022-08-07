"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.noToThrowLiteral = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const typescript_1 = require("../typescript");
exports.noToThrowLiteral = utils.wrapRule(typescript_1.typescript["no-restricted-syntax"], [
    {
        message: "String argument is not allowed",
        selector: "CallExpression[callee.property.name=toThrow] > .arguments",
        typeIs: utils.TypeGroup.string
    }
]);
//# sourceMappingURL=no-toThrow-literal.js.map