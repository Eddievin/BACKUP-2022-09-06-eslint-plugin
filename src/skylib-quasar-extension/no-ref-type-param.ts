import * as utils from "../utils";
import { misc } from "../misc";

export const noRefTypeParam = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: "Unnecessary type parameter",
    selector:
      "CallExpression[callee.name=ref][arguments.0.type=Literal] > TSTypeParameterInstantiation.typeParameters > :matches(TSBooleanKeyword, TSNumberKeyword, TSStringKeyword).params"
  }
]);
