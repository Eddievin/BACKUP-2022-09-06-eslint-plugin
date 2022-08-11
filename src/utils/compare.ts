// eslint-disable-next-line @skylib/disallow-import -- Postponed
import naturalCompare from "natural-compare";

/**
 * Compares two strings.
 *
 * @param x - Value 1.
 * @param y - Value 2.
 * @returns Comparison result.
 */
export function compare(x: string, y: string): -1 | 0 | 1 {
  return naturalCompare(x, y);
}
