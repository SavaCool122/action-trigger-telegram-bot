import { describe, expect, it, vi } from "vitest";
import { getSession } from "../../lib/auth/get-session";

describe("getSession", () => {
  it("get correct key for session", async () => {
    const dbMock = { get: vi.fn() };

    await getSession(dbMock);

    expect(dbMock.get).toHaveBeenCalledWith("session");
  });
});
