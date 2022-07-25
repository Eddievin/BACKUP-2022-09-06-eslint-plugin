import { eslintrcNoDisable } from "./eslintrc-no-disable";
import { eslintrcNoOverrides } from "./eslintrc-no-overrides";
import { eslintrcNoRules } from "./eslintrc-no-rules";
import { prettier } from "./prettier";
import { sortCommitlint } from "./sort-commitlint";
import { sortEslintrcSynonyms } from "./sort-eslintrc-synonyms";

export const skylibConfig = {
  "eslintrc-no-disable": eslintrcNoDisable,
  "eslintrc-no-overrides": eslintrcNoOverrides,
  "eslintrc-no-rules": eslintrcNoRules,
  prettier,
  "sort-commitlint": sortCommitlint,
  "sort-eslintrc-synonyms": sortEslintrcSynonyms
} as const;
