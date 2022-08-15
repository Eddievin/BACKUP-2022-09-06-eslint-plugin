import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const callableAlwaysTrue = utils.wrapRule(
  typescript["typescript/no-restricted-syntax"],
  [
    {
      message: "Always true",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:callable|callableU)$/u] > .arguments:first-child",
      typeIs: utils.TypeGroup.function
    }
  ]
);
