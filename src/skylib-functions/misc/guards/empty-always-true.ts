import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const emptyAlwaysTrue = utils.wrapRule(
  typescript["typescript/no-restricted-syntax"],
  [
    {
      message: "Always true",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=empty] > .arguments:first-child",
      typeIsOneOf: [utils.TypeGroup.null, utils.TypeGroup.undefined]
    }
  ]
);
