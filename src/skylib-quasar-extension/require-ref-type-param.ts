import * as utils from "../utils";
import { misc } from "../misc";

export const requireRefTypeParam = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: "Missing type parameter",
    selector:
      "CallExpression[typeParameters=undefined][arguments.length=0] > Identifier.callee[name=ref]"
  }
]);
