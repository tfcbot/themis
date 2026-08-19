import { describe, expect, test } from "vitest";
import { validateListingInput } from "../convex/lib/listingValidation";

const validInput = {
  name: "Example Tool",
  category: "Automation",
  oneLiner: "Helps teams ship faster.",
  url: "https://example.com",
  logoUrl: "https://example.com/logo.png",
};

describe("validateListingInput", () => {
  test("accepts valid https listing fields", () => {
    expect(validateListingInput(validInput)).toEqual(validInput);
  });

  test("trims surrounding whitespace", () => {
    expect(
      validateListingInput({
        ...validInput,
        name: "  Example Tool  ",
      }),
    ).toEqual(validInput);
  });

  test("rejects http urls", () => {
    expect(() =>
      validateListingInput({
        ...validInput,
        url: "http://example.com",
      }),
    ).toThrow("url must use HTTPS");
  });

  test("rejects empty required fields", () => {
    expect(() =>
      validateListingInput({
        ...validInput,
        name: "   ",
      }),
    ).toThrow("name is required");
  });

  test("rejects fields that exceed max length", () => {
    expect(() =>
      validateListingInput({
        ...validInput,
        oneLiner: "x".repeat(201),
      }),
    ).toThrow("oneLiner must be at most 200 characters");
  });

  test("accepts empty optional logoUrl", () => {
    expect(
      validateListingInput({
        ...validInput,
        logoUrl: "",
      }),
    ).toEqual({
      ...validInput,
      logoUrl: "",
    });

    expect(
      validateListingInput({
        ...validInput,
        logoUrl: "   ",
      }),
    ).toEqual({
      ...validInput,
      logoUrl: "",
    });
  });

  test("rejects invalid optional logoUrl when provided", () => {
    expect(() =>
      validateListingInput({
        ...validInput,
        logoUrl: "http://example.com/logo.png",
      }),
    ).toThrow("logoUrl must use HTTPS");
  });
});
