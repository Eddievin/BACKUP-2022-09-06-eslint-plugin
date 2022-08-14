import * as utils from "../utils";
import { core } from "./core";

export const classOnlyExport = utils.wrapRule(core["prefer-only-export"], [
  { selector: "Program > ExportNamedDeclaration > ClassDeclaration" }
]);
