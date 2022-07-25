import * as utils from "./utils";
import {
  eslintrc,
  jest,
  misc,
  skylibConfig,
  skylibFacades,
  skylibFunctions,
  skylibQuasarExtension,
  typescript,
  vue
} from "./prefixed-rules";
import { evaluate } from "@skylib/functions";

// eslint-disable-next-line no-warning-comments -- Wait for @skylib/config update
// fixme - Remove evaluate
// eslint-disable-next-line @skylib/custom/no-complex-type-in-function-return, @skylib/custom/no-complex-type-in-variable-declaration -- Ok
export const rules = evaluate(() => {
  const result = {
    ...misc,
    ...eslintrc,
    ...jest,
    ...typescript,
    ...vue,
    ...skylibConfig,
    ...skylibFacades,
    ...skylibFunctions,
    ...skylibQuasarExtension
  } as const;

  return { ...result, ...utils.getSynonyms("./.eslintrc.synonyms.js", result) };
});
