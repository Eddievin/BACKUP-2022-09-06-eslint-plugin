import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const requirePropTypeParam = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: "Missing type parameter",
      selector: [
        "CallExpression[typeParameters=undefined] > Identifier.callee[name=prop]",
        "CallExpression[typeParameters=undefined] > MemberExpression.callee[object.name=prop][property.name=default]",
        "CallExpression[typeParameters=undefined] > MemberExpression.callee[object.name=prop][property.name=required]"
      ]
    }
  ]
);
