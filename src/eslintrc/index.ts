import * as utils from "../utils";
import { sortArray } from "./sort-array";
import { sortSuboptions } from "./sort-suboptions";

export const eslintrc = utils.prefixKeys("eslintrc/", {
  "sort-array": sortArray,
  "sort-suboptions": sortSuboptions
});
