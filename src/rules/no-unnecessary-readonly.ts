import * as utils from "./utils";
import { createValidationObject, evaluate, is } from "@skylib/functions";

export const noUnnecessaryReadonly = utils.noUnnecessaryReadonliness.createRule(
  "no-unnecessary-readonly",
  evaluate(() => {
    const TypeToCheckVO = createValidationObject<TypeToCheck>({
      DeepReadonly: "DeepReadonly",
      Readonly: "Readonly"
    });

    return is.factory(is.enumeration, TypeToCheckVO);

    type TypeToCheck = "DeepReadonly" | "Readonly";
  }),
  "allDefinitelyReadonly",
  "unnecessaryReadonly",
  'Unnecessary "Readonly" or "DeepReadonly"'
);
