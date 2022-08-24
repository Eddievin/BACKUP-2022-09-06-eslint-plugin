"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentName = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.componentName = utils.wrapRule(misc_1.misc["match-filename"], [
    {
        format: utils.Casing.kebabCase,
        selector: "CallExpression[callee.name=defineComponent] > ObjectExpression > Property[key.name=name] > Literal.value"
    }
]);
//# sourceMappingURL=component-name.js.map