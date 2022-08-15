import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQForm = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "m-form" component instead',
    selector: "VElement[name=q-form]"
  }
]);
