import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const symbolAlwaysTrue = utils.wrapRule(
  typescript["no-restricted-syntax"],
  [
    {
      message: "Unnecessary type guard",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:symbol|symbolU)$/u] > .arguments:first-child",
      typeIs: utils.TypeGroup.symbol
    }
  ]
);
