import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferMInput = utils.wrapRule(misc["restrict-syntax"], [
  { message: 'Prefer "m-input" component', selector: "VElement[name=q-input]" }
]);
