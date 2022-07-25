// eslint-disable-next-line @skylib/disallow-import/project -- Ok
import naturalCompare from "natural-compare";

/**
 * Compares two strings.
 *
 * @param x - Value 1.
 * @param y - Value 2.
 * @returns Comparison result.
 */
export function compare(x = "", y = ""): -1 | 0 | 1 {
  return naturalCompare(x, y);
}
