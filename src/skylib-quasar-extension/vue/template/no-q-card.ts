import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQCard = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "m-card" component instead',
    selector: "VElement[name=q-card]"
  }
]);
