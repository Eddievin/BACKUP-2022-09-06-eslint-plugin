import { is, createValidationObject, fn } from "@skylib/functions";
import * as utils from "./utils";

export const noUnnecessaryWritable = utils.noUnnecessaryReadonliness.createRule(
  "no-unnecessary-writable",
  fn.run(() => {
    const TypeToCheckVO = createValidationObject<TypeToCheck>({
      DeepWritable: "DeepWritable",
      Writable: "Writable"
    });

    return is.factory(is.enumeration, TypeToCheckVO);

    type TypeToCheck = "DeepWritable" | "Writable";
  }),
  "allDefinitelyWritable",
  "unnecessaryWritable",
  'Unnecessary "Writable" or "DeepWritable"'
);
