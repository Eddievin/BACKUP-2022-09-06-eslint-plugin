import * as utils from "../utils";
import { extras } from "./extras";
import { noComputedTypeParam } from "./no-computed-type-param";
import { noRefTypeParam } from "./no-ref-type-param";
import { noRefUndefined } from "./no-ref-undefined";
import { requirePropTypeParam } from "./require-prop-type-param";
import { requireRefTypeParam } from "./require-ref-type-param";
import { script } from "./script";
import { template } from "./template";
import { testUtils } from "./test-utils";

export const skylibQuasarExtension = {
  "no-computed-type-param": noComputedTypeParam,
  "no-ref-type-param": noRefTypeParam,
  "no-ref-undefined": noRefUndefined,
  "require-prop-type-param": requirePropTypeParam,
  "require-ref-type-param": requireRefTypeParam,
  ...utils.prefixKeys(extras, "extras/"),
  ...utils.prefixKeys(script, "script/"),
  ...utils.prefixKeys(template, "template/"),
  ...utils.prefixKeys(testUtils, "test-utils/")
} as const;
