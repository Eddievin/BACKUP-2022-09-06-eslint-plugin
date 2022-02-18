import * as is from "@skylib/functions/dist/guards";
import { createValidationObject } from "@skylib/functions/dist/types/core";

import { createRule } from "./utils/no-unnecessary-readonliness";

type TypeToCheck = "DeepReadonly" | "Readonly";

const TypeToCheckVO = createValidationObject<TypeToCheck>({
  DeepReadonly: "DeepReadonly",
  Readonly: "Readonly"
});

const isTypeToCheck = is.factory(is.enumeration, TypeToCheckVO);

export = createRule(
  isTypeToCheck,
  "allDefinitelyReadonly",
  "unnecessaryReadonly",
  'Unnecessary "Readonly" or "DeepReadonly"'
);
