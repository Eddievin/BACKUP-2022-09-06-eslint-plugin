import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferMTooltip = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Prefer "m-tooltip" component',
    selector: "VElement[name=q-tooltip]"
  }
]);