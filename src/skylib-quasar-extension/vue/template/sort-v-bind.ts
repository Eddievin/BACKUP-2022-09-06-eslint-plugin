import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const sortVBind = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: 'Move "v-bind" directive to the end',
    selector:
      "VStartTag > VAttribute:not(:last-child) > VDirectiveKey.key[argument=null] > VIdentifier.name[name=bind]"
  }
]);
