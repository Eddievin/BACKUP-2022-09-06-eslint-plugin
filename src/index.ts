import classMemberTypedef from "./rules/class-member-typedef";
import consistentEmptyLines from "./rules/consistent-empty-lines";
import consistentGroupEmptyLines from "./rules/consistent-group-empty-lines";
import consistentImport from "./rules/consistent-import";
import disallowByRegexp from "./rules/disallow-by-regexp";
import disallowIdentifier from "./rules/disallow-identifier";
import disallowImport from "./rules/disallow-import";
import emptyLinesAroundComment from "./rules/empty-lines-around-comment";
import exhaustiveSwitch from "./rules/exhaustive-switch";
import noInferrableTypes from "./rules/no-inferrable-types";
import noMutableSignature from "./rules/no-mutable-signature";
import noUnnecessaryReadonly from "./rules/no-unnecessary-readonly";
import noUnnecessaryWritable from "./rules/no-unnecessary-writable";
import noUnsafeObjectAssignment from "./rules/no-unsafe-object-assignment";
import noUnusedImport from "./rules/no-unused-import";
import preferReadonly from "./rules/prefer-readonly";
import requireJsdoc from "./rules/require-jsdoc";
import sortClassMembers from "./rules/sort-class-members";
import sortKeys from "./rules/sort-keys";
import switchCaseEmptyLines from "./rules/switch-case-empty-lines";
import templateLiteralFormat from "./rules/template-literal-format";

export = {
  rules: {
    "class-member-typedef": classMemberTypedef,
    "consistent-empty-lines": consistentEmptyLines,
    "consistent-group-empty-lines": consistentGroupEmptyLines,
    "consistent-import": consistentImport,
    "disallow-by-regexp": disallowByRegexp,
    "disallow-identifier": disallowIdentifier,
    "disallow-import": disallowImport,
    "empty-lines-around-comment": emptyLinesAroundComment,
    "exhaustive-switch": exhaustiveSwitch,
    "no-inferrable-types": noInferrableTypes,
    "no-mutable-signature": noMutableSignature,
    "no-unnecessary-readonly": noUnnecessaryReadonly,
    "no-unnecessary-writable": noUnnecessaryWritable,
    "no-unsafe-object-assignment": noUnsafeObjectAssignment,
    "no-unused-import": noUnusedImport,
    "prefer-readonly": preferReadonly,
    "require-jsdoc": requireJsdoc,
    "sort-class-members": sortClassMembers,
    "sort-keys": sortKeys,
    "switch-case-empty-lines": switchCaseEmptyLines,
    "template-literal-format": templateLiteralFormat
  }
};
