import * as utils from "../utils";
import { core } from "./core";

// eslint-disable-next-line @skylib/max-identifier-blocks -- Ok
export const defineFunctionInOneStatement = utils.wrapRule(
  core["no-restricted-syntax"],
  [
    {
      message:
        'Use "Object.assign" to define function properties in one statement',
      selector:
        "AssignmentExpression > MemberExpression.left > Identifier.object",
      typeIs: utils.TypeGroup.function
    }
  ]
);
