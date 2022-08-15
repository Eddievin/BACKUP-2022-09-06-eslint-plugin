import * as utils from "../utils";
import { typescript } from "../typescript";

export const noComplexDeclaratorType = utils.wrapRule(
  typescript["typescript/no-restricted-syntax"],
  [
    {
      message: "Avoid complex declarator type",
      selector: [
        "ExportDefaultDeclaration > .declaration:not(CallExpression[callee.name=defineComponent])",
        "VariableDeclarator[init.type=ArrayExpression] > Identifier.id[typeAnnotation=undefined]",
        "VariableDeclarator[init.type=ArrayExpression] > ArrayPattern > Identifier",
        "VariableDeclarator[init.type=ObjectExpression] > Identifier.id[typeAnnotation=undefined]",
        "VariableDeclarator[init.type=ObjectExpression] > ObjectPattern > Property > Identifier.value"
      ],
      typeIs: utils.TypeGroup.complex
    }
  ]
);
