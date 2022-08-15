import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQField = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "m-field" component instead',
    selector: "VElement[name=q-field]"
  }
]);
