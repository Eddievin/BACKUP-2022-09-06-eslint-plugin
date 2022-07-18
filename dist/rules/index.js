"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = exports.utils = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("./utils"));
const array_callback_return_type_1 = require("./array-callback-return-type");
const consistent_empty_lines_1 = require("./consistent-empty-lines");
const consistent_filename_1 = require("./consistent-filename");
const consistent_group_empty_lines_1 = require("./consistent-group-empty-lines");
const consistent_import_1 = require("./consistent-import");
const consistent_optional_props_1 = require("./consistent-optional-props");
const custom_1 = require("./custom");
const disallow_import_1 = require("./disallow-import");
const empty_lines_around_comment_1 = require("./empty-lines-around-comment");
const functions_1 = require("@skylib/functions");
const exhaustive_switch_1 = require("./exhaustive-switch");
const export_all_name_1 = require("./export-all-name");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const match_filename_1 = require("./match-filename");
const no_expression_empty_lines_1 = require("./no-expression-empty-lines");
const no_inferrable_types_1 = require("./no-inferrable-types");
const no_multi_type_tuples_1 = require("./no-multi-type-tuples");
const no_self_import_1 = require("./no-self-import");
const no_unsafe_object_assignment_1 = require("./no-unsafe-object-assignment");
const object_format_1 = require("./object-format");
const only_export_name_1 = require("./only-export-name");
const prefer_only_export_1 = require("./prefer-only-export");
const primary_export_only_1 = require("./primary-export-only");
const require_jsdoc_1 = require("./require-jsdoc");
const sort_array_1 = require("./sort-array");
const sort_class_members_1 = require("./sort-class-members");
const sort_keys_1 = require("./sort-keys");
const statements_order_1 = require("./statements-order");
const switch_case_empty_lines_1 = require("./switch-case-empty-lines");
const template_literal_format_1 = require("./template-literal-format");
exports.utils = tslib_1.__importStar(require("./utils"));
// eslint-disable-next-line @skylib/custom/no-complex-type-in-function-return, @skylib/custom/no-complex-type-in-variable-declaration -- Postponed
exports.rules = (0, functions_1.evaluate)(() => {
    const core = {
        "array-callback-return-type": array_callback_return_type_1.arrayCallbackReturnType,
        "consistent-empty-lines": consistent_empty_lines_1.consistentEmptyLines,
        "consistent-filename": consistent_filename_1.consistentFilename,
        "consistent-group-empty-lines": consistent_group_empty_lines_1.consistentGroupEmptyLines,
        "consistent-import": consistent_import_1.consistentImport,
        "consistent-optional-props": consistent_optional_props_1.consistentOptionalProps,
        custom: custom_1.custom,
        "disallow-import": disallow_import_1.disallowImport,
        "empty-lines-around-comment": empty_lines_around_comment_1.emptyLinesAroundComment,
        "exhaustive-switch": exhaustive_switch_1.exhaustiveSwitch,
        "export-all-name": export_all_name_1.exportAllName,
        "match-filename": match_filename_1.matchFilename,
        "no-expression-empty-lines": no_expression_empty_lines_1.noExpressionEmptyLines,
        "no-inferrable-types": no_inferrable_types_1.noInferrableTypes,
        "no-multi-type-tuples": no_multi_type_tuples_1.noMultiTypeTuples,
        "no-self-import": no_self_import_1.noSelfImport,
        "no-unsafe-object-assignment": no_unsafe_object_assignment_1.noUnsafeObjectAssignment,
        "object-format": object_format_1.objectFormat,
        "only-export-name": only_export_name_1.onlyExportName,
        "prefer-only-export": prefer_only_export_1.preferOnlyExport,
        "primary-export-only": primary_export_only_1.primaryExportOnly,
        "require-jsdoc": require_jsdoc_1.requireJsdoc,
        "sort-array": sort_array_1.sortArray,
        "sort-class-members": sort_class_members_1.sortClassMembers,
        "sort-keys": sort_keys_1.sortKeys,
        "statements-order": statements_order_1.statementsOrder,
        "switch-case-empty-lines": switch_case_empty_lines_1.switchCaseEmptyLines,
        "template-literal-format": template_literal_format_1.templateLiteralFormat
    };
    const synonyms = {};
    utils.getSynonyms(synonyms, "./.eslintrc.synonyms.js", core);
    if (node_fs_1.default.existsSync("./node_modules/@skylib"))
        for (const pkg of node_fs_1.default.readdirSync("./node_modules/@skylib"))
            for (const folder of ["configs", "src"])
                utils.getSynonyms(synonyms, `./node_modules/@skylib/${pkg}/${folder}/eslintrc.synonyms.js`, core);
    return Object.assign(Object.assign({}, core), synonyms);
});
//# sourceMappingURL=index.js.map