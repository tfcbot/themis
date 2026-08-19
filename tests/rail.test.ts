import { convexTest } from "convex-test";
import { describe, expect, test } from "vitest";
import { api, internal } from "../convex/_generated/api";
import schema from "../convex/schema";

const modules = import.meta.glob("../convex/**/*.ts");

describe("rail public contract", () => {
  test("returns only live rail cards and hides pending listings", async () => {
    const t = convexTest(schema, modules);

    await t.mutation(internal.seed.seedSlotConfig, {});
    await t.mutation(internal.seed.seedTestListings, {});

    const railCards = await t.query(api.rail.listRailCards, {});
    expect(railCards).toHaveLength(1);
    expect(railCards[0]?.name).toBe("Live Tool");
    expect(railCards[0]?.oneLiner).toBe("Visible on the public directory.");
    expect(railCards[0]?.logoUrl).toBe("https://example.com/live-logo.png");
  });

  test("returns occupancy without price or currency", async () => {
    const t = convexTest(schema, modules);

    await t.mutation(internal.seed.seedSlotConfig, {});
    await t.mutation(internal.seed.seedTestListings, {});

    const occupancy = await t.query(api.rail.getRailOccupancy, {});

    expect(occupancy).toEqual({
      cap: 15,
      taken: 1,
    });
    expect(occupancy).not.toHaveProperty("price");
    expect(occupancy).not.toHaveProperty("paymentsEnabled");
    expect(JSON.stringify(occupancy)).not.toMatch(/\$/);
    expect(JSON.stringify(occupancy)).not.toMatch(/1200|800/);
  });

  test("counts only live listings toward taken slots", async () => {
    const t = convexTest(schema, modules);

    await t.mutation(internal.seed.seedSlotConfig, {});
    await t.mutation(internal.seed.seedTestListings, {});

    const occupancy = await t.query(api.rail.getRailOccupancy, {});

    expect(occupancy.taken).toBe(1);
    expect(occupancy.cap).toBe(15);
  });
});
