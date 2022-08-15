import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferJson = utils.wrapRule(misc["no-restricted-syntax"], [
  { message: 'Use "json" module instead', selector: "Identifier[name=JSON]" }
]);
