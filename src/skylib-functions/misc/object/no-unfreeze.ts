import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noUnfreeze = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Using "o.unfreeze" is unsafe',
    selector: "CallExpression > .callee[object.name=o][property.name=unfreeze]"
  }
]);
