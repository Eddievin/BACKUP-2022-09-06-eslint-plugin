import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQKnob = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "m-knob" component instead',
    selector: "VElement[name=q-knob]"
  }
]);
