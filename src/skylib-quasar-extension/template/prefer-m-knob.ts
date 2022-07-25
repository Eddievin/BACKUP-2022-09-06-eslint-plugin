import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferMKnob = utils.wrapRule(misc["restrict-syntax"], [
  { message: 'Prefer "m-knob" component', selector: "VElement[name=q-knob]" }
]);
