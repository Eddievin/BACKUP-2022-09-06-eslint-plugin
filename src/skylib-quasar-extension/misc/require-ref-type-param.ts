import * as utils from "../../utils";
import { misc } from "../../misc";

export const requireRefTypeParam = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: "Missing type parameter",
      selector:
        "CallExpression[arguments.length=0][typeParameters=undefined] > Identifier.callee[name=ref]"
    }
  ]
);
