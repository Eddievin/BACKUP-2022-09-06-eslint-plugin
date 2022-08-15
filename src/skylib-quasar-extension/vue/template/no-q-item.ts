import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQItem = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "m-item" component instead',
    selector: "VElement[name=q-item]"
  }
]);
