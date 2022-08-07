"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noRefUndefined = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.noRefUndefined = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Unnecessary "undefined"',
        selector: [
            "CallExpression[callee.name=ref] > Identifier.arguments[name=undefined]",
            "CallExpression[callee.name=ref][arguments.length=0] > TSTypeParameterInstantiation.typeParameters > TSTypeReference.params > Identifier.typeName[name=/U$/u]",
            "CallExpression[callee.name=ref][arguments.length=0] > TSTypeParameterInstantiation.typeParameters > TSUnionType.params > TSUndefinedKeyword.types"
        ]
    }
]);
//# sourceMappingURL=no-ref-undefined.js.map