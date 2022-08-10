"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const eslintrc_1 = require("./eslintrc");
const jest_1 = require("./jest");
const misc_1 = require("./misc");
const functions_1 = require("@skylib/functions");
const skylib_config_1 = require("./skylib-config");
const skylib_facades_1 = require("./skylib-facades");
const skylib_framework_1 = require("./skylib-framework");
const skylib_functions_1 = require("./skylib-functions");
const skylib_quasar_extension_1 = require("./skylib-quasar-extension");
const typescript_1 = require("./typescript");
const vue_1 = require("./vue");
exports.configs = {
    "all": {
        plugins: ["@skylib/eslint-plugin"],
        rules: Object.assign(Object.assign({}, rules(misc_1.misc)), { "@skylib/disallow-import": "off", "@skylib/match-filename": "off", "@skylib/no-restricted-syntax": "off", "@skylib/require-syntax": "off", "@skylib/sort-array": "off", "@skylib/wrap": "off" })
    },
    "config": { plugins: ["@skylib/eslint-plugin"], rules: rules(skylib_config_1.skylibConfig) },
    "eslintrc": { plugins: ["@skylib/eslint-plugin"], rules: rules(eslintrc_1.eslintrc) },
    "facades": {
        plugins: ["@skylib/eslint-plugin"],
        rules: rules(skylib_facades_1.skylibFacades)
    },
    "framework": {
        plugins: ["@skylib/eslint-plugin"],
        rules: rules(skylib_framework_1.skylibFramework)
    },
    "functions": {
        overrides: [{ files: "./tests/**", rules: rules(skylib_functions_1.skylibFunctions.jest) }],
        plugins: ["@skylib/eslint-plugin"],
        rules: rules(skylib_functions_1.skylibFunctions.misc)
    },
    "functions/jest": {
        plugins: ["@skylib/eslint-plugin"],
        rules: rules(skylib_functions_1.skylibFunctions.jest)
    },
    "functions/misc": {
        plugins: ["@skylib/eslint-plugin"],
        rules: rules(skylib_functions_1.skylibFunctions.misc)
    },
    "jest": { plugins: ["@skylib/eslint-plugin"], rules: rules(jest_1.jest) },
    "quasar-extension": {
        overrides: [
            { files: "*.extras", rules: rules(skylib_quasar_extension_1.skylibQuasarExtension.extras) },
            { files: "*.vue", rules: rules(skylib_quasar_extension_1.skylibQuasarExtension.vue) },
            { files: "./tests/**", rules: rules(skylib_quasar_extension_1.skylibQuasarExtension.jest) }
        ],
        plugins: ["@skylib/eslint-plugin"],
        rules: rules(skylib_quasar_extension_1.skylibQuasarExtension.misc)
    },
    "quasar-extension/extras": {
        plugins: ["@skylib/eslint-plugin"],
        rules: rules(skylib_quasar_extension_1.skylibQuasarExtension.extras)
    },
    "quasar-extension/jest": {
        plugins: ["@skylib/eslint-plugin"],
        rules: rules(skylib_quasar_extension_1.skylibQuasarExtension.jest)
    },
    "quasar-extension/misc": {
        plugins: ["@skylib/eslint-plugin"],
        rules: rules(skylib_quasar_extension_1.skylibQuasarExtension.misc)
    },
    "quasar-extension/vue": {
        plugins: ["@skylib/eslint-plugin"],
        rules: rules(skylib_quasar_extension_1.skylibQuasarExtension.vue)
    },
    "typescript": {
        plugins: ["@skylib/eslint-plugin"],
        rules: Object.assign(Object.assign({}, rules(typescript_1.typescript)), { "@skylib/typescript/no-restricted-syntax": "off" })
    },
    "vue": {
        plugins: ["@skylib/eslint-plugin"],
        rules: Object.assign(Object.assign({}, rules(vue_1.vue)), { "@skylib/typescript/no-complex-return-type": "off" })
    }
};
// eslint-disable-next-line @skylib/require-jsdoc -- Postponed
function rules(source) {
    return functions_1.o.fromEntries(functions_1.o.keys(source).map(key => [`@skylib/${key}`, "warn"]));
}
//# sourceMappingURL=configs.js.map