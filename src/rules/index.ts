import { arrayCallbackReturnType } from "./array-callback-return-type";
import { classMemberTypedef } from "./class-member-typedef";
import { className } from "./class-name";
import { classOnlyExport } from "./class-only-export";
import { consistentEmptyLines } from "./consistent-empty-lines";
import { consistentGroupEmptyLines } from "./consistent-group-empty-lines";
import { consistentImport } from "./consistent-import";
import { disallowByRegexp } from "./disallow-by-regexp";
import { disallowIdentifier } from "./disallow-identifier";
import { disallowImport } from "./disallow-import";
import { emptyLinesAroundComment } from "./empty-lines-around-comment";
import { exhaustiveSwitch } from "./exhaustive-switch";
import { exportAllName } from "./export-all-name";
import { functionPropertiesStyle } from "./function-properties-style";
import { noExpressionEmptyLine } from "./no-expression-empty-line";
import { noInferrableTypes } from "./no-inferrable-types";
import { noMultiTypeTuples } from "./no-multi-type-tuples";
import { noMutableSignature } from "./no-mutable-signature";
import { noNegatedCondition } from "./no-negated-condition";
import { noUnnecessaryReadonly } from "./no-unnecessary-readonly";
import { noUnnecessaryWritable } from "./no-unnecessary-writable";
import { noUnsafeObjectAssignment } from "./no-unsafe-object-assignment";
import { noUnusedImport } from "./no-unused-import";
import { objectFormat } from "./object-format";
import { onlyExportName } from "./only-export-name";
import { preferReadonly } from "./prefer-readonly";
import { preferReadonlyProps } from "./prefer-readonly-props";
import { preferTsToolbelt } from "./prefer-ts-toolbelt";
import { primaryExportOnly } from "./primary-export-only";
import { requireJsdoc } from "./require-jsdoc";
import { sortClassMembers } from "./sort-class-members";
import { sortKeys } from "./sort-keys";
import { statementsOrder } from "./statements-order";
import { switchCaseEmptyLines } from "./switch-case-empty-lines";
import { templateLiteralFormat } from "./template-literal-format";
import { vueComponentName } from "./vue-component-name";

export * as utils from "./utils";

export const rules = {
  "array-callback-return-type": arrayCallbackReturnType,
  "class-member-typedef": classMemberTypedef,
  "class-name": className,
  "class-only-export": classOnlyExport,
  "consistent-empty-lines": consistentEmptyLines,
  "consistent-group-empty-lines": consistentGroupEmptyLines,
  "consistent-import": consistentImport,
  "disallow-by-regexp": disallowByRegexp,
  "disallow-identifier": disallowIdentifier,
  "disallow-import": disallowImport,
  "empty-lines-around-comment": emptyLinesAroundComment,
  "exhaustive-switch": exhaustiveSwitch,
  "export-all-name": exportAllName,
  "function-properties-style": functionPropertiesStyle,
  "no-expression-empty-line": noExpressionEmptyLine,
  "no-inferrable-types": noInferrableTypes,
  "no-multi-type-tuples": noMultiTypeTuples,
  "no-mutable-signature": noMutableSignature,
  "no-negated-condition": noNegatedCondition,
  "no-unnecessary-readonly": noUnnecessaryReadonly,
  "no-unnecessary-writable": noUnnecessaryWritable,
  "no-unsafe-object-assignment": noUnsafeObjectAssignment,
  "no-unused-import": noUnusedImport,
  "object-format": objectFormat,
  "only-export-name": onlyExportName,
  "prefer-readonly": preferReadonly,
  "prefer-readonly-props": preferReadonlyProps,
  "prefer-ts-toolbelt": preferTsToolbelt,
  "primary-export-only": primaryExportOnly,
  "require-jsdoc": requireJsdoc,
  "sort-class-members": sortClassMembers,
  "sort-keys": sortKeys,
  "statements-order": statementsOrder,
  "switch-case-empty-lines": switchCaseEmptyLines,
  "template-literal-format": templateLiteralFormat,
  "vue-component-name": vueComponentName
};
