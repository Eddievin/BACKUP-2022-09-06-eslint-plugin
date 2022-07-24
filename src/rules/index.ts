import * as utils from "./utils";
import type { WritableIndexedObject } from "@skylib/functions";
import { arrayCallbackReturnType } from "./array-callback-return-type";
import { commentEmptyLines } from "./comment-empty-lines";
import { consistentEmptyLines } from "./consistent-empty-lines";
import { consistentEnumMember } from "./consistent-enum-member";
import { consistentFilename } from "./consistent-filename";
import { consistentGroupEmptyLines } from "./consistent-group-empty-lines";
import { consistentImport } from "./consistent-import";
import { consistentOptionalProps } from "./consistent-optional-props";
import { custom } from "./custom";
import { disallowImport } from "./disallow-import";
import { evaluate } from "@skylib/functions";
import { exhaustiveSwitch } from "./exhaustive-switch";
import { exportAllName } from "./export-all-name";
import fs from "node:fs";
import { matchFilename } from "./match-filename";
import { noExpressionEmptyLines } from "./no-expression-empty-lines";
import { noInferrableTypes } from "./no-inferrable-types";
import { noMultiTypeTuples } from "./no-multi-type-tuples";
import { noSelfImport } from "./no-self-import";
import { noSiblingImport } from "./no-sibling-import";
import { noUnsafeObjectAssignment } from "./no-unsafe-object-assignment";
import { objectFormat } from "./object-format";
import { onlyExportName } from "./only-export-name";
import { preferOnlyExport } from "./prefer-only-export";
import { requireJsdoc } from "./require-jsdoc";
import { sortArray } from "./sort-array";
import { sortClassMembers } from "./sort-class-members";
import { sortKeys } from "./sort-keys";
import { statementsOrder } from "./statements-order";
import { switchCaseEmptyLines } from "./switch-case-empty-lines";
import { templateLiteralFormat } from "./template-literal-format";
import { vueElementContentsSpacing } from "./vue-element-contents-spacing";
import { wrap } from "./wrap";

export * as utils from "./utils";

// eslint-disable-next-line @skylib/custom/no-complex-type-in-function-return, @skylib/custom/no-complex-type-in-variable-declaration -- Postponed
export const rules = evaluate(() => {
  const core = {
    "array-callback-return-type": arrayCallbackReturnType,
    "comment-empty-lines": commentEmptyLines,
    "consistent-empty-lines": consistentEmptyLines,
    "consistent-enum-member": consistentEnumMember,
    "consistent-filename": consistentFilename,
    "consistent-group-empty-lines": consistentGroupEmptyLines,
    "consistent-import": consistentImport,
    "consistent-optional-props": consistentOptionalProps,
    // eslint-disable-next-line object-shorthand -- Ok
    "custom": custom,
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
    "sort-array": sortArray,
    "sort-class-members": sortClassMembers,
    "sort-keys": sortKeys,
    "statements-order": statementsOrder,
    "switch-case-empty-lines": switchCaseEmptyLines,
    "template-literal-format": templateLiteralFormat,
    "vue-element-contents-spacing": vueElementContentsSpacing,
    // eslint-disable-next-line object-shorthand -- Ok
    "wrap": wrap
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
