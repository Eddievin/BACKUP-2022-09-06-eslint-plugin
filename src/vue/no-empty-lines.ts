import * as utils from "../utils";
import { misc } from "../misc";

export const noEmptyLines = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: "Unexpected empty line",
    selector: "VElement[name=template] VText[value=/^\\n\\s*\\n/u]"
  }
]);
