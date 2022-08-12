import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQInput = utils.wrapRule(misc["no-restricted-syntax"], [
  { message: 'Prefer "m-input" component', selector: "VElement[name=q-input]" }
]);
