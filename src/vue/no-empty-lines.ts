import * as utils from "../utils";
import { misc } from "../misc";

export const noEmptyLines = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: "Unexpected empty line",
    selector: "VElement[name=template] VText[value=/^\\n\\s*\\n/u]"
  }
]);
