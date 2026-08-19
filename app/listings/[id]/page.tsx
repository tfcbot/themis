import type { Metadata } from "next";
import ListingDetailClient from "./ListingDetailClient";

export const metadata: Metadata = {
  title: "Listing — Themis",
  description: "Sponsor and tool listing on the Max Explains AI directory.",
};

type ListingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;
  return <ListingDetailClient listingId={id} />;
}
