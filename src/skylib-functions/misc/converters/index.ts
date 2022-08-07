import * as utils from "../../../utils";
import { preferNumber } from "./prefer-number";
import { preferString } from "./prefer-string";

export const cast = utils.prefixKeys("converters/", {
  "prefer-number": preferNumber,
  "prefer-string": preferString
});
