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
import type { IndexedObject } from "@skylib/functions";
import { o } from "@skylib/functions";

export const configs = {
  "all": {
    plugins: ["@skylib/eslint-plugin"],
    rules: {
      ...rules(misc),
      "@skylib/disallow-import": "off",
      "@skylib/match-filename": "off",
      "@skylib/require-syntax": "off",
      "@skylib/restrict-syntax": "off",
      "@skylib/sort-array": "off",
      "@skylib/wrap": "off"
    }
  },
  "eslintrc": { plugins: ["@skylib/eslint-plugin"], rules: rules(eslintrc) },
  "jest": { plugins: ["@skylib/eslint-plugin"], rules: rules(jest) },
  "skylib-config": {
    plugins: ["@skylib/eslint-plugin"],
    rules: rules(skylibConfig)
  },
  "skylib-facades": {
    plugins: ["@skylib/eslint-plugin"],
    rules: rules(skylibFacades)
  },
  "skylib-functions": {
    plugins: ["@skylib/eslint-plugin"],
    rules: rules(skylibFunctions)
  },
  "skylib-quasar-extension": {
    plugins: ["@skylib/eslint-plugin"],
    rules: rules(skylibQuasarExtension)
  },
  "typescript": {
    plugins: ["@skylib/eslint-plugin"],
    rules: { ...rules(typescript), "@skylib/typescript/restrict-syntax": "off" }
  },
  "vue": {
    plugins: ["@skylib/eslint-plugin"],
    rules: {
      ...rules(vue),
      "@skylib/typescript/no-complex-return-type": "off"
    }
  }
} as const;

// eslint-disable-next-line @skylib/require-jsdoc -- Postponed
function rules(source: IndexedObject): object {
  return o.fromEntries(o.keys(source).map(key => [`@skylib/${key}`, "warn"]));
}
