import * as utils from "../../utils";
import { misc } from "../../misc";

export const sortSynonyms = utils.wrapRule(misc["sort-array"], [
  { triggerByComment: false }
]);
