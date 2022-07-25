import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferJson = utils.wrapRule(misc["restrict-syntax"], [
  { message: 'Prefer "json" module', selector: "Identifier[name=JSON]" }
]);
