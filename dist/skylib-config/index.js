"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skylibConfig = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const eslintrc_no_disable_1 = require("./eslintrc-no-disable");
const eslintrc_no_overrides_1 = require("./eslintrc-no-overrides");
const eslintrc_no_rules_1 = require("./eslintrc-no-rules");
const prettier_1 = require("./prettier");
const sort_commitlint_1 = require("./sort-commitlint");
const sort_eslintrc_synonyms_1 = require("./sort-eslintrc-synonyms");
exports.skylibConfig = utils.prefixKeys("config/", {
    "eslintrc-no-disable": eslintrc_no_disable_1.eslintrcNoDisable,
    "eslintrc-no-overrides": eslintrc_no_overrides_1.eslintrcNoOverrides,
    "eslintrc-no-rules": eslintrc_no_rules_1.eslintrcNoRules,
    prettier: prettier_1.prettier,
    "sort-commitlint": sort_commitlint_1.sortCommitlint,
    "sort-eslintrc-synonyms": sort_eslintrc_synonyms_1.sortEslintrcSynonyms
});
//# sourceMappingURL=index.js.map