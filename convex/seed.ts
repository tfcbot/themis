import { internalMutation, type MutationCtx } from "./_generated/server";
import { v } from "convex/values";

const DEFAULT_SLOT_CONFIG = {
  key: "default" as const,
  cap: 15,
  visiblePerLoad: 9,
  price: null,
  paymentsEnabled: false,
};

async function upsertDefaultSlotConfig(ctx: MutationCtx) {
  const existing = await ctx.db
    .query("slotConfigs")
    .withIndex("by_key", (q) => q.eq("key", "default"))
    .unique();

  if (existing) {
    await ctx.db.patch("slotConfigs", existing._id, {
      cap: DEFAULT_SLOT_CONFIG.cap,
      visiblePerLoad: DEFAULT_SLOT_CONFIG.visiblePerLoad,
      price: DEFAULT_SLOT_CONFIG.price,
      paymentsEnabled: DEFAULT_SLOT_CONFIG.paymentsEnabled,
    });
    return existing._id;
  }

  return await ctx.db.insert("slotConfigs", DEFAULT_SLOT_CONFIG);
}

export const seedSlotConfig = internalMutation({
  args: {},
  returns: v.id("slotConfigs"),
  handler: async (ctx) => {
    return await upsertDefaultSlotConfig(ctx);
  },
});

export const seedTestListings = internalMutation({
  args: {},
  returns: v.object({
    pendingListingId: v.id("listings"),
    liveListingId: v.id("listings"),
    rejectedListingId: v.id("listings"),
    liveRailPlacementId: v.id("placements"),
  }),
  handler: async (ctx) => {
    const pendingListingId = await ctx.db.insert("listings", {
      name: "Pending Tool",
      category: "Automation",
      oneLiner: "Awaiting review before going live.",
      url: "https://example.com/pending",
      logoUrl: "https://example.com/pending-logo.png",
      kind: "organic",
      status: "pending",
    });

    const liveListingId = await ctx.db.insert("listings", {
      name: "Live Tool",
      category: "Analytics",
      oneLiner: "Visible on the public directory.",
      url: "https://example.com/live",
      logoUrl: "https://example.com/live-logo.png",
      kind: "sponsored",
      status: "live",
    });

    const rejectedListingId = await ctx.db.insert("listings", {
      name: "Rejected Tool",
      category: "Security",
      oneLiner: "Not eligible for the directory.",
      url: "https://example.com/rejected",
      logoUrl: "https://example.com/rejected-logo.png",
      kind: "organic",
      status: "rejected",
    });

    const pendingRailPlacementId = await ctx.db.insert("placements", {
      kind: "rail",
      listingId: pendingListingId,
      live: true,
    });

    const liveRailPlacementId = await ctx.db.insert("placements", {
      kind: "rail",
      listingId: liveListingId,
      live: true,
    });

    void pendingRailPlacementId;

    return {
      pendingListingId,
      liveListingId,
      rejectedListingId,
      liveRailPlacementId,
    };
  },
});

export const assertPublicListingVisibility = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const liveListings = await ctx.db
      .query("listings")
      .withIndex("by_status", (q) => q.eq("status", "live"))
      .collect();

    const slotConfig = await ctx.db
      .query("slotConfigs")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .unique();

    if (!slotConfig) {
      throw new Error("Expected default SlotConfig to exist");
    }

    if (slotConfig.price !== null && slotConfig.price !== "") {
      throw new Error("SlotConfig.price must be empty");
    }

    if (slotConfig.paymentsEnabled !== false) {
      throw new Error("SlotConfig.paymentsEnabled must be false");
    }

    const liveNames = new Set(liveListings.map((listing) => listing.name));

    if (!liveNames.has("Live Tool")) {
      throw new Error("Expected live listing to be queryable as live");
    }

    if (liveNames.has("Pending Tool") || liveNames.has("Rejected Tool")) {
      throw new Error("Pending and rejected listings must not appear as live");
    }

    return null;
  },
});

export const seedForTests = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    await upsertDefaultSlotConfig(ctx);

    const pendingListingId = await ctx.db.insert("listings", {
      name: "Pending Tool",
      category: "Automation",
      oneLiner: "Awaiting review before going live.",
      url: "https://example.com/pending",
      logoUrl: "https://example.com/pending-logo.png",
      kind: "organic",
      status: "pending",
    });

    const liveListingId = await ctx.db.insert("listings", {
      name: "Live Tool",
      category: "Analytics",
      oneLiner: "Visible on the public directory.",
      url: "https://example.com/live",
      logoUrl: "https://example.com/live-logo.png",
      kind: "sponsored",
      status: "live",
    });

    await ctx.db.insert("listings", {
      name: "Rejected Tool",
      category: "Security",
      oneLiner: "Not eligible for the directory.",
      url: "https://example.com/rejected",
      logoUrl: "https://example.com/rejected-logo.png",
      kind: "organic",
      status: "rejected",
    });

    await ctx.db.insert("placements", {
      kind: "rail",
      listingId: pendingListingId,
      live: true,
    });

    await ctx.db.insert("placements", {
      kind: "rail",
      listingId: liveListingId,
      live: true,
    });

    const liveListings = await ctx.db
      .query("listings")
      .withIndex("by_status", (q) => q.eq("status", "live"))
      .collect();

    const slotConfig = await ctx.db
      .query("slotConfigs")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .unique();

    if (!slotConfig) {
      throw new Error("Expected default SlotConfig to exist");
    }

    if (slotConfig.price !== null && slotConfig.price !== "") {
      throw new Error("SlotConfig.price must be empty");
    }

    if (slotConfig.paymentsEnabled !== false) {
      throw new Error("SlotConfig.paymentsEnabled must be false");
    }

    const liveNames = new Set(liveListings.map((listing) => listing.name));

    if (!liveNames.has("Live Tool")) {
      throw new Error("Expected live listing to be queryable as live");
    }

    if (liveNames.has("Pending Tool") || liveNames.has("Rejected Tool")) {
      throw new Error("Pending and rejected listings must not appear as live");
    }

    return null;
  },
});
