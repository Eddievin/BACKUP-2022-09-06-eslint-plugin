import * as utils from "../utils";
import { core } from "./core";

export const noComplexReturnType = utils.wrapRule(
  core["no-restricted-syntax"],
  [
    {
      checkReturnType: true,
      message: "Avoid complex return type",
      selector:
        ":not(MethodDefinition[kind=constructor]) > :matches(:function, TSDeclareFunction, TSFunctionType, TSMethodSignature)[returnType=undefined]",
      typeIs: utils.TypeGroup.complex
    }
  ]
);
