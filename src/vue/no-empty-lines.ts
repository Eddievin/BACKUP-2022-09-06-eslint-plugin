import * as utils from "../utils";
import { misc } from "../misc";

export const noEmptyLines = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: "Unexpected empty line",
    selector: "VElement[name=template] VText[value=/^\\s*\\n\\s*\\n\\s*$/u]"
  }
]);
