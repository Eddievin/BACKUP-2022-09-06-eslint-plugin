import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQExpansionItem = utils.wrapRule(
  misc["no-restricted-syntax"],
  [
    {
      message: 'Prefer "m-expansion-item" component',
      selector: "VElement[name=q-expansion-item]"
    }
  ]
);
