import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQBtn = utils.wrapRule(misc["no-restricted-syntax"], [
  { message: 'Prefer "m-button" component', selector: "VElement[name=q-btn]" }
]);
