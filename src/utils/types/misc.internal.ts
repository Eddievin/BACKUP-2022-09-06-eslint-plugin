import type { strings } from "@skylib/functions";

export interface AllowDisallowPattern {
  // eslint-disable-next-line no-warning-comments -- Wait for @skylib/functions update
  // fixme
  readonly allow: strings | string;
  readonly disallow: strings | string;
}
