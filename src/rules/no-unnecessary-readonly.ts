import * as is from "@skylib/functions/dist/guards";
import { createValidationObject } from "@skylib/functions/dist/helpers";

import { createRule } from "./utils/no-unnecessary-readonliness";

const TypeToCheckVO = createValidationObject<TypeToCheck>({
  DeepReadonly: "DeepReadonly",
  Readonly: "Readonly"
});

const isTypeToCheck = is.factory(is.enumeration, TypeToCheckVO);

export = createRule(
  "no-unnecessary-readonly",
  isTypeToCheck,
  "allDefinitelyReadonly",
  "unnecessaryReadonly",
  'Unnecessary "Readonly" or "DeepReadonly"'
);

type TypeToCheck = "DeepReadonly" | "Readonly";
