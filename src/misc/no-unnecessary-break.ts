import * as utils from "../utils";
import { core } from "./core";

export const noUnnecessaryBreak = utils.wrapRule(core["no-restricted-syntax"], [
  {
    message: 'Unnecessary "break" statement',
    selector: "SwitchCase:last-child > BreakStatement.consequent"
  }
]);
