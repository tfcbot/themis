import { convexTest } from "convex-test";
import { beforeEach, describe, expect, test } from "vitest";
import { api, internal } from "../convex/_generated/api";
import schema from "../convex/schema";

const modules = import.meta.glob("../convex/**/*.ts");
const ADMIN_EMAIL = "admin@example.com";

beforeEach(() => {
  process.env.ADMIN_EMAIL = ADMIN_EMAIL;
});

describe("admin publish/reject gate", () => {
  test("blocks unauthenticated callers from listing pending listings", async () => {
    const t = convexTest(schema, modules);

    await t.mutation(internal.seed.seedSlotConfig, {});
    await t.mutation(internal.seed.seedTestListings, {});

    await expect(t.query(api.admin.listPendingListings, {})).rejects.toThrow(
      "Not authenticated",
    );
  });

  test("blocks unauthenticated callers from publishing", async () => {
    const t = convexTest(schema, modules);

    const ids = await t.mutation(internal.seed.seedTestListings, {});

    await expect(
      t.mutation(api.admin.publishListing, {
        listingId: ids.pendingListingId,
      }),
    ).rejects.toThrow("Not authenticated");
  });

  test("blocks non-admin authenticated callers", async () => {
    const t = convexTest(schema, modules);

    await t.mutation(internal.seed.seedTestListings, {});

    const asOtherUser = t.withIdentity({ email: "someone@example.com" });

    await expect(
      asOtherUser.query(api.admin.listPendingListings, {}),
    ).rejects.toThrow("Unauthorized");
  });

  test("lists pending listings for the allowlisted admin", async () => {
    const t = convexTest(schema, modules);

    await t.mutation(internal.seed.seedTestListings, {});

    const asAdmin = t.withIdentity({ email: ADMIN_EMAIL });
    const pendingListings = await asAdmin.query(
      api.admin.listPendingListings,
      {},
    );

    expect(pendingListings).toHaveLength(1);
    expect(pendingListings[0]?.name).toBe("Pending Tool");
    expect(pendingListings[0]?.status).toBe("pending");
  });

  test("publish makes a listing live on public queries", async () => {
    const t = convexTest(schema, modules);

    const ids = await t.mutation(internal.seed.seedTestListings, {});
    const asAdmin = t.withIdentity({ email: ADMIN_EMAIL });

    await asAdmin.mutation(api.admin.publishListing, {
      listingId: ids.pendingListingId,
    });

    const liveListings = await t.query(api.listings.listLiveListings, {});
    const liveNames = liveListings.map((listing) => listing.name);

    expect(liveNames).toContain("Pending Tool");
    expect(liveNames).toContain("Live Tool");

    const publishedListing = await t.query(api.listings.getLiveListing, {
      listingId: ids.pendingListingId,
    });
    expect(publishedListing?.status).toBe("live");
  });

  test("reject keeps a listing off the public directory", async () => {
    const t = convexTest(schema, modules);

    const ids = await t.mutation(internal.seed.seedTestListings, {});
    const asAdmin = t.withIdentity({ email: ADMIN_EMAIL });

    await asAdmin.mutation(api.admin.rejectListing, {
      listingId: ids.pendingListingId,
    });

    const liveListings = await t.query(api.listings.listLiveListings, {});
    const liveNames = liveListings.map((listing) => listing.name);

    expect(liveNames).not.toContain("Pending Tool");

    const rejectedListing = await t.query(api.listings.getLiveListing, {
      listingId: ids.pendingListingId,
    });
    expect(rejectedListing).toBeNull();

    const pendingListings = await asAdmin.query(
      api.admin.listPendingListings,
      {},
    );
    expect(pendingListings).toHaveLength(0);
  });
});
