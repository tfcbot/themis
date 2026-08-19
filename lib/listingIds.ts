import type { Id } from "@/convex/_generated/dataModel";

const LISTING_ID_PATTERN = /^[a-z0-9]+$/;

export function isListingId(value: string): value is Id<"listings"> {
  return value.length >= 16 && LISTING_ID_PATTERN.test(value);
}
