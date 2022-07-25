import * as utils from "../rules/utils";
import { disallowImport } from "../rules/disallow-import";

export { MessageId } from "../rules/disallow-import";

export const noRelativeParentImports = utils.wrapRule(disallowImport, [
  {
    disallow: [
      "../**",
      "../../**",
      "../../../**",
      "../../../../**",
      "../../../../../**"
    ]
  }
]);
