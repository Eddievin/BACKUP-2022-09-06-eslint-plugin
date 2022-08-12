import * as utils from "../utils";
import { eslintrc } from "./eslintrc";
import { prettier } from "./prettier";
import { sortCommitlint } from "./sort-commitlint";

export const skylibConfig = utils.prefixKeys("config/", {
  prettier,
  "sort-commitlint": sortCommitlint,
  ...eslintrc
});
