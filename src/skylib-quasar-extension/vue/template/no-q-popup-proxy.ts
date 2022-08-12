import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQPopupProxy = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Prefer "m-popup-proxy" component',
    selector: "VElement[name=q-popup-proxy]"
  }
]);
