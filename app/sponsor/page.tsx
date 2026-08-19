import type { Metadata } from "next";
import SponsorPageClient from "./SponsorPageClient";

export const metadata: Metadata = {
  title: "Sponsor — Themis",
  description:
    "Reach people choosing AI tools in the Max Explains AI directory. Limited sponsor slots — enquire to book.",
};

export default function SponsorPage() {
  return <SponsorPageClient />;
}
