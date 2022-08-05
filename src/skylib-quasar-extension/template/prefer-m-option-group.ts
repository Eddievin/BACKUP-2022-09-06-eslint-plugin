import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferMOptionGroup = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Prefer "m-option-group" component',
    selector: "VElement[name=q-option-group]"
  }
]);
