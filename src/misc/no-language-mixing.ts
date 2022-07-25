import * as utils from "../utils";
import { core } from "./core";
import { evaluate } from "@skylib/functions";

// eslint-disable-next-line no-warning-comments -- Wait for @skylib/config
// fixme
export const noLanguageMixing = evaluate(() => {
  const eng = "\\w";

  const int = "[^\\u0000-\\u00FF]";

  const sep = "[\\d_]*";

  const re = `/${eng}${sep}${int}|${int}${sep}${eng}/u`;

  return utils.wrapRule(core["restrict-syntax"], [
    {
      message: "No language mixing",
      selector: [`Literal[value=${re}]`, `TemplateLiteral[value.raw=${re}]`]
    }
  ]);
});
