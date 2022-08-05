import * as utils from "../utils";
import { misc } from "../misc";

export const requireRefTypeParam = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: "Missing type parameter",
      selector:
        "CallExpression[typeParameters=undefined][arguments.length=0] > Identifier.callee[name=ref]"
    }
  ]
);
