import * as utils from "../utils";
import { core } from "./core";

export const noUnnecessaryAsConst = utils.wrapRule(
  core["no-restricted-syntax"],
  [
    {
      message: 'Unnecessary "as const"',
      selector: [
        "VariableDeclarator > TSAsExpression[expression.properties.length=0] > TSTypeReference > Identifier[name=const]",
        "VariableDeclarator[id.typeAnnotation] > TSAsExpression > TSTypeReference > Identifier[name=const]"
      ]
    }
  ]
);
