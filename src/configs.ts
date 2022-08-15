import type { IndexedRecord } from "@skylib/functions";
import { eslintrc } from "./eslintrc";
import { jest } from "./jest";
import { misc } from "./misc";
import { o } from "@skylib/functions";
import { skylibConfig } from "./skylib-config";
import { skylibFacades } from "./skylib-facades";
import { skylibFramework } from "./skylib-framework";
import { skylibFunctions } from "./skylib-functions";
import { skylibQuasarExtension } from "./skylib-quasar-extension";
import { typescript } from "./typescript";
import { vue } from "./vue";

export const configs = {
  "all": {
    plugins: ["@skylib/eslint-plugin"],
    rules: {
      ...rules(misc),
      "@skylib/match-filename": "off",
      "@skylib/no-restricted-syntax": "off",
      "@skylib/require-syntax": "off",
      "@skylib/wrap": "off"
    }
  },
  "config": { plugins: ["@skylib/eslint-plugin"], rules: rules(skylibConfig) },
  "eslintrc": { plugins: ["@skylib/eslint-plugin"], rules: rules(eslintrc) },
  "facades": {
    plugins: ["@skylib/eslint-plugin"],
    rules: rules(skylibFacades)
  },
  "framework": {
    plugins: ["@skylib/eslint-plugin"],
    rules: rules(skylibFramework)
  },
  "functions": {
    overrides: [{ files: "./tests/**", rules: rules(skylibFunctions.jest) }],
    plugins: ["@skylib/eslint-plugin"],
    rules: rules(skylibFunctions.misc)
  },
  "functions/jest": {
    plugins: ["@skylib/eslint-plugin"],
    rules: rules(skylibFunctions.jest)
  },
  "functions/misc": {
    plugins: ["@skylib/eslint-plugin"],
    rules: rules(skylibFunctions.misc)
  },
  "jest": { plugins: ["@skylib/eslint-plugin"], rules: rules(jest) },
  "quasar-extension": {
    overrides: [
      { files: "*.extras", rules: rules(skylibQuasarExtension.extras) },
      { files: "*.vue", rules: rules(skylibQuasarExtension.vue) },
      { files: "./tests/**", rules: rules(skylibQuasarExtension.jest) }
    ],
    plugins: ["@skylib/eslint-plugin"],
    rules: rules(skylibQuasarExtension.misc)
  },
  "quasar-extension/extras": {
    plugins: ["@skylib/eslint-plugin"],
    rules: rules(skylibQuasarExtension.extras)
  },
  "quasar-extension/jest": {
    plugins: ["@skylib/eslint-plugin"],
    rules: rules(skylibQuasarExtension.jest)
  },
  "quasar-extension/misc": {
    plugins: ["@skylib/eslint-plugin"],
    rules: rules(skylibQuasarExtension.misc)
  },
  "quasar-extension/vue": {
    plugins: ["@skylib/eslint-plugin"],
    rules: rules(skylibQuasarExtension.vue)
  },
  "typescript": {
    plugins: ["@skylib/eslint-plugin"],
    rules: {
      ...rules(typescript),
      "@skylib/typescript/no-restricted-syntax": "off"
    }
  },
  "vue": {
    plugins: ["@skylib/eslint-plugin"],
    rules: {
      ...rules(vue),
      "@skylib/typescript/no-complex-declarator-type": "off",
      "@skylib/typescript/no-complex-return-type": "off"
    }
  }
} as const;

/**
 * Converts rules to configuration.
 *
 * @param source - Rules.
 * @returns Configuration.
 */
function rules(source: IndexedRecord): object {
  return o.fromEntries(o.keys(source).map(key => [`@skylib/${key}`, "warn"]));
}
