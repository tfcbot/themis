export const LISTING_LIMITS = {
  name: 100,
  category: 50,
  oneLiner: 200,
  url: 2048,
  logoUrl: 2048,
} as const;

export type ListingInput = {
  name: string;
  category: string;
  oneLiner: string;
  url: string;
  logoUrl: string;
};

function assertNonEmptyString(
  value: string,
  fieldName: string,
  maxLength: number,
): void {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    throw new Error(`${fieldName} is required`);
  }
  if (trimmed.length > maxLength) {
    throw new Error(`${fieldName} must be at most ${maxLength} characters`);
  }
}

function assertHttpsUrl(value: string, fieldName: string, maxLength: number): void {
  assertNonEmptyString(value, fieldName, maxLength);

  let parsed: URL;
  try {
    parsed = new URL(value.trim());
  } catch {
    throw new Error(`${fieldName} must be a valid URL`);
  }

  if (parsed.protocol !== "https:") {
    throw new Error(`${fieldName} must use HTTPS`);
  }
}

function assertOptionalHttpsUrl(
  value: string,
  fieldName: string,
  maxLength: number,
): string {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return "";
  }

  assertHttpsUrl(value, fieldName, maxLength);
  return trimmed;
}

export function validateListingInput(input: ListingInput): ListingInput {
  assertNonEmptyString(input.name, "name", LISTING_LIMITS.name);
  assertNonEmptyString(input.category, "category", LISTING_LIMITS.category);
  assertNonEmptyString(input.oneLiner, "oneLiner", LISTING_LIMITS.oneLiner);
  assertHttpsUrl(input.url, "url", LISTING_LIMITS.url);

  return {
    name: input.name.trim(),
    category: input.category.trim(),
    oneLiner: input.oneLiner.trim(),
    url: input.url.trim(),
    logoUrl: assertOptionalHttpsUrl(
      input.logoUrl,
      "logoUrl",
      LISTING_LIMITS.logoUrl,
    ),
  };
}
