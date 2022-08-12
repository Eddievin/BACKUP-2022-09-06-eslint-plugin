import * as utils from "../utils";
import { misc } from "../misc";

export const sortCommitlint = utils.wrapRule(misc["sort-array"], [
  { triggerByComment: false }
]);
