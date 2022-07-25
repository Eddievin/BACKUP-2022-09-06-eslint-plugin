import { noGet } from "./no-get";
import { noSet } from "./no-set";
import { preferReflect } from "./prefer-reflect";

export const reflect = {
  "no-get": noGet,
  "no-set": noSet,
  "prefer-reflect": preferReflect
} as const;
