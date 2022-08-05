import * as utils from "../utils";
import { array } from "./array";
import { cast } from "./converters";
import { guards } from "./guards";
import { json } from "./json";
import { noEvaluateTypeParam } from "./no-evaluate-type-param";
import { object } from "./object";
import { preferDefineFn } from "./prefer-defineFn";
import { preferEvaluate } from "./prefer-evaluate";
import { preferReadonlyMap } from "./prefer-ReadonlyMap";
import { preferReadonlySet } from "./prefer-ReadonlySet";
import { programFlow } from "./program-flow";
import { reflect } from "./reflect";
import { requireJsdoc } from "./require-jsdoc";
import { requireReturnInDefineFn } from "./require-return-in-defineFn";
import { testUtils } from "./test-utils";
import { types } from "./types";

export const skylibFunctions = {
  "no-evaluate-type-param": noEvaluateTypeParam,
  "prefer-ReadonlyMap": preferReadonlyMap,
  "prefer-ReadonlySet": preferReadonlySet,
  "prefer-defineFn": preferDefineFn,
  "prefer-evaluate": preferEvaluate,
  "require-jsdoc": requireJsdoc,
  "require-return-in-defineFn": requireReturnInDefineFn,
  ...utils.prefixKeys(array, "array/"),
  ...utils.prefixKeys(cast, "converters/"),
  ...utils.prefixKeys(guards, "guards/"),
  ...utils.prefixKeys(json, "json/"),
  ...utils.prefixKeys(object, "object/"),
  ...utils.prefixKeys(programFlow, "program-flow/"),
  ...utils.prefixKeys(reflect, "reflect/"),
  ...utils.prefixKeys(testUtils, "test-utils/"),
  ...utils.prefixKeys(types, "types/")
} as const;
