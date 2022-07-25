import * as utils from "../utils";
import { core } from "./core";

export const preferArrowStaticMethod = utils.wrapRule(core["restrict-syntax"], [
  {
    message: "Prefer arrow function",
    selector: `:matches(${utils.selectors.method})[static=true]`
  }
]);
