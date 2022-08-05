import * as utils from "../utils";
import { core } from "./core";

export const noUnnecessaryInitialization = utils.wrapRule(
  core["no-restricted-syntax"],
  [
    {
      message: "Unnecessary initialization",
      selector: [
        "PropertyDefinition > Identifier.value[name=undefined]",
        "VariableDeclarator > Identifier.init[name=undefined]"
      ]
    }
  ]
);
