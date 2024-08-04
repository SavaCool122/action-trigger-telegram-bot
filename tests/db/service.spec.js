import { vi, describe, it } from "vitest";
import { createDBService } from "../../db/service";
import { expect } from "vitest";

describe("createDBService", () => {
  describe("getSession", () => {
    it("get correct key for session", async () => {
      const dbMock = { get: vi.fn() };
      const db = createDBService(dbMock);

      await db.getSession();

      expect(dbMock.get).toHaveBeenCalledWith("session");
    });
  });

  it("db get output channels list", async () => {
    const dbMock = { sMembers: vi.fn(() => []) };
    const db = createDBService(dbMock);

    await db.getAllOutputChannels();

    expect(dbMock.sMembers).toHaveBeenCalledWith("channels:output");
  });

  it("db get data for channel from list", async () => {
    const dbMock = { hGetAll: vi.fn(() => "") };
    const db = createDBService(dbMock);
    const FAKE_DATA = ["FAKE_NAME"];

    await db.getChannelsWithData(FAKE_DATA);

    expect(dbMock.hGetAll).toHaveBeenCalledWith("FAKE_NAME");
  });

  it("get input source for listners", async () => {
    const dbMock = { get: vi.fn(() => "") };
    const db = createDBService(dbMock);

    await db.getSource();

    expect(dbMock.get).toHaveBeenCalledWith("channels:input");
  });

  it("get input aria source for listners", async () => {
    const dbMock = { get: vi.fn(() => "") };
    const db = createDBService(dbMock);

    await db.getSearchAria();

    expect(dbMock.get).toHaveBeenCalledWith("channels:input:aria");
  });
});
