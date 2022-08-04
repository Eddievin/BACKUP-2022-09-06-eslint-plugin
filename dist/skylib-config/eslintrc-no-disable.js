"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eslintrcNoDisable = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.eslintrcNoDisable = utils.wrapRule(misc_1.misc["restrict-syntax"], [
    {
        message: "Do not disable rules",
        selector: "Property[key.name=rules] > ObjectExpression > Property > Literal.value[value=off]"
    }
]);
//# sourceMappingURL=eslintrc-no-disable.js.map