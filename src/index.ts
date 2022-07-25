import {
  arrayCallbackReturnType,
  commentEmptyLines,
  consistentEmptyLines,
  consistentEnumMember,
  consistentFilename,
  consistentGroupEmptyLines,
  consistentImport,
  consistentOptionalProps,
  disallowImport,
  exhaustiveSwitch,
  exportAllName,
  matchFilename,
  noExpressionEmptyLines,
  noInferrableTypes,
  noMultiTypeTuples,
  noSelfImport,
  noSiblingImport,
  noUnsafeObjectAssignment,
  objectFormat,
  onlyExportName,
  preferOnlyExport,
  requireJsdoc,
  requireSyntax,
  sortArray,
  sortClassMembers,
  sortKeys,
  statementsOrder,
  switchCaseEmptyLines,
  templateLiteralFormat,
  utils,
  vueElementContentsSpacing,
  wrap
} from "./rules";
import type { WritableIndexedObject } from "@skylib/functions";
import { classMatchFilename } from "./wrapped-rules";
import { evaluate } from "@skylib/functions";
import fs from "node:fs";

export { utils } from "./rules";

// eslint-disable-next-line @skylib/custom/no-complex-type-in-function-return, @skylib/custom/no-complex-type-in-variable-declaration -- Postponed
export const rules = evaluate(() => {
  const core = {
    "array-callback-return-type": arrayCallbackReturnType,
    "class-match-filename": classMatchFilename,
    "comment-empty-lines": commentEmptyLines,
    "consistent-empty-lines": consistentEmptyLines,
    "consistent-enum-member": consistentEnumMember,
    "consistent-filename": consistentFilename,
    "consistent-group-empty-lines": consistentGroupEmptyLines,
    "consistent-import": consistentImport,
    "consistent-optional-props": consistentOptionalProps,
    "custom": "custom",
    "disallow-import": disallowImport,
    "exhaustive-switch": exhaustiveSwitch,
    "export-all-name": exportAllName,
    "match-filename": matchFilename,
    "no-expression-empty-lines": noExpressionEmptyLines,
    "no-inferrable-types": noInferrableTypes,
    "no-multi-type-tuples": noMultiTypeTuples,
    "no-self-import": noSelfImport,
    "no-sibling-import": noSiblingImport,
    "no-unsafe-object-assignment": noUnsafeObjectAssignment,
    "object-format": objectFormat,
    "only-export-name": onlyExportName,
    "prefer-only-export": preferOnlyExport,
    "require-jsdoc": requireJsdoc,
    "require-syntax": requireSyntax,
    "sort-array": sortArray,
    "sort-class-members": sortClassMembers,
    "sort-keys": sortKeys,
    "statements-order": statementsOrder,
    "switch-case-empty-lines": switchCaseEmptyLines,
    "template-literal-format": templateLiteralFormat,
    "vue-element-contents-spacing": vueElementContentsSpacing,
    wrap
  } as const;

  const synonyms: WritableIndexedObject = {};

  utils.getSynonyms(synonyms, "./.eslintrc.synonyms.js", core);

  if (fs.existsSync("./node_modules/@skylib"))
    for (const pkg of fs.readdirSync("./node_modules/@skylib"))
      for (const folder of ["configs", "src"])
        utils.getSynonyms(
          synonyms,
          `./node_modules/@skylib/${pkg}/${folder}/eslintrc.synonyms.js`,
          core
        );

  return { ...core, ...synonyms };
});
