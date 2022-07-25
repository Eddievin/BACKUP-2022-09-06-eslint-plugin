import { commentSpacing } from "./comment-spacing";
import { consistentEmptyLines } from "./consistent-empty-lines";
import { consistentEnumMembers } from "./consistent-enum-members";
import { consistentFilename } from "./consistent-filename";
import { consistentImport } from "./consistent-import";
import { consistentOptionalProps } from "./consistent-optional-props";
import { disallowImport } from "./disallow-import";
import { exportAllName } from "./export-all-name";
import { matchFilename } from "./match-filename";
import { noExpressionEmptyLines } from "./no-expression-empty-lines";
import { noSelfImport } from "./no-self-import";
import { noSiblingImport } from "./no-sibling-import";
import { objectFormat } from "./object-format";
import { onlyExportName } from "./only-export-name";
import { preferOnlyExport } from "./prefer-only-export";
import { requireJsdoc } from "./require-jsdoc";
import { requireSyntax } from "./require-syntax";
import { restrictSyntax } from "./restrict-syntax";
import { sortArray } from "./sort-array";
import { sortClassMembers } from "./sort-class-members";
import { sortKeys } from "./sort-keys";
import { sortStatements } from "./sort-statements";
import { switchCaseSpacing } from "./switch-case-spacing";
import { templateLiteralFormat } from "./template-literal-format";
import { wrap } from "./wrap";

export const core = {
  "comment-spacing": commentSpacing,
  "consistent-empty-lines": consistentEmptyLines,
  "consistent-enum-members": consistentEnumMembers,
  "consistent-filename": consistentFilename,
  "consistent-import": consistentImport,
  "consistent-optional-props": consistentOptionalProps,
  "disallow-import": disallowImport,
  "export-all-name": exportAllName,
  "match-filename": matchFilename,
  "no-expression-empty-lines": noExpressionEmptyLines,
  "no-self-import": noSelfImport,
  "no-sibling-import": noSiblingImport,
  "object-format": objectFormat,
  "only-export-name": onlyExportName,
  "prefer-only-export": preferOnlyExport,
  "require-jsdoc": requireJsdoc,
  "require-syntax": requireSyntax,
  "restrict-syntax": restrictSyntax,
  "sort-array": sortArray,
  "sort-class-members": sortClassMembers,
  "sort-keys": sortKeys,
  "sort-statements": sortStatements,
  "switch-case-spacing": switchCaseSpacing,
  "template-literal-format": templateLiteralFormat,
  wrap
} as const;
