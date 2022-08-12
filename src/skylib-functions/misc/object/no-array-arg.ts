import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const noArrayArg = utils.wrapRule(
  typescript["typescript/no-restricted-syntax"],
  [
    {
      message: 'Do not use "o.entries" for array type',
      selector:
        "CallExpression[callee.object.name=o][callee.property.name=/^(?:entries|keys|values)$/u] > .arguments:first-child",
      typeIs: utils.TypeGroup.array
    }
  ]
);
