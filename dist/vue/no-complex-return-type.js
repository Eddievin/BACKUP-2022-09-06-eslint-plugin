"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noComplexReturnType = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const typescript_1 = require("../typescript");
exports.noComplexReturnType = utils.wrapRule(typescript_1.typescript["no-restricted-syntax"], [
    {
        checkReturnType: true,
        message: "Avoid complex return type",
        selector: ":not(Property[key.name=setup]) > :matches(:function, TSDeclareFunction, TSFunctionType, TSMethodSignature)[returnType=undefined]",
        typeIs: utils.TypeGroup.complex
    }
]);
//# sourceMappingURL=no-complex-return-type.js.map