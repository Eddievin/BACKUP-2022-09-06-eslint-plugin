import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noGlobalIcons = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: "No global icons",
    selector:
      "ImportDeclaration[importKind=value][source.value=@skylib/facades] > ImportSpecifier[imported.name=icons]"
  }
]);
