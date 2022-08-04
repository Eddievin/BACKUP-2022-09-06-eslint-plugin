"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferArrayTypeAlias = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.preferArrayTypeAlias = utils.wrapRule(core_1.core["restrict-syntax"], [
    {
        message: "Prefer alias for array type",
        selector: [
            "TSArrayType[elementType.type!=TSAnyKeyword]",
            "TSTupleType[elementTypes.0.type!=TSAnyKeyword][elementTypes.1.type!=TSAnyKeyword][elementTypes.2.type!=TSAnyKeyword]",
            "TSTypeReference[typeName.name=/^(?:Array|ReadonlyArray)$/u][typeParameters.params.0.type!=TSAnyKeyword]"
        ]
    }
]);
//# sourceMappingURL=prefer-array-type-alias.js.map