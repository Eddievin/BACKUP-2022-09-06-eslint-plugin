import * as utils from "../utils";
import { core } from "./core";

export const noRelativeParentImport = utils.wrapRule(core["disallow-import"], [
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
