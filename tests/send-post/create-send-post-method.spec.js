import { describe, expect, it, vi } from "vitest";
import { createSendPostMethod } from "../../lib/send-post/create-send-post-method";

const loggerMock = { info: vi.fn() };

describe("createSendPostMethod", () => {
  it("db get output channels list", async () => {
    const dbMock = { sMembers: vi.fn(() => []) };

    await createSendPostMethod("", dbMock, loggerMock);

    expect(dbMock.sMembers).toHaveBeenCalledWith("channels:output");
  });

  it("db get data for channel from list", async () => {
    const baseDbMock = { sMembers: vi.fn(() => FAKE_DATA) };
    const FAKE_NAME = "FAKE_NAME";
    const FAKE_DATA = [FAKE_NAME];
    const dbMock = { ...baseDbMock, hGetAll: vi.fn(() => "") };

    await createSendPostMethod("", dbMock, loggerMock);

    expect(dbMock.hGetAll).toHaveBeenCalledWith(FAKE_NAME);
  });
});
