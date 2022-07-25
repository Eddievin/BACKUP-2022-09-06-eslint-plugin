import * as utils from "./utils";
import { eslintrc as baseEslintrc } from "./eslintrc";
import { jest as baseJest } from "./jest";
import { skylibConfig as baseSkylibConfig } from "./skylib-config";
import { skylibFacades as baseSkylibFacades } from "./skylib-facades";
import { skylibFunctions as baseSkylibFunctions } from "./skylib-functions";
import { skylibQuasarExtension as baseSkylibQuasarExtension } from "./skylib-quasar-extension";
import { typescript as baseTypescript } from "./typescript";
import { vue as baseVue } from "./vue";

export { misc } from "./misc";

export const eslintrc = utils.prefixKeys(baseEslintrc, "eslintrc/");

export const jest = utils.prefixKeys(baseJest, "jest/");

export const typescript = utils.prefixKeys(baseTypescript, "typescript/");

export const vue = utils.prefixKeys(baseVue, "vue/");

export const skylibConfig = utils.prefixKeys(baseSkylibConfig, "config/");

export const skylibFacades = utils.prefixKeys(baseSkylibFacades, "facades/");

export const skylibFunctions = utils.prefixKeys(
  baseSkylibFunctions,
  "functions/"
);

export const skylibQuasarExtension = utils.prefixKeys(
  baseSkylibQuasarExtension,
  "quasar-extension/"
);
