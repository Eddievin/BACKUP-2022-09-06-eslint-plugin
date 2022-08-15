import * as utils from "../utils";
import { core } from "./core";
import { evaluate } from "@skylib/functions";

export const noLanguageMixing = evaluate(() => {
  const br = "[\\d_]*";

  const eng = "\\w";

  const international = "[^\\u0000-\\u00FF]";

  const re = `/${eng}${br}${international}|${international}${br}${eng}/u`;

  return utils.wrapRule(core["no-restricted-syntax"], [
    {
      message: "No language mixing",
      selector: [`Literal[value=${re}]`, `TemplateLiteral[value.raw=${re}]`]
    }
  ]);
});
