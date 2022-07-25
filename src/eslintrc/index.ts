import { sortArray } from "./sort-array";
import { sortSuboptions } from "./sort-suboptions";

export const eslintrc = {
  "sort-array": sortArray,
  "sort-suboptions": sortSuboptions
} as const;
