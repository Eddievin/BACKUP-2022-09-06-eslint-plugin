import { consistentSuboptionsId } from "./consistent-suboptions-id";
import { noUnnecessaryArray } from "./no-unnecessary-array";
import { o } from "@skylib/functions";
import { sortArray } from "./sort-array";
import { sortSuboptions } from "./sort-suboptions";

export const eslintrc = o.prefixKeys(
  {
    "consistent-suboptions-id": consistentSuboptionsId,
    "no-unnecessary-array": noUnnecessaryArray,
    "sort-array": sortArray,
    "sort-suboptions": sortSuboptions
  },
  "eslintrc/"
);
