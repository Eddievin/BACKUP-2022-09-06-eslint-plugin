"use strict";
const tslib_1 = require("tslib");
const array_callback_return_type_1 = tslib_1.__importDefault(require("./rules/array-callback-return-type"));
const class_member_typedef_1 = tslib_1.__importDefault(require("./rules/class-member-typedef"));
const class_name_1 = tslib_1.__importDefault(require("./rules/class-name"));
const consistent_empty_lines_1 = tslib_1.__importDefault(require("./rules/consistent-empty-lines"));
const consistent_group_empty_lines_1 = tslib_1.__importDefault(require("./rules/consistent-group-empty-lines"));
const consistent_import_1 = tslib_1.__importDefault(require("./rules/consistent-import"));
const disallow_by_regexp_1 = tslib_1.__importDefault(require("./rules/disallow-by-regexp"));
const disallow_identifier_1 = tslib_1.__importDefault(require("./rules/disallow-identifier"));
const disallow_import_1 = tslib_1.__importDefault(require("./rules/disallow-import"));
const empty_lines_around_comment_1 = tslib_1.__importDefault(require("./rules/empty-lines-around-comment"));
const exhaustive_switch_1 = tslib_1.__importDefault(require("./rules/exhaustive-switch"));
const function_properties_style_1 = tslib_1.__importDefault(require("./rules/function-properties-style"));
const no_expression_empty_line_1 = tslib_1.__importDefault(require("./rules/no-expression-empty-line"));
const no_inferrable_types_1 = tslib_1.__importDefault(require("./rules/no-inferrable-types"));
const no_multi_type_tuples_1 = tslib_1.__importDefault(require("./rules/no-multi-type-tuples"));
const no_mutable_signature_1 = tslib_1.__importDefault(require("./rules/no-mutable-signature"));
const no_negated_condition_1 = tslib_1.__importDefault(require("./rules/no-negated-condition"));
const no_unnecessary_readonly_1 = tslib_1.__importDefault(require("./rules/no-unnecessary-readonly"));
const no_unnecessary_writable_1 = tslib_1.__importDefault(require("./rules/no-unnecessary-writable"));
const no_unsafe_object_assignment_1 = tslib_1.__importDefault(require("./rules/no-unsafe-object-assignment"));
const no_unused_import_1 = tslib_1.__importDefault(require("./rules/no-unused-import"));
const object_format_1 = tslib_1.__importDefault(require("./rules/object-format"));
const prefer_readonly_1 = tslib_1.__importDefault(require("./rules/prefer-readonly"));
const prefer_readonly_props_1 = tslib_1.__importDefault(require("./rules/prefer-readonly-props"));
const prefer_ts_toolbelt_1 = tslib_1.__importDefault(require("./rules/prefer-ts-toolbelt"));
const require_jsdoc_1 = tslib_1.__importDefault(require("./rules/require-jsdoc"));
const sort_class_members_1 = tslib_1.__importDefault(require("./rules/sort-class-members"));
const sort_keys_1 = tslib_1.__importDefault(require("./rules/sort-keys"));
const statements_order_1 = tslib_1.__importDefault(require("./rules/statements-order"));
const switch_case_empty_lines_1 = tslib_1.__importDefault(require("./rules/switch-case-empty-lines"));
const template_literal_format_1 = tslib_1.__importDefault(require("./rules/template-literal-format"));
module.exports = {
    rules: {
        "array-callback-return-type": array_callback_return_type_1.default,
        "class-member-typedef": class_member_typedef_1.default,
        "class-name": class_name_1.default,
        "consistent-empty-lines": consistent_empty_lines_1.default,
        "consistent-group-empty-lines": consistent_group_empty_lines_1.default,
        "consistent-import": consistent_import_1.default,
        "disallow-by-regexp": disallow_by_regexp_1.default,
        "disallow-identifier": disallow_identifier_1.default,
        "disallow-import": disallow_import_1.default,
        "empty-lines-around-comment": empty_lines_around_comment_1.default,
        "exhaustive-switch": exhaustive_switch_1.default,
        "function-properties-style": function_properties_style_1.default,
        "no-expression-empty-line": no_expression_empty_line_1.default,
        "no-inferrable-types": no_inferrable_types_1.default,
        "no-multi-type-tuples": no_multi_type_tuples_1.default,
        "no-mutable-signature": no_mutable_signature_1.default,
        "no-negated-condition": no_negated_condition_1.default,
        "no-unnecessary-readonly": no_unnecessary_readonly_1.default,
        "no-unnecessary-writable": no_unnecessary_writable_1.default,
        "no-unsafe-object-assignment": no_unsafe_object_assignment_1.default,
        "no-unused-import": no_unused_import_1.default,
        "object-format": object_format_1.default,
        "prefer-readonly": prefer_readonly_1.default,
        "prefer-readonly-props": prefer_readonly_props_1.default,
        "prefer-ts-toolbelt": prefer_ts_toolbelt_1.default,
        "require-jsdoc": require_jsdoc_1.default,
        "sort-class-members": sort_class_members_1.default,
        "sort-keys": sort_keys_1.default,
        "statements-order": statements_order_1.default,
        "switch-case-empty-lines": switch_case_empty_lines_1.default,
        "template-literal-format": template_literal_format_1.default
    }
};
//# sourceMappingURL=index.js.map