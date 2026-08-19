import { describe, expect, test } from "vitest";
import { isListingId } from "../lib/listingIds";

describe("isListingId", () => {
  test("accepts convex-style listing ids", () => {
    expect(isListingId("jd7abc123def4567890123456")).toBe(true);
  });

  test("rejects empty, short, or invalid ids", () => {
    expect(isListingId("")).toBe(false);
    expect(isListingId("abc")).toBe(false);
    expect(isListingId("jd7abc123!invalid")).toBe(false);
  });
});
