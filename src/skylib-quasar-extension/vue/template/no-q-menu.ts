import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQMenu = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "m-menu" component instead',
    selector: "VElement[name=q-menu]"
  }
]);
