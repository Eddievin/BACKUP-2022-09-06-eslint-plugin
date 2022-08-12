import * as utils from "../../utils";
import { noDisable } from "./no-disable";
import { noRules } from "./no-rules";
import { noTemp } from "./no-temp";
import { sortSynonyms } from "./sort-synonyms";

export const eslintrc = utils.prefixKeys("eslintrc/", {
  "no-disable": noDisable,
  "no-rules": noRules,
  "no-temp": noTemp,
  "sort-synonyms": sortSynonyms
});
