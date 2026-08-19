import { convexTest } from "convex-test";
import { describe, expect, test } from "vitest";
import { api, internal } from "../convex/_generated/api";
import schema from "../convex/schema";

const modules = import.meta.glob("../convex/**/*.ts");

describe("slot config public contract", () => {
  test("returns enquire-only defaults with no price", async () => {
    const t = convexTest(schema, modules);

    await t.mutation(internal.seed.seedSlotConfig, {});

    const slotConfig = await t.query(api.slotConfig.getDefaultSlotConfig, {});

    expect(slotConfig).toMatchObject({
      cap: 15,
      visiblePerLoad: 9,
      price: null,
      paymentsEnabled: false,
      slotsTaken: 0,
    });
  });

  test("counts live placements for scarcity messaging", async () => {
    const t = convexTest(schema, modules);

    await t.mutation(internal.seed.seedSlotConfig, {});
    const ids = await t.mutation(internal.seed.seedTestListings, {});

    await t.run(async (ctx) => {
      await ctx.db.insert("placements", {
        kind: "rail",
        listingId: ids.liveListingId,
        live: true,
      });
    });

    const slotConfig = await t.query(api.slotConfig.getDefaultSlotConfig, {});

    expect(slotConfig?.slotsTaken).toBe(1);
    expect(slotConfig?.price).toBeNull();
    expect(slotConfig?.paymentsEnabled).toBe(false);
  });
});
