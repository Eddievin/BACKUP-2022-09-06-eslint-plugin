import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferMExpansionItem = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: 'Prefer "m-expansion-item" component',
    selector: "VElement[name=q-expansion-item]"
  }
]);
