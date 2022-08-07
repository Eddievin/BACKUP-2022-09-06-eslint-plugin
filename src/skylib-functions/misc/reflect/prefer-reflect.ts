import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferReflect = utils.wrapRule(misc["no-restricted-syntax"], [
  { message: 'Prefer "reflect" module', selector: "Identifier[name=Reflect]" }
]);
