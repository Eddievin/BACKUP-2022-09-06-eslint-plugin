import * as utils from "../utils";
import { misc } from "../misc";

export const noShadow = utils.wrapRule(misc.wrap, [
  {
    plugin: "@typescript-eslint/eslint-plugin",
    rule: "no-shadow",
    skipSelector: "TSEnumDeclaration *"
  }
]);
