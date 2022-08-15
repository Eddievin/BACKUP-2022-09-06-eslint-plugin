import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQOptionGroup = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "m-option-group" component instead',
    selector: "VElement[name=q-option-group]"
  }
]);
