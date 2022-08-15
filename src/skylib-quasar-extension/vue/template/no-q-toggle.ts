import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQToggle = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "m-toggle" component instead',
    selector: "VElement[name=q-toggle]"
  }
]);
