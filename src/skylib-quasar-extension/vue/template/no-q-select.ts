import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQSelect = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "m-select" component instead',
    selector: "VElement[name=q-select]"
  }
]);
