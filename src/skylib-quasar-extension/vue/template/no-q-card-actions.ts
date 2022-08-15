import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQCardActions = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "m-card-actions" component instead',
    selector: "VElement[name=q-card-actions]"
  }
]);
