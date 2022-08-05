import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferMSelect = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Prefer "m-select" component',
    selector: "VElement[name=q-select]"
  }
]);
