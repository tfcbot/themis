import type { LiveListing } from "@/lib/directory";
import ListingCard from "./ListingCard";

type ListingCardsProps = {
  listings: LiveListing[];
};

export default function ListingCards({ listings }: ListingCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {listings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
    </div>
  );
}
