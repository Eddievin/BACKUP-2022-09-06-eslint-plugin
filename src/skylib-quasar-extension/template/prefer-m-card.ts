import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferMCard = utils.wrapRule(misc["restrict-syntax"], [
  { message: 'Prefer "m-card" component', selector: "VElement[name=q-card]" }
]);
