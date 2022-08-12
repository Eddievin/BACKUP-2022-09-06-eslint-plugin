import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQCard = utils.wrapRule(misc["no-restricted-syntax"], [
  { message: 'Prefer "m-card" component', selector: "VElement[name=q-card]" }
]);
