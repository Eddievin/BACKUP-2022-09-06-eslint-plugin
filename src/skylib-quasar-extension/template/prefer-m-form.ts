import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferMForm = utils.wrapRule(misc["no-restricted-syntax"], [
  { message: 'Prefer "m-form" component', selector: "VElement[name=q-form]" }
]);
