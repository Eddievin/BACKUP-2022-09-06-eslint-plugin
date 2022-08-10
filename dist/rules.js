"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const eslintrc_1 = require("./eslintrc");
const functions_1 = require("@skylib/functions");
const jest_1 = require("./jest");
const misc_1 = require("./misc");
const skylib_config_1 = require("./skylib-config");
const skylib_facades_1 = require("./skylib-facades");
const skylib_framework_1 = require("./skylib-framework");
const skylib_functions_1 = require("./skylib-functions");
const skylib_quasar_extension_1 = require("./skylib-quasar-extension");
const typescript_1 = require("./typescript");
const vue_1 = require("./vue");
// eslint-disable-next-line no-warning-comments -- Wait for @skylib/config update
// fixme - Remove evaluate
// eslint-disable-next-line @skylib/custom/no-complex-type-in-variable-declaration, @skylib/custom/no-complex-type-in-function-return -- Ok
exports.rules = (0, functions_1.evaluate)(() => {
    const result = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, misc_1.misc), eslintrc_1.eslintrc), jest_1.jest), typescript_1.typescript), vue_1.vue), skylib_config_1.skylibConfig), skylib_facades_1.skylibFacades), skylib_framework_1.skylibFramework), skylib_functions_1.skylibFunctions.jest), skylib_functions_1.skylibFunctions.misc), skylib_quasar_extension_1.skylibQuasarExtension.extras), skylib_quasar_extension_1.skylibQuasarExtension.jest), skylib_quasar_extension_1.skylibQuasarExtension.misc), skylib_quasar_extension_1.skylibQuasarExtension.vue);
    return Object.assign(Object.assign({}, result), utils.getSynonyms("./.eslintrc.synonyms.js", result));
});
//# sourceMappingURL=rules.js.map