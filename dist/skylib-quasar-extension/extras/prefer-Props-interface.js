"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferPropsInterface = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferPropsInterface = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    {
        message: "Use interface",
        selector: "TSTypeAliasDeclaration > Identifier.id[name=Props]"
    }
]);
//# sourceMappingURL=prefer-Props-interface.js.map