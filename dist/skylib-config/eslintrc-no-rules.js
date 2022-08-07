"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eslintrcNoRules = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.eslintrcNoRules = utils.wrapRule(misc_1.misc["no-restricted-syntax"], [
    {
        message: "Rules section is disallowed",
        selector: "Property > Identifier.key[name=rules]"
    }
]);
//# sourceMappingURL=eslintrc-no-rules.js.map