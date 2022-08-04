"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noLanguageMixing = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
const functions_1 = require("@skylib/functions");
// eslint-disable-next-line no-warning-comments -- Wait for @skylib/config
// fixme
exports.noLanguageMixing = (0, functions_1.evaluate)(() => {
    const eng = "\\w";
    const int = "[^\\u0000-\\u00FF]";
    const sep = "[\\d_]*";
    const re = `/${eng}${sep}${int}|${int}${sep}${eng}/u`;
    return utils.wrapRule(core_1.core["restrict-syntax"], [
        {
            message: "No language mixing",
            selector: [`Literal[value=${re}]`, `TemplateLiteral[value.raw=${re}]`]
        }
    ]);
});
//# sourceMappingURL=no-language-mixing.js.map