import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQBtn = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "m-button" component instead',
    selector: "VElement[name=q-btn]"
  }
]);
