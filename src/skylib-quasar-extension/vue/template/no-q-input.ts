import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQInput = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "m-input" component instead',
    selector: "VElement[name=q-input]"
  }
]);
