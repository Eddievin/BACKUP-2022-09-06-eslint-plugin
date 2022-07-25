import * as utils from "../utils";
import { core } from "./core";

export const consistentSymbolDescription = utils.wrapRule(
  core["restrict-syntax"],
  [
    {
      message: "Prefer kebab-case symbol description",
      selector:
        "CallExpression[callee.name=Symbol] > Literal:not([value=/^(?:[\\d\\-a-z]|__)+$/u])"
    }
  ]
);
