"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferArrayTypeAlias = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.preferArrayTypeAlias = utils.wrapRule(core_1.core["no-restricted-syntax"], [
    {
        checkArrayType: true,
        ignoreSelector: [
            "TSTypeAliasDeclaration > .typeAnnotation",
            "TSTypeAliasDeclaration > .typeAnnotation *"
        ],
        message: "Prefer alias for array type",
        selector: [
            "TSArrayType",
            "TSTupleType[elementTypes.length>0]",
            "TSTypeReference[typeName.name=Array]",
            "TSTypeReference[typeName.name=ReadonlyArray]"
        ],
        typeIsNoneOf: [utils.TypeGroup.any, utils.TypeGroup.parameter]
    }
]);
//# sourceMappingURL=prefer-array-type-alias.js.map