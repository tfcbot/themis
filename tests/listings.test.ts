import { convexTest } from "convex-test";
import { describe, expect, test } from "vitest";
import { api, internal } from "../convex/_generated/api";
import schema from "../convex/schema";

const modules = import.meta.glob("../convex/**/*.ts");

describe("listings public contract", () => {
  test("returns only live listings and hides pending/rejected", async () => {
    const t = convexTest(schema, modules);

    await t.mutation(internal.seed.seedSlotConfig, {});
    const ids = await t.mutation(internal.seed.seedTestListings, {});

    const liveListings = await t.query(api.listings.listLiveListings, {});
    expect(liveListings).toHaveLength(1);
    expect(liveListings[0]?.name).toBe("Live Tool");
    expect(liveListings[0]?.status).toBe("live");

    const pendingListing = await t.query(api.listings.getLiveListing, {
      listingId: ids.pendingListingId,
    });
    expect(pendingListing).toBeNull();

    const rejectedListing = await t.query(api.listings.getLiveListing, {
      listingId: ids.rejectedListingId,
    });
    expect(rejectedListing).toBeNull();

    const liveListing = await t.query(api.listings.getLiveListing, {
      listingId: ids.liveListingId,
    });
    expect(liveListing?.name).toBe("Live Tool");
  });

  test("creates pending listings with validated input", async () => {
    const t = convexTest(schema, modules);

    const listingId = await t.mutation(api.listings.createPendingListing, {
      name: "New Submission",
      category: "Ops",
      oneLiner: "Submitted for review.",
      url: "https://example.com/new",
      logoUrl: "https://example.com/new-logo.png",
      kind: "organic",
    });

    const publicListing = await t.query(api.listings.getLiveListing, {
      listingId,
    });
    expect(publicListing).toBeNull();
  });

  test("keeps slot config enquire-only", async () => {
    const t = convexTest(schema, modules);

    await t.mutation(internal.seed.seedSlotConfig, {});

    const slotConfig = await t.run(async (ctx) => {
      return await ctx.db
        .query("slotConfigs")
        .withIndex("by_key", (q) => q.eq("key", "default"))
        .unique();
    });

    expect(slotConfig).toMatchObject({
      cap: 15,
      visiblePerLoad: 9,
      price: null,
      paymentsEnabled: false,
    });
  });
});
