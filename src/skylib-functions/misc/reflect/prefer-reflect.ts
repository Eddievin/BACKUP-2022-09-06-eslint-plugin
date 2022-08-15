import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferReflect = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "reflect" module instead',
    selector: "Identifier[name=Reflect]"
  }
]);
