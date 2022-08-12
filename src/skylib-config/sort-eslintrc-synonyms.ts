import * as utils from "../utils";
import { misc } from "../misc";

export const sortEslintrcSynonyms = utils.wrapRule(misc["sort-array"], [
  { triggerByComment: false }
]);
