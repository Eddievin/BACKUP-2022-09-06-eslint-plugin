import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferMItem = utils.wrapRule(misc["restrict-syntax"], [
  { message: 'Prefer "m-item" component', selector: "VElement[name=q-item]" }
]);
