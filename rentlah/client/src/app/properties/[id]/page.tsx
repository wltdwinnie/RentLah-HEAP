import { Suspense } from "react";
import { Listing } from "@/lib/definition";
import { sampleListings } from "@/lib/sample-data";
import PropertyDetails from "./property-details";
import PropertyLoadingSkeleton from "./property-loading";

function getProperty(id: string): Listing | undefined {
  // In a real app, this would be an API call
  return sampleListings.find((l) => l.id === id);
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  const listing = getProperty(params.id);
  
  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">Property not found</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<PropertyLoadingSkeleton />}>
      <PropertyDetails listing={listing} />
    </Suspense>
  );
}
