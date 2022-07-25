import * as utils from "../utils";
import { misc } from "../misc";

export const requirePropTypeParam = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: "Missing type parameter",
    selector: [
      "CallExpression[arguments.length=0][typeParameters=undefined] > Identifier.callee[name=prop]",
      "CallExpression[arguments.length=0][typeParameters=undefined] > MemberExpression.callee[object.name=prop][property.name=required]",
      "CallExpression[arguments.length=1][typeParameters=undefined] > MemberExpression.callee[object.name=prop][property.name=default]"
    ]
  }
]);
