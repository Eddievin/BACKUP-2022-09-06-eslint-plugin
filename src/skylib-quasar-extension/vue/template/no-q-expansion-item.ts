import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQExpansionItem = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Use "m-expansion-item" component instead',
    selector: "VElement[name=q-expansion-item]"
  }
]);
