import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferReflect = utils.wrapRule(misc["restrict-syntax"], [
  { message: 'Prefer "reflect" module', selector: "Identifier[name=Reflect]" }
]);
