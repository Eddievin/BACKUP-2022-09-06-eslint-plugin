"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferUndefinedShorthandLiteral = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferUndefinedShorthandLiteral = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Prefer "...U" type',
        selector: [
            "TSUnionType[types.0.literal.raw=/(?:false|true)/u][types.1.type=TSUndefinedKeyword]",
            "TSUnionType[types.0.literal.raw=/(?:false|true)/u][types.1.typeName.name=empty]",
            "TSUnionType[types.0.literal.raw=/(?:false|true)/u][types.2.type=TSUndefinedKeyword]",
            "TSUnionType[types.0.literal.raw=/(?:false|true)/u][types.2.typeName.name=empty]",
            "TSUnionType[types.1.literal.raw=/(?:false|true)/u][types.0.type=TSUndefinedKeyword]",
            "TSUnionType[types.1.literal.raw=/(?:false|true)/u][types.0.typeName.name=empty]",
            "TSUnionType[types.1.literal.raw=/(?:false|true)/u][types.2.type=TSUndefinedKeyword]",
            "TSUnionType[types.1.literal.raw=/(?:false|true)/u][types.2.typeName.name=empty]",
            "TSUnionType[types.2.literal.raw=/(?:false|true)/u][types.0.type=TSUndefinedKeyword]",
            "TSUnionType[types.2.literal.raw=/(?:false|true)/u][types.0.typeName.name=empty]",
            "TSUnionType[types.2.literal.raw=/(?:false|true)/u][types.1.type=TSUndefinedKeyword]",
            "TSUnionType[types.2.literal.raw=/(?:false|true)/u][types.1.typeName.name=empty]"
        ]
    }
]);
//# sourceMappingURL=prefer-undefined-shorthand-literal.js.map