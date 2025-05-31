import { PropertyCard } from "@/components/ui/card";
import { Listing } from "@/lib/definition";

interface PropertyCardGroupProps {
  listings: Listing[];
}

const PropertyCardGroup = ({ listings } : PropertyCardGroupProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {listings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
        ))}
        </div>
    );
}

export { PropertyCardGroup };