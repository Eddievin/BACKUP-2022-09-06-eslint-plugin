import { componentName } from "./component-name";
import { core } from "./core";
import { noComplexReturnType } from "./no-complex-return-type";
import { noEmptyLines } from "./no-empty-lines";

export const vue = {
  ...core,
  "component-name": componentName,
  "no-complex-return-type": noComplexReturnType,
  "no-empty-lines": noEmptyLines
} as const;
