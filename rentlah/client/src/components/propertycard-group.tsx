import { PropertyCard } from "@/components/ui/card";
import { Listing } from "@/lib/definition";

interface PropertyCardGroupProps {
  listings: Listing[];
}

const PropertyCardGroup = ({ listings } : PropertyCardGroupProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {listings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
        ))}
        </div>
    );
}

export { PropertyCardGroup };