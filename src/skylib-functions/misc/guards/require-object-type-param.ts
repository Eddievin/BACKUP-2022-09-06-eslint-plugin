import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const requireObjectTypeParam = utils.wrapRule(
  typescript["typescript/no-restricted-syntax"],
  [
    {
      message: "Missing type parameter",
      selector:
        "CallExpression[callee.object.object.name=is][callee.object.property.name=object][callee.property.name=/^(?:factory|of)$/][typeParameters=undefined]"
    }
  ]
);
