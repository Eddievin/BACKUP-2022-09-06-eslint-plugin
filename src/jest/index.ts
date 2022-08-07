import * as utils from "../utils";
import { noToThrowLiteral } from "./no-toThrow-literal";
import { preferToBe } from "./prefer-toBe";
import { preferToStrictEqual } from "./prefer-toStrictEqual";

export const jest = utils.prefixKeys("jest/", {
  "no-toThrow-literal": noToThrowLiteral,
  "prefer-toBe": preferToBe,
  "prefer-toStrictEqual": preferToStrictEqual
});
