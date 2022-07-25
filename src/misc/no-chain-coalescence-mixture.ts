import * as utils from "../utils";
import { core } from "./core";

export const noChainCoalescenceMixture = utils.wrapRule(
  core["restrict-syntax"],
  [
    {
      message: "Do not mix chain and coalescence operators",
      selector: "LogicalExpression[operator=??][left.type=ChainExpression]"
    }
  ]
);
