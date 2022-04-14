import arrayCallbackReturnType from "./rules/array-callback-return-type";
import classMemberTypedef from "./rules/class-member-typedef";
import className from "./rules/class-name";
import consistentEmptyLines from "./rules/consistent-empty-lines";
import consistentGroupEmptyLines from "./rules/consistent-group-empty-lines";
import consistentImport from "./rules/consistent-import";
import disallowByRegexp from "./rules/disallow-by-regexp";
import disallowIdentifier from "./rules/disallow-identifier";
import disallowImport from "./rules/disallow-import";
import emptyLinesAroundComment from "./rules/empty-lines-around-comment";
import exhaustiveSwitch from "./rules/exhaustive-switch";
import functionPropertiesStyle from "./rules/function-properties-style";
import noExpressionEmptyLine from "./rules/no-expression-empty-line";
import noInferrableTypes from "./rules/no-inferrable-types";
import noMutableSignature from "./rules/no-mutable-signature";
import noNegatedCondition from "./rules/no-negated-condition";
import noUnnecessaryReadonly from "./rules/no-unnecessary-readonly";
import noUnnecessaryWritable from "./rules/no-unnecessary-writable";
import noUnsafeObjectAssignment from "./rules/no-unsafe-object-assignment";
import noUnusedImport from "./rules/no-unused-import";
import objectFormat from "./rules/object-format";
import preferReadonly from "./rules/prefer-readonly";
import preferTsToolbelt from "./rules/prefer-ts-toolbelt";
import requireJsdoc from "./rules/require-jsdoc";
import sortClassMembers from "./rules/sort-class-members";
import sortKeys from "./rules/sort-keys";
import statementsOrder from "./rules/statements-order";
import switchCaseEmptyLines from "./rules/switch-case-empty-lines";
import templateLiteralFormat from "./rules/template-literal-format";

export = {
  rules: {
    "array-callback-return-type": arrayCallbackReturnType,
    "class-member-typedef": classMemberTypedef,
    "class-name": className,
    "consistent-empty-lines": consistentEmptyLines,
    "consistent-group-empty-lines": consistentGroupEmptyLines,
    "consistent-import": consistentImport,
    "disallow-by-regexp": disallowByRegexp,
    "disallow-identifier": disallowIdentifier,
    "disallow-import": disallowImport,
    "empty-lines-around-comment": emptyLinesAroundComment,
    "exhaustive-switch": exhaustiveSwitch,
    "function-properties-style": functionPropertiesStyle,
    "no-expression-empty-line": noExpressionEmptyLine,
    "no-inferrable-types": noInferrableTypes,
    "no-mutable-signature": noMutableSignature,
    "no-negated-condition": noNegatedCondition,
    "no-unnecessary-readonly": noUnnecessaryReadonly,
    "no-unnecessary-writable": noUnnecessaryWritable,
    "no-unsafe-object-assignment": noUnsafeObjectAssignment,
    "no-unused-import": noUnusedImport,
    "object-format": objectFormat,
    "prefer-readonly": preferReadonly,
    "prefer-ts-toolbelt": preferTsToolbelt,
    "require-jsdoc": requireJsdoc,
    "sort-class-members": sortClassMembers,
    "sort-keys": sortKeys,
    "statements-order": statementsOrder,
    "switch-case-empty-lines": switchCaseEmptyLines,
    "template-literal-format": templateLiteralFormat
  }
};
