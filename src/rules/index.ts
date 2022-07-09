import type { WritableIndexedObject } from "@skylib/functions";
import { arrayCallbackReturnType } from "./array-callback-return-type";
import { classMemberTypedef } from "./class-member-typedef";
import { className } from "./class-name";
import { classOnlyExport } from "./class-only-export";
import { consistentEmptyLines } from "./consistent-empty-lines";
import { consistentFilename } from "./consistent-filename";
import { consistentGroupEmptyLines } from "./consistent-group-empty-lines";
import { consistentImport } from "./consistent-import";
import { custom } from "./custom";
import { disallowImport } from "./disallow-import";
import { emptyLinesAroundComment } from "./empty-lines-around-comment";
import { evaluate } from "@skylib/functions";
import { exhaustiveSwitch } from "./exhaustive-switch";
import { exportAllName } from "./export-all-name";
import fs from "node:fs";
import { getSynonyms } from "./utils";
import { noExpressionEmptyLine } from "./no-expression-empty-line";
import { noInferrableTypes } from "./no-inferrable-types";
import { noMultiTypeTuples } from "./no-multi-type-tuples";
import { noNegatedCondition } from "./no-negated-condition";
import { noSelfImport } from "./no-self-import";
import { noUnsafeObjectAssignment } from "./no-unsafe-object-assignment";
import { noUnusedImport } from "./no-unused-import";
import { objectFormat } from "./object-format";
import { onlyExportName } from "./only-export-name";
import { optionalPropertyStyle } from "./optional-property-style";
import { preferAliasForArrayTypes } from "./prefer-alias-for-array-types";
import { preferTsToolbelt } from "./prefer-ts-toolbelt";
import { primaryExportOnly } from "./primary-export-only";
import { requireJsdoc } from "./require-jsdoc";
import { sortArray } from "./sort-array";
import { sortClassMembers } from "./sort-class-members";
import { sortKeys } from "./sort-keys";
import { statementsOrder } from "./statements-order";
import { switchCaseEmptyLines } from "./switch-case-empty-lines";
import { templateLiteralFormat } from "./template-literal-format";
import { vueComponentName } from "./vue-component-name";

export * as utils from "./utils";

// eslint-disable-next-line @skylib/custom/no-complex-type-in-function-return, @skylib/custom/no-complex-type-in-variable-declaration
export const rules = evaluate(() => {
  const core = {
    "array-callback-return-type": arrayCallbackReturnType,
    "class-member-typedef": classMemberTypedef,
    "class-name": className,
    "class-only-export": classOnlyExport,
    "consistent-empty-lines": consistentEmptyLines,
    "consistent-filename": consistentFilename,
    "consistent-group-empty-lines": consistentGroupEmptyLines,
    "consistent-import": consistentImport,
    // eslint-disable-next-line object-shorthand -- Ok
    "custom": custom,
    "disallow-import": disallowImport,
    "empty-lines-around-comment": emptyLinesAroundComment,
    "exhaustive-switch": exhaustiveSwitch,
    "export-all-name": exportAllName,
    "no-expression-empty-line": noExpressionEmptyLine,
    "no-inferrable-types": noInferrableTypes,
    "no-multi-type-tuples": noMultiTypeTuples,
    "no-negated-condition": noNegatedCondition,
    "no-self-import": noSelfImport,
    "no-unsafe-object-assignment": noUnsafeObjectAssignment,
    "no-unused-import": noUnusedImport,
    "object-format": objectFormat,
    "only-export-name": onlyExportName,
    "optional-property-style": optionalPropertyStyle,
    "prefer-alias-for-array-types": preferAliasForArrayTypes,
    "prefer-ts-toolbelt": preferTsToolbelt,
    "primary-export-only": primaryExportOnly,
    "require-jsdoc": requireJsdoc,
    "sort-array": sortArray,
    "sort-class-members": sortClassMembers,
    "sort-keys": sortKeys,
    "statements-order": statementsOrder,
    "switch-case-empty-lines": switchCaseEmptyLines,
    "template-literal-format": templateLiteralFormat,
    "vue-component-name": vueComponentName
  } as const;

  const synonyms: WritableIndexedObject = {};

  getSynonyms(synonyms, "./.eslintrc.synonyms.js", core);

  if (fs.existsSync("./node_modules/@skylib"))
    for (const pkg of fs.readdirSync("./node_modules/@skylib"))
      for (const folder of ["configs", "src"])
        getSynonyms(
          synonyms,
          `./node_modules/@skylib/${pkg}/${folder}/eslintrc.synonyms.js`,
          core
        );

  return { ...core, ...synonyms };
});
