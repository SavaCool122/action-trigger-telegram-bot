import { getAria } from "../../lib/message-filtering/get-aria";
import { it, expect, describe } from "vitest";

describe("getAria", () => {
  it("return correct value for valid aria", () => {
    const FAKE_ARIA = "FAKE_ARIA";
    const TEST_DATA = `FAKE_TEXT#${FAKE_ARIA}`;

    const aria = getAria(TEST_DATA);

    expect(aria).equal(FAKE_ARIA);
  });

  it("return UNKNOWN value for invalid aria", () => {
    const INVALID_DATA = "INVALID_DATA";

    const aria = getAria(INVALID_DATA);

    expect(aria).equal("UNKNOWN");
  });

  it("return UNKNOWN value for empty aria", () => {
    const INVALID_DATA = "INVALID_DATA#";

    const aria = getAria(INVALID_DATA);

    expect(aria).equal("UNKNOWN");
  });
});
