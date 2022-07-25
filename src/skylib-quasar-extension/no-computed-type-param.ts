import * as utils from "../utils";
import { misc } from "../misc";

export const noComputedTypeParam = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: "Move type definition to function",
    selector:
      "CallExpression[callee.name=computed] > TSTypeParameterInstantiation"
  }
]);
