import type { strings } from "@skylib/functions";

export enum MessageId {
  incorrectSortingOrder = "incorrectSortingOrder",
  incorrectSortingOrderId = "incorrectSortingOrderId"
}

export interface Options {
  readonly _id?: string;
  readonly customOrder?: strings;
  readonly sendToBottom?: string;
  readonly sendToTop?: string;
}
