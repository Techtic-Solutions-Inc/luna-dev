import { describe, expect, it } from "vitest";

describe("profile api module", () => {
  it("exports profile helpers", async () => {
    const mod = await import("./profile");
    expect(typeof mod.get).toBe("function");
    expect(typeof mod.update).toBe("function");
    expect(typeof mod.changePassword).toBe("function");
  });
});
