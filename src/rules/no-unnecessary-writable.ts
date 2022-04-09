import * as is from "@skylib/functions/dist/guards";
import { createValidationObject } from "@skylib/functions/dist/helpers";

import { createRule } from "./utils/no-unnecessary-readonliness";

const TypeToCheckVO = createValidationObject<TypeToCheck>({
  DeepWritable: "DeepWritable",
  Writable: "Writable"
});

const isTypeToCheck = is.factory(is.enumeration, TypeToCheckVO);

export = createRule(
  isTypeToCheck,
  "allDefinitelyWritable",
  "unnecessaryWritable",
  'Unnecessary "Writable" or "DeepWritable"'
);

type TypeToCheck = "DeepWritable" | "Writable";
