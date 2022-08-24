"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireObjectTypeParam = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const typescript_1 = require("../../../typescript");
exports.requireObjectTypeParam = utils.wrapRule(typescript_1.typescript["typescript/no-restricted-syntax"], [
    {
        message: "Missing type parameter",
        selector: "CallExpression[callee.object.object.name=is][callee.object.property.name=object][callee.property.name=/^(?:factory|of)$/][typeParameters=undefined]"
    }
]);
//# sourceMappingURL=require-object-type-param.js.map