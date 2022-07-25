import * as utils from "../../utils";
import { misc } from "../../misc";

export const noGlobalLang = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: "No global lang",
    selector:
      "ImportDeclaration[source.value=@skylib/facades] > ImportSpecifier[imported.name=lang]"
  }
]);
