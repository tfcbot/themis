import { query, type QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import {
  railCardValidator,
  railOccupancyValidator,
} from "./lib/listingDocuments";

async function getDefaultSlotConfig(ctx: QueryCtx) {
  return await ctx.db
    .query("slotConfigs")
    .withIndex("by_key", (q) => q.eq("key", "default"))
    .unique();
}

async function countTakenRailSlots(ctx: QueryCtx) {
  const liveRailPlacements = await ctx.db
    .query("placements")
    .withIndex("by_kind_and_live", (q) => q.eq("kind", "rail").eq("live", true))
    .collect();

  let taken = 0;
  for (const placement of liveRailPlacements) {
    const listing = await ctx.db.get("listings", placement.listingId);
    if (listing?.status === "live") {
      taken += 1;
    }
  }

  return taken;
}

export const getRailOccupancy = query({
  args: {},
  returns: railOccupancyValidator,
  handler: async (ctx) => {
    const slotConfig = await getDefaultSlotConfig(ctx);

    if (!slotConfig) {
      return { cap: 0, taken: 0 };
    }

    const taken = await countTakenRailSlots(ctx);

    return {
      cap: slotConfig.cap,
      taken,
    };
  },
});

export const listRailCards = query({
  args: {},
  returns: v.array(railCardValidator),
  handler: async (ctx) => {
    const slotConfig = await getDefaultSlotConfig(ctx);
    const cap = slotConfig?.cap ?? 0;

    if (cap === 0) {
      return [];
    }

    const liveRailPlacements = await ctx.db
      .query("placements")
      .withIndex("by_kind_and_live", (q) =>
        q.eq("kind", "rail").eq("live", true),
      )
      .collect();

    const cards = [];

    for (const placement of liveRailPlacements) {
      if (cards.length >= cap) {
        break;
      }

      const listing = await ctx.db.get("listings", placement.listingId);
      if (!listing || listing.status !== "live") {
        continue;
      }

      cards.push({
        listingId: listing._id,
        name: listing.name,
        oneLiner: listing.oneLiner,
        logoUrl: listing.logoUrl,
        url: listing.url,
      });
    }

    return cards;
  },
});
