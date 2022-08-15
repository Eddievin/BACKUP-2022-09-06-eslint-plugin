import { o } from "@skylib/functions";
import { sortArray } from "./sort-array";
import { sortSuboptions } from "./sort-suboptions";

export const eslintrc = o.prefixKeys(
  { "sort-array": sortArray, "sort-suboptions": sortSuboptions },
  "eslintrc/"
);
