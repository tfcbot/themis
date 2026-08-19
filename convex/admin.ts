import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { listingDocumentValidator } from "./lib/listingDocuments";
import { requireAdmin } from "./lib/auth";

export const listPendingListings = query({
  args: {},
  returns: v.array(listingDocumentValidator),
  handler: async (ctx) => {
    await requireAdmin(ctx);

    return await ctx.db
      .query("listings")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .collect();
  },
});

export const publishListing = mutation({
  args: {
    listingId: v.id("listings"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const listing = await ctx.db.get("listings", args.listingId);
    if (!listing) {
      throw new Error("Listing not found");
    }
    if (listing.status !== "pending") {
      throw new Error("Only pending listings can be published");
    }

    await ctx.db.patch("listings", args.listingId, { status: "live" });
    return null;
  },
});

export const rejectListing = mutation({
  args: {
    listingId: v.id("listings"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const listing = await ctx.db.get("listings", args.listingId);
    if (!listing) {
      throw new Error("Listing not found");
    }
    if (listing.status !== "pending") {
      throw new Error("Only pending listings can be rejected");
    }

    await ctx.db.patch("listings", args.listingId, { status: "rejected" });
    return null;
  },
});
