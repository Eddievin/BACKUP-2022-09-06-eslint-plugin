import { arrayCallbackReturnType } from "./array-callback-return-type";
import { exhaustiveSwitch } from "./exhaustive-switch";
import { noInferrableTypes } from "./no-inferrable-types";
import { noMultiTypeTuples } from "./no-multi-type-tuples";
import { noUnsafeObjectAssignment } from "./no-unsafe-object-assignment";
import { restrictSyntax } from "./restrict-syntax";

export const core = {
  "array-callback-return-type": arrayCallbackReturnType,
  "exhaustive-switch": exhaustiveSwitch,
  "no-inferrable-types": noInferrableTypes,
  "no-multi-type-tuples": noMultiTypeTuples,
  "no-unsafe-object-assignment": noUnsafeObjectAssignment,
  "restrict-syntax": restrictSyntax
} as const;
