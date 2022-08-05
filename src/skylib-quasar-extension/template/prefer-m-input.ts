import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferMInput = utils.wrapRule(misc["no-restricted-syntax"], [
  { message: 'Prefer "m-input" component', selector: "VElement[name=q-input]" }
]);
