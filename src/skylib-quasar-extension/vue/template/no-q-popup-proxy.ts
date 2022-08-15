import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQPopupProxy = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "m-popup-proxy" component instead',
    selector: "VElement[name=q-popup-proxy]"
  }
]);
