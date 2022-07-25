import { preferFindQuasarComponent } from "./prefer-findQuasarComponent";
import { preferTestComponents } from "./prefer-testComponents";

export const testUtils = {
  "prefer-findQuasarComponent": preferFindQuasarComponent,
  "prefer-testComponents": preferTestComponents
} as const;
