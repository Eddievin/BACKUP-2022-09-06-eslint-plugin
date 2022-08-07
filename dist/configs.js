"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const prefixed_rules_1 = require("./prefixed-rules");
const functions_1 = require("@skylib/functions");
exports.configs = {
    "all": {
        plugins: ["@skylib/eslint-plugin"],
        rules: Object.assign(Object.assign({}, rules(prefixed_rules_1.misc)), { "@skylib/disallow-import": "off", "@skylib/match-filename": "off", "@skylib/no-restricted-syntax": "off", "@skylib/require-syntax": "off", "@skylib/sort-array": "off", "@skylib/wrap": "off" })
    },
    "config": { plugins: ["@skylib/eslint-plugin"], rules: rules(prefixed_rules_1.skylibConfig) },
    "eslintrc": { plugins: ["@skylib/eslint-plugin"], rules: rules(prefixed_rules_1.eslintrc) },
    "facades": {
        plugins: ["@skylib/eslint-plugin"],
        rules: rules(prefixed_rules_1.skylibFacades)
    },
    "functions": {
        plugins: ["@skylib/eslint-plugin"],
        rules: rules(prefixed_rules_1.skylibFunctions)
    },
    "jest": { plugins: ["@skylib/eslint-plugin"], rules: rules(prefixed_rules_1.jest) },
    "quasar-extension": {
        plugins: ["@skylib/eslint-plugin"],
        rules: rules(prefixed_rules_1.skylibQuasarExtension)
    },
    "typescript": {
        plugins: ["@skylib/eslint-plugin"],
        rules: Object.assign(Object.assign({}, rules(prefixed_rules_1.typescript)), { "@skylib/typescript/no-restricted-syntax": "off" })
    },
    "vue": {
        plugins: ["@skylib/eslint-plugin"],
        rules: Object.assign(Object.assign({}, rules(prefixed_rules_1.vue)), { "@skylib/typescript/no-complex-return-type": "off" })
    }
};
// eslint-disable-next-line @skylib/require-jsdoc -- Postponed
function rules(source) {
    return functions_1.o.fromEntries(functions_1.o.keys(source).map(key => [`@skylib/${key}`, "warn"]));
}
//# sourceMappingURL=configs.js.map