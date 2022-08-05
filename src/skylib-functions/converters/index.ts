import { preferNumber } from "./prefer-number";
import { preferString } from "./prefer-string";

export const cast = {
  "prefer-number": preferNumber,
  "prefer-string": preferString
} as const;
