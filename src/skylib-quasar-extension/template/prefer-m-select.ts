import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferMSelect = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: 'Prefer "m-select" component',
    selector: "VElement[name=q-select]"
  }
]);
