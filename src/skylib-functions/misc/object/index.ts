import * as utils from "../../../utils";
import { noArrayArg } from "./no-array-arg";
import { noUnfreeze } from "./no-unfreeze";
import { preferAssign } from "./prefer-assign";
import { preferClone } from "./prefer-clone";
import { preferDefineProperty } from "./prefer-defineProperty";
import { preferEntries } from "./prefer-entries";
import { preferGetPrototypeOf } from "./prefer-getPrototypeOf";
import { preferHasOwnProp } from "./prefer-hasOwnProp";
import { preferKeys } from "./prefer-keys";
import { preferValues } from "./prefer-values";

export const object = utils.prefixKeys("object/", {
  "no-array-arg": noArrayArg,
  "no-unfreeze": noUnfreeze,
  "prefer-assign": preferAssign,
  "prefer-clone": preferClone,
  "prefer-defineProperty": preferDefineProperty,
  "prefer-entries": preferEntries,
  "prefer-getPrototypeOf": preferGetPrototypeOf,
  "prefer-hasOwnProp": preferHasOwnProp,
  "prefer-keys": preferKeys,
  "prefer-values": preferValues
});
