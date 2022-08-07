"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noTsToolbelt = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.noTsToolbelt = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: 'Prefer "@skylib/functions" type',
        selector: [
            "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/FilterKeys]",
            "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/Optional]",
            "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/OptionalKeys]",
            "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/Readonly]",
            "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/ReadonlyKeys]",
            "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/Required]",
            "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/RequiredKeys]",
            "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/Writable]",
            "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/WritableKeys]"
        ]
    }
]);
//# sourceMappingURL=no-ts-toolbelt.js.map