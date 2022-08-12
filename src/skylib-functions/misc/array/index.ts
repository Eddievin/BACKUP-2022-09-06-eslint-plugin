import * as utils from "../../../utils";
import { fromIterableArgType } from "./fromIterable-arg-type";
import { mixedFromIncludeArray } from "./mixedFrom-include-array";
import { mixedFromIncludeNonArray } from "./mixedFrom-include-non-array";
import { preferFirst } from "./prefer-first";
import { preferFromIterable } from "./prefer-fromIterable";
import { preferReverse } from "./prefer-reverse";
import { preferSecond } from "./prefer-second";
import { preferSort } from "./prefer-sort";
import { preferThird } from "./prefer-third";
import { preferTruncate } from "./prefer-truncate";

export const array = utils.prefixKeys("array/", {
  "fromIterable-arg-type": fromIterableArgType,
  "mixedFrom-include-array": mixedFromIncludeArray,
  "mixedFrom-include-non-array": mixedFromIncludeNonArray,
  "prefer-first": preferFirst,
  "prefer-fromIterable": preferFromIterable,
  "prefer-reverse": preferReverse,
  "prefer-second": preferSecond,
  "prefer-sort": preferSort,
  "prefer-third": preferThird,
  "prefer-truncate": preferTruncate
});
