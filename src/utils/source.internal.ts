import type { TSESTree } from "@typescript-eslint/utils";

export enum Type {
  export = "export",
  import = "import"
}

// eslint-disable-next-line @skylib/require-jsdoc -- Postponed
export interface Callback {
  (ctx: Ctx): void;
}

export interface Ctx {
  readonly node: TSESTree.Node;
  readonly source: string;
  readonly type: Type;
}
