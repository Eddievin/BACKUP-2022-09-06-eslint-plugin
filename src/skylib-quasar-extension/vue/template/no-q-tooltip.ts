import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQTooltip = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "m-tooltip" component instead',
    selector: "VElement[name=q-tooltip]"
  }
]);
