import { query } from "./_generated/server";
import { v } from "convex/values";

const publicSlotConfigValidator = v.object({
  cap: v.number(),
  visiblePerLoad: v.number(),
  price: v.union(v.string(), v.null()),
  paymentsEnabled: v.boolean(),
  slotsTaken: v.number(),
});

export const getDefaultSlotConfig = query({
  args: {},
  returns: v.union(publicSlotConfigValidator, v.null()),
  handler: async (ctx) => {
    const slotConfig = await ctx.db
      .query("slotConfigs")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .unique();

    if (!slotConfig) {
      return null;
    }

    const placements = await ctx.db.query("placements").collect();
    const slotsTaken = placements.filter((placement) => placement.live).length;

    return {
      cap: slotConfig.cap,
      visiblePerLoad: slotConfig.visiblePerLoad,
      price: slotConfig.price,
      paymentsEnabled: slotConfig.paymentsEnabled,
      slotsTaken,
    };
  },
});
