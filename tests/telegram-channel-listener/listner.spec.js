import { telegramChannelUpdateListner } from "../../lib/telegram-channel-listener/listner";
import { describe, expect, it, vi } from "vitest";

const clientMock = { addEventHandler: vi.fn() };
const loggerMock = { info: vi.fn() };
const baseDbMock = { sMembers: vi.fn(() => []) };

describe("telegramChannelUpdateListner", () => {
  it("get input source for listners", async () => {
    const dbMock = { ...baseDbMock, get: vi.fn(() => "") };

    await telegramChannelUpdateListner(clientMock, dbMock, loggerMock);

    expect(dbMock.get).toHaveBeenCalledWith("channels:input");
  });

  it("get input aria source for listners", async () => {
    const dbMock = { ...baseDbMock, get: vi.fn(() => "") };

    await telegramChannelUpdateListner(clientMock, dbMock, loggerMock);

    expect(dbMock.get).toHaveBeenCalledWith("channels:input:aria");
  });
});
