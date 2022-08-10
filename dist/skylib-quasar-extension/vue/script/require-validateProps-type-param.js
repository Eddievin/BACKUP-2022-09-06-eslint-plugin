"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireValidatePropsTypeParam = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.requireValidatePropsTypeParam = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Expecting "OwnProps" type parameter',
        selector: [
            "CallExpression[callee.name=validateProps] > TSTypeParameterInstantiation.typeParameters > TSTypeReference.params > TSQualifiedName.typeName > Identifier.right[name!=OwnProps]",
            "CallExpression[callee.name=validateProps][typeParameters=undefined]"
        ]
    }
]);
//# sourceMappingURL=require-validateProps-type-param.js.map