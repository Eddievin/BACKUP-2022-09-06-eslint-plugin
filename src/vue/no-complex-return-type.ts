import * as utils from "../utils";
import { typescript } from "../typescript";

export const noComplexReturnType = utils.wrapRule(
  typescript["typescript/no-restricted-syntax"],
  [
    {
      checkReturnType: true,
      message: "Avoid complex return type",
      selector:
        ":not(MethodDefinition[kind=constructor], Property[key.name=setup]) > :matches(:function, TSDeclareFunction, TSFunctionType, TSMethodSignature)[returnType=undefined]",
      typeIs: utils.TypeGroup.complex
    }
  ]
);
