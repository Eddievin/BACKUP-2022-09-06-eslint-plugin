import * as utils from "../utils";
import { core } from "./core";

export const noNegatedConditions = utils.wrapRule(
  core["no-restricted-syntax"],
  [
    {
      message: "No negated condition",
      selector: [
        'IfStatement > BinaryExpression[operator="!=="]',
        'IfStatement > LogicalExpression > BinaryExpression.left[operator="!=="]',
        'IfStatement > LogicalExpression > UnaryExpression.left[operator="!"]',
        'IfStatement > UnaryExpression[operator="!"]'
      ]
    }
  ]
);
