import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const callableAlwaysTrue = utils.wrapRule(
  typescript["no-restricted-syntax"],
  [
    {
      message: "Expecting type to include function or unknown",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=callable] > .arguments:first-child",
      typeIs: utils.TypeGroup.function
    }
  ]
);
