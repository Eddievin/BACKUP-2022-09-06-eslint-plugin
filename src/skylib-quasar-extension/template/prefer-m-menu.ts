import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferMMenu = utils.wrapRule(misc["no-restricted-syntax"], [
  { message: 'Prefer "m-menu" component', selector: "VElement[name=q-menu]" }
]);
