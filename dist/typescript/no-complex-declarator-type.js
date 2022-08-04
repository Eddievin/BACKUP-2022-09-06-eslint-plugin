"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noComplexDeclaratorType = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noComplexDeclaratorType = utils.wrapRule(core_1.core["restrict-syntax"], [
    {
        message: "Avoid complex declarator type",
        selector: [
            "VariableDeclarator:not([init.type=TSAsExpression][init.typeAnnotation.typeName.name=const]) > ArrayPattern > Identifier",
            "VariableDeclarator:not([init.type=TSAsExpression][init.typeAnnotation.typeName.name=const]) > Identifier.id[typeAnnotation=undefined]",
            "VariableDeclarator:not([init.type=TSAsExpression][init.typeAnnotation.typeName.name=const]) > ObjectPattern > Property > Identifier.value"
        ],
        typeIs: utils.TypeGroup.complex
    }
]);
//# sourceMappingURL=no-complex-declarator-type.js.map