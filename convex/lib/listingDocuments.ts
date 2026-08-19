import { v } from "convex/values";
import { listingKindValidator, listingStatusValidator } from "../schema";

export const listingDocumentValidator = v.object({
  _id: v.id("listings"),
  _creationTime: v.number(),
  name: v.string(),
  category: v.string(),
  oneLiner: v.string(),
  url: v.string(),
  logoUrl: v.string(),
  kind: listingKindValidator,
  status: listingStatusValidator,
});

export const slotConfigDocumentValidator = v.object({
  _id: v.id("slotConfigs"),
  _creationTime: v.number(),
  key: v.literal("default"),
  cap: v.number(),
  visiblePerLoad: v.number(),
  price: v.union(v.string(), v.null()),
  paymentsEnabled: v.boolean(),
});
