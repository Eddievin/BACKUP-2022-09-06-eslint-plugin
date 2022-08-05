import * as utils from "../utils";
import { core } from "./core";

export const noUnnecessaryAsConst = utils.wrapRule(
  core["no-restricted-syntax"],
  [
    {
      message: 'Unnecessary "as const"',
      selector:
        "VariableDeclarator[id.typeAnnotation] > TSAsExpression > TSTypeReference > Identifier[name=const]"
    }
  ]
);
