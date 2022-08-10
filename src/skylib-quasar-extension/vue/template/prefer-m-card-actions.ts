import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferMCardActions = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Prefer "m-card-actions" component',
    selector: "VElement[name=q-card-actions]"
  }
]);