import * as utils from "../utils";
import { core } from "./core";

export const noComplexDeclaratorType = utils.wrapRule(
  core["no-restricted-syntax"],
  [
    {
      message: "Avoid complex declarator type",
      selector: [
        "ExportDefaultDeclaration > .declaration",
        "VariableDeclarator[init.type=ArrayExpression] > Identifier.id[typeAnnotation=undefined]",
        "VariableDeclarator[init.type=ArrayExpression] > ArrayPattern > Identifier",
        "VariableDeclarator[init.type=ObjectExpression] > Identifier.id[typeAnnotation=undefined]",
        "VariableDeclarator[init.type=ObjectExpression] > ObjectPattern > Property > Identifier.value"
      ],
      typeIs: utils.TypeGroup.complex
    }
  ]
);
