import { Suspense } from "react";
import { Listing } from "@/lib/definition";
import PropertyDetails from "./property-details";
import PropertyLoadingSkeleton from "./property-loading";
import { fetchListings } from "@/lib/fetchListings";

async function getProperty(id: string): Promise<Listing | undefined> {
  const listings = await fetchListings({ id: id });
  return listings[0];
}

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const listing = await getProperty(params.id);

  if (!listing) {
    return (
      <>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-600">Property not found</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Suspense fallback={<PropertyLoadingSkeleton />}>
        <PropertyDetails listing={listing} />
      </Suspense>
    </>
  );
}
