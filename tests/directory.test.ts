import { describe, expect, test } from "vitest";
import type { LiveListing } from "../lib/directory";
import {
  filterListingsByCategory,
  formatListingLink,
  getUniqueCategories,
} from "../lib/directory";

function makeListing(
  overrides: Partial<LiveListing> & Pick<LiveListing, "_id" | "category">,
): LiveListing {
  return {
    _creationTime: 0,
    name: "Example Tool",
    oneLiner: "Does things.",
    url: "https://example.com/tool",
    logoUrl: "https://example.com/logo.png",
    kind: "organic",
    status: "live",
    ...overrides,
  };
}

describe("directory helpers", () => {
  test("getUniqueCategories returns sorted unique categories", () => {
    const listings = [
      makeListing({ _id: "1" as LiveListing["_id"], category: "Ops" }),
      makeListing({ _id: "2" as LiveListing["_id"], category: "Analytics" }),
      makeListing({ _id: "3" as LiveListing["_id"], category: "Ops" }),
    ];

    expect(getUniqueCategories(listings)).toEqual(["Analytics", "Ops"]);
  });

  test("filterListingsByCategory returns all listings when category is null", () => {
    const listings = [
      makeListing({ _id: "1" as LiveListing["_id"], category: "Ops" }),
      makeListing({ _id: "2" as LiveListing["_id"], category: "Analytics" }),
    ];

    expect(filterListingsByCategory(listings, null)).toHaveLength(2);
  });

  test("filterListingsByCategory narrows to one category", () => {
    const listings = [
      makeListing({ _id: "1" as LiveListing["_id"], category: "Ops" }),
      makeListing({ _id: "2" as LiveListing["_id"], category: "Analytics" }),
    ];

    const filtered = filterListingsByCategory(listings, "Analytics");
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.category).toBe("Analytics");
  });

  test("formatListingLink strips www prefix from hostname", () => {
    expect(formatListingLink("https://www.example.com/path")).toBe("example.com");
  });
});
