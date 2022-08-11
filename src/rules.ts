import * as utils from "./utils";
import { eslintrc } from "./eslintrc";
import { evaluate } from "@skylib/functions";
import { jest } from "./jest";
import { misc } from "./misc";
import { skylibConfig } from "./skylib-config";
import { skylibFacades } from "./skylib-facades";
import { skylibFramework } from "./skylib-framework";
import { skylibFunctions } from "./skylib-functions";
import { skylibQuasarExtension } from "./skylib-quasar-extension";
import { typescript } from "./typescript";
import { vue } from "./vue";

// eslint-disable-next-line no-warning-comments -- Wait for @skylib/config update
// fixme - Remove evaluate
// eslint-disable-next-line @skylib/typescript/no-complex-return-type -- Postponed
export const rules = evaluate(() => {
  const result = {
    ...misc,
    ...eslintrc,
    ...jest,
    ...typescript,
    ...vue,
    ...skylibConfig,
    ...skylibFacades,
    ...skylibFramework,
    ...skylibFunctions.jest,
    ...skylibFunctions.misc,
    ...skylibQuasarExtension.extras,
    ...skylibQuasarExtension.jest,
    ...skylibQuasarExtension.misc,
    ...skylibQuasarExtension.vue
  } as const;

  return { ...result, ...utils.getSynonyms("./.eslintrc.synonyms.js", result) };
});
