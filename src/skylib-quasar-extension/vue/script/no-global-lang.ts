import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noGlobalLang = utils.wrapRule(misc["no-restricted-syntax"], [
  {
    message: "No global lang",
    selector:
      "ImportDeclaration[importKind=value][source.value=@skylib/facades] > ImportSpecifier[imported.name=lang]"
  }
]);
