"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noComplexDeclaratorType = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noComplexDeclaratorType = utils.wrapRule(core_1.core["no-restricted-syntax"], [
    {
        message: "Avoid complex declarator type",
        selector: [
            "VariableDeclarator[init.type=ArrayExpression] > ArrayPattern > Identifier",
            "VariableDeclarator[init.type=/^(?:ArrayExpression|ObjectExpression)/u] > Identifier.id[typeAnnotation=undefined]",
            "VariableDeclarator[init.type=ObjectExpression] > ObjectPattern > Property > Identifier.value"
        ],
        typeIs: utils.TypeGroup.complex
    }
]);
//# sourceMappingURL=no-complex-declarator-type.js.map