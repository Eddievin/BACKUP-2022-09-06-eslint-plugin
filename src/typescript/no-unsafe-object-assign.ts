import * as utils from "../utils";
import { core } from "./core";

export const noUnsafeObjectAssign = utils.wrapRule(
  core["no-restricted-syntax"],
  [
    {
      message: "Do not assign to readonly object",
      selector:
        "CallExpression[callee.object.name=Object][callee.property.name=assign] > Identifier.arguments",
      typeIs: utils.TypeGroup.readonly
    }
  ]
);
