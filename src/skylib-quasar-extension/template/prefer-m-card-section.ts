import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferMCardSection = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Prefer "m-card-section" component',
    selector: "VElement[name=q-card-section]"
  }
]);
