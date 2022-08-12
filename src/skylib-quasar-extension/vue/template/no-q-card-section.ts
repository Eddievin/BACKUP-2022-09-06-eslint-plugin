import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQCardSection = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Prefer "m-card-section" component',
    selector: "VElement[name=q-card-section]"
  }
]);
