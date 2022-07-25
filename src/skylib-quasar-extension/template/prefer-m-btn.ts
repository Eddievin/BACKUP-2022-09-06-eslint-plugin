import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferMBtn = utils.wrapRule(misc["restrict-syntax"], [
  { message: 'Prefer "m-btn" component', selector: "VElement[name=q-btn]" }
]);
