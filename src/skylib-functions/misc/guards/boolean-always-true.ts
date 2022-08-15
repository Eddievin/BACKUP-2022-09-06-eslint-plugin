import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const booleanAlwaysTrue = utils.wrapRule(
  typescript["typescript/no-restricted-syntax"],
  [
    {
      message: "Always true",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:boolean|booleanU)$/u] > .arguments:first-child",
      typeIs: utils.TypeGroup.boolean
    }
  ]
);
