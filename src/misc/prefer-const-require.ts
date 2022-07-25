import * as utils from "../utils";
import { core } from "./core";

export const preferConstRequire = utils.wrapRule(core["restrict-syntax"], [
  {
    message: 'Assign "require" to const',
    selector:
      ":not(ReturnStatement, VariableDeclarator) > CallExpression > Identifier.callee[name=require]"
  }
]);
