import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQField = utils.wrapRule(misc["no-restricted-syntax"], [
  { message: 'Prefer "m-field" component', selector: "VElement[name=q-field]" }
]);
