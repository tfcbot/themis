import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const listingKindValidator = v.union(
  v.literal("organic"),
  v.literal("sponsored"),
);

export const listingStatusValidator = v.union(
  v.literal("pending"),
  v.literal("live"),
  v.literal("rejected"),
);

export const placementKindValidator = v.union(
  v.literal("rail"),
  v.literal("in_list"),
  v.literal("takeover"),
);

export default defineSchema({
  listings: defineTable({
    name: v.string(),
    category: v.string(),
    oneLiner: v.string(),
    url: v.string(),
    logoUrl: v.string(),
    kind: listingKindValidator,
    status: listingStatusValidator,
  }).index("by_status", ["status"]),

  placements: defineTable({
    kind: placementKindValidator,
    listingId: v.id("listings"),
    live: v.boolean(),
  })
    .index("by_listing", ["listingId"])
    .index("by_kind_and_live", ["kind", "live"]),

  slotConfigs: defineTable({
    key: v.literal("default"),
    cap: v.number(),
    visiblePerLoad: v.number(),
    price: v.union(v.string(), v.null()),
    paymentsEnabled: v.boolean(),
  }).index("by_key", ["key"]),
});
