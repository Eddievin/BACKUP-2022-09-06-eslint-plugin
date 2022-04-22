"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.rules = void 0;
const tslib_1 = require("tslib");
const array_callback_return_type_1 = require("./array-callback-return-type");
const class_member_typedef_1 = require("./class-member-typedef");
const class_name_1 = require("./class-name");
const class_only_export_1 = require("./class-only-export");
const consistent_empty_lines_1 = require("./consistent-empty-lines");
const consistent_group_empty_lines_1 = require("./consistent-group-empty-lines");
const consistent_import_1 = require("./consistent-import");
const disallow_by_regexp_1 = require("./disallow-by-regexp");
const disallow_identifier_1 = require("./disallow-identifier");
const disallow_import_1 = require("./disallow-import");
const empty_lines_around_comment_1 = require("./empty-lines-around-comment");
const exhaustive_switch_1 = require("./exhaustive-switch");
const export_all_name_1 = require("./export-all-name");
const function_properties_style_1 = require("./function-properties-style");
const no_expression_empty_line_1 = require("./no-expression-empty-line");
const no_inferrable_types_1 = require("./no-inferrable-types");
const no_multi_type_tuples_1 = require("./no-multi-type-tuples");
const no_mutable_signature_1 = require("./no-mutable-signature");
const no_negated_condition_1 = require("./no-negated-condition");
const no_unnecessary_readonly_1 = require("./no-unnecessary-readonly");
const no_unnecessary_writable_1 = require("./no-unnecessary-writable");
const no_unsafe_object_assignment_1 = require("./no-unsafe-object-assignment");
const no_unused_import_1 = require("./no-unused-import");
const object_format_1 = require("./object-format");
const only_export_name_1 = require("./only-export-name");
const prefer_readonly_1 = require("./prefer-readonly");
const prefer_readonly_props_1 = require("./prefer-readonly-props");
const prefer_ts_toolbelt_1 = require("./prefer-ts-toolbelt");
const primary_export_only_1 = require("./primary-export-only");
const require_jsdoc_1 = require("./require-jsdoc");
const sort_class_members_1 = require("./sort-class-members");
const sort_keys_1 = require("./sort-keys");
const statements_order_1 = require("./statements-order");
const switch_case_empty_lines_1 = require("./switch-case-empty-lines");
const template_literal_format_1 = require("./template-literal-format");
const vue_component_name_1 = require("./vue-component-name");
exports.rules = {
    "array-callback-return-type": array_callback_return_type_1.arrayCallbackReturnType,
    "class-member-typedef": class_member_typedef_1.classMemberTypedef,
    "class-name": class_name_1.className,
    "class-only-export": class_only_export_1.classOnlyExport,
    "consistent-empty-lines": consistent_empty_lines_1.consistentEmptyLines,
    "consistent-group-empty-lines": consistent_group_empty_lines_1.consistentGroupEmptyLines,
    "consistent-import": consistent_import_1.consistentImport,
    "disallow-by-regexp": disallow_by_regexp_1.disallowByRegexp,
    "disallow-identifier": disallow_identifier_1.disallowIdentifier,
    "disallow-import": disallow_import_1.disallowImport,
    "empty-lines-around-comment": empty_lines_around_comment_1.emptyLinesAroundComment,
    "exhaustive-switch": exhaustive_switch_1.exhaustiveSwitch,
    "export-all-name": export_all_name_1.exportAllName,
    "function-properties-style": function_properties_style_1.functionPropertiesStyle,
    "no-expression-empty-line": no_expression_empty_line_1.noExpressionEmptyLine,
    "no-inferrable-types": no_inferrable_types_1.noInferrableTypes,
    "no-multi-type-tuples": no_multi_type_tuples_1.noMultiTypeTuples,
    "no-mutable-signature": no_mutable_signature_1.noMutableSignature,
    "no-negated-condition": no_negated_condition_1.noNegatedCondition,
    "no-unnecessary-readonly": no_unnecessary_readonly_1.noUnnecessaryReadonly,
    "no-unnecessary-writable": no_unnecessary_writable_1.noUnnecessaryWritable,
    "no-unsafe-object-assignment": no_unsafe_object_assignment_1.noUnsafeObjectAssignment,
    "no-unused-import": no_unused_import_1.noUnusedImport,
    "object-format": object_format_1.objectFormat,
    "only-export-name": only_export_name_1.onlyExportName,
    "prefer-readonly": prefer_readonly_1.preferReadonly,
    "prefer-readonly-props": prefer_readonly_props_1.preferReadonlyProps,
    "prefer-ts-toolbelt": prefer_ts_toolbelt_1.preferTsToolbelt,
    "primary-export-only": primary_export_only_1.primaryExportOnly,
    "require-jsdoc": require_jsdoc_1.requireJsdoc,
    "sort-class-members": sort_class_members_1.sortClassMembers,
    "sort-keys": sort_keys_1.sortKeys,
    "statements-order": statements_order_1.statementsOrder,
    "switch-case-empty-lines": switch_case_empty_lines_1.switchCaseEmptyLines,
    "template-literal-format": template_literal_format_1.templateLiteralFormat,
    "vue-component-name": vue_component_name_1.vueComponentName
};
exports.utils = tslib_1.__importStar(require("./utils"));
//# sourceMappingURL=index.js.map