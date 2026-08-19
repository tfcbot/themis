import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { listingDocumentValidator } from "./lib/listingDocuments";
import { validateListingInput } from "./lib/listingValidation";
import { listingKindValidator } from "./schema";

export const listLiveListings = query({
  args: {},
  returns: v.array(listingDocumentValidator),
  handler: async (ctx) => {
    return await ctx.db
      .query("listings")
      .withIndex("by_status", (q) => q.eq("status", "live"))
      .collect();
  },
});

export const getLiveListing = query({
  args: {
    listingId: v.id("listings"),
  },
  returns: v.union(listingDocumentValidator, v.null()),
  handler: async (ctx, args) => {
    const listing = await ctx.db.get("listings", args.listingId);
    if (!listing || listing.status !== "live") {
      return null;
    }
    return listing;
  },
});

export const createPendingListing = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    oneLiner: v.string(),
    url: v.string(),
    logoUrl: v.string(),
    kind: listingKindValidator,
  },
  returns: v.id("listings"),
  handler: async (ctx, args) => {
    const validated = validateListingInput(args);

    return await ctx.db.insert("listings", {
      ...validated,
      kind: args.kind,
      status: "pending",
    });
  },
});
