import type { Doc } from "@/convex/_generated/dataModel";

export type LiveListing = Doc<"listings">;

export type DirectoryViewMode = "table" | "cards";

export function getUniqueCategories(listings: LiveListing[]): string[] {
  const categories = new Set(listings.map((listing) => listing.category));
  return [...categories].sort((a, b) => a.localeCompare(b));
}

export function filterListingsByCategory(
  listings: LiveListing[],
  category: string | null,
): LiveListing[] {
  if (!category) {
    return listings;
  }

  return listings.filter((listing) => listing.category === category);
}

export function formatListingLink(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return hostname;
  } catch {
    return url;
  }
}
