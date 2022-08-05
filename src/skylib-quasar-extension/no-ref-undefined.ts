import * as utils from "../utils";
import { misc } from "../misc";

export const noRefUndefined = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Unnecessary "undefined"',
    selector: [
      "CallExpression[callee.name=ref] > Identifier.arguments[name=undefined]",
      "CallExpression[callee.name=ref][arguments.length=0] > TSTypeParameterInstantiation.typeParameters > TSTypeReference.params > Identifier.typeName[name=/U$/u]",
      "CallExpression[callee.name=ref][arguments.length=0] > TSTypeParameterInstantiation.typeParameters > TSUnionType.params > TSUndefinedKeyword.types"
    ]
  }
]);
