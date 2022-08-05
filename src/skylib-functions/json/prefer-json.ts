import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferJson = utils.wrapRule(misc["no-restricted-syntax"], [
  { message: 'Prefer "json" module', selector: "Identifier[name=JSON]" }
]);
