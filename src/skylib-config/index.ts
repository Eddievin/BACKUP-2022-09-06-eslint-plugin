import * as utils from "../utils";
import { eslintrcNoDisable } from "./eslintrc-no-disable";
import { eslintrcNoRules } from "./eslintrc-no-rules";
import { eslintrcNoTemp } from "./eslintrc-no-temp";
import { prettier } from "./prettier";
import { sortCommitlint } from "./sort-commitlint";
import { sortEslintrcSynonyms } from "./sort-eslintrc-synonyms";

export const skylibConfig = utils.prefixKeys("config/", {
  "eslintrc-no-disable": eslintrcNoDisable,
  "eslintrc-no-rules": eslintrcNoRules,
  "eslintrc-no-temp": eslintrcNoTemp,
  prettier,
  "sort-commitlint": sortCommitlint,
  "sort-eslintrc-synonyms": sortEslintrcSynonyms
});
