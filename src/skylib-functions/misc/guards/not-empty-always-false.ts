import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const notEmptyAlwaysFalse = utils.wrapRule(
  typescript["typescript/no-restricted-syntax"],
  [
    {
      message: "Always false",
      selector:
        "CallExpression[callee.object.object.name=/^(?:as|assert|is)$/u][callee.object.property.name=not][callee.property.name=empty] > .arguments:first-child",
      typeIsOneOf: [utils.TypeGroup.null, utils.TypeGroup.undefined]
    }
  ]
);
