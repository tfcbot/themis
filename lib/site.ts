/**
 * Branded strings and outbound links for Themis. Keep sponsor contact here —
 * not in SlotConfig.price (which stays empty until payments ship).
 */
export const SITE = {
  wordmark: "Themis",
  parentBrand: "Max Explains AI",
  parentUrl: "https://maxexplains.ai",
  tagline:
    "The sponsor directory for people choosing AI tools, agents, and workflows.",
  /** Enquire-only path while paymentsEnabled is false. */
  sponsorContactUrl: "mailto:hello@maxexplains.ai",
} as const;

export const PLACEMENTS = [
  {
    kind: "rail" as const,
    title: "Side rail",
    description:
      "A card in the sticky rail beside the directory table, visible for the whole scroll.",
    bullets: [
      "Logo, name, and one line of copy",
      "Sticky on desktop, strip on mobile",
      "Rotated evenly with other rail sponsors",
    ],
  },
  {
    kind: "in_list" as const,
    title: "In-list",
    description:
      "Your tool sits inside the table as a labelled promoted row.",
    bullets: [
      "Reads like a real directory entry",
      "Fixed rows near the top of the list",
      "Marked Promoted, always",
    ],
  },
  {
    kind: "takeover" as const,
    title: "Full takeover",
    description:
      "Both edge rails plus the sponsor band — exclusive, no other sponsors.",
    bullets: [
      "Band copy written with you",
      "Home page and every listing page",
      "One sponsor owns the moment",
    ],
  },
] as const;
