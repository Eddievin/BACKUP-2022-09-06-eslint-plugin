import * as utils from "../utils";
import { core } from "./core";

export const noComplexDeclaratorType = utils.wrapRule(core["restrict-syntax"], [
  {
    message: "Avoid complex declarator type",
    selector: [
      "VariableDeclarator:not([init.type=TSAsExpression][init.typeAnnotation.typeName.name=const]) > ArrayPattern > Identifier",
      "VariableDeclarator:not([init.type=TSAsExpression][init.typeAnnotation.typeName.name=const]) > Identifier.id[typeAnnotation=undefined]",
      "VariableDeclarator:not([init.type=TSAsExpression][init.typeAnnotation.typeName.name=const]) > ObjectPattern > Property > Identifier.value"
    ],
    typeIs: utils.TypeGroup.complex
  }
]);
