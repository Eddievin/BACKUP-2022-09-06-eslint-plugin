"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const prefixed_rules_1 = require("./prefixed-rules");
const functions_1 = require("@skylib/functions");
// eslint-disable-next-line no-warning-comments -- Wait for @skylib/config update
// fixme - Remove evaluate
// eslint-disable-next-line @skylib/custom/no-complex-type-in-function-return, @skylib/custom/no-complex-type-in-variable-declaration -- Ok
exports.rules = (0, functions_1.evaluate)(() => {
    const result = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, prefixed_rules_1.misc), prefixed_rules_1.eslintrc), prefixed_rules_1.jest), prefixed_rules_1.typescript), prefixed_rules_1.vue), prefixed_rules_1.skylibConfig), prefixed_rules_1.skylibFacades), prefixed_rules_1.skylibFunctions), prefixed_rules_1.skylibQuasarExtension);
    return Object.assign(Object.assign({}, result), utils.getSynonyms("./.eslintrc.synonyms.js", result));
});
//# sourceMappingURL=rules.js.map