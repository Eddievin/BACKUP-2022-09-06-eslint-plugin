import * as utils from "./utils";
import { eslintrc } from "./eslintrc";
import { jest } from "./jest";
import { misc } from "./misc";
import { skylibConfig } from "./skylib-config";
import { skylibFacades } from "./skylib-facades";
import { skylibFramework } from "./skylib-framework";
import { skylibFunctions } from "./skylib-functions";
import { skylibQuasarExtension } from "./skylib-quasar-extension";
import { typescript } from "./typescript";
import { vue } from "./vue";

const core = {
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

// eslint-disable-next-line @skylib/typescript/no-complex-declarator-type -- Ok
export const rules = {
  ...core,
  ...utils.getSynonyms("./.eslintrc.synonyms.js", core)
};
