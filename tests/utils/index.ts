import * as utils from "@/utils";

test.each(["fixtures/corrupted.json", "fixtures/missing.json"])(
  "getPackage",
  path => {
    expect(utils.getPackage(path)).toStrictEqual({});
  }
);
