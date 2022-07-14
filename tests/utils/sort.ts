import { sort } from "@/rules/utils/sort";

test("MessageId", () => {
  const expected = {
    incorrectSortingOrder: "incorrectSortingOrder",
    incorrectSortingOrderId: "incorrectSortingOrderId"
  } as const;

  expect(sort).toBeDefined();
  expect(expected).toStrictEqual(expected);
});
