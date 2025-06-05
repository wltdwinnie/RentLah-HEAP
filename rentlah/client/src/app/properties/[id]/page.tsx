"use client";

import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Image from "next/image";
import { Listing } from "@/lib/definition";
import { sampleListings } from "@/lib/sample-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Bed,
  Bath,
  Ruler,
  Car,
  WavesLadder,
} from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function PropertyPage({ params }: { params: { id: string } }) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [center, setCenter] = useState({ lat: 1.3521, lng: 103.8198 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // In a real app, this would be an API call
        const found = sampleListings.find((l) => l.id === params.id);
        if (!found) {
          throw new Error("Property not found");
        }
        setListing(found);
        // In a real app, you would get coordinates from geocoding the address
        setCenter({
          lat: 1.3521 + (Math.random() - 0.5) * 0.1,
          lng: 103.8198 + (Math.random() - 0.5) * 0.1,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load property"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-[500px] mb-8 rounded-xl bg-gray-200" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="h-48 bg-gray-200 rounded" />
          </div>
          <div className="h-96 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!listing) return null;

  const nextImage = () => {
    if (listing.images) {
      setCurrentImageIndex((prev) => (prev + 1) % listing.images!.length);
    }
  };

  const previousImage = () => {
    if (listing.images) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + listing.images!.length) % listing.images!.length
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Image Gallery */}
      <div className="relative h-[500px] mb-8 rounded-xl overflow-hidden">
        <Image
          src={
            listing.images?.[currentImageIndex] ||
            "/assets/placeholder-property.webp"
          }
          fill
          style={{ objectFit: "cover" }}
          alt={`Property image ${currentImageIndex + 1}`}
          priority
        />
        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-black/50 hover:bg-black/70"
            onClick={previousImage}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-black/50 hover:bg-black/70"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </Button>
        </div>
        {/* Save Button */}
        <Button
          size="icon"
          className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
          onClick={() => {
            /* TODO: Implement save functionality */
          }}
        >
          <Heart className="h-6 w-6 text-white" />
        </Button>
        {/* Image Indicators */}
        {listing.images && listing.images.length > 0 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {listing.images.map((_, index) => (
              <div
                key={index}
                className={`h-2 transition-all ${
                  index === currentImageIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50"
                } rounded-full`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {listing.address.blk} {listing.address.street}
            </h1>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Singapore {listing.address.postalCode}</span>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="flex items-center p-4">
                <Bed className="h-5 w-5 mr-2" />
                <div>
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                  <p className="font-semibold">{listing.roomConfig.bedrooms}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-4">
                <Bath className="h-5 w-5 mr-2" />
                <div>
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                  <p className="font-semibold">
                    {listing.roomConfig.bathrooms}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-4">
                <Ruler className="h-5 w-5 mr-2" />
                <div>
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="font-semibold">{listing.sqft} sqft</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-4">
                <Car className="h-5 w-5 mr-2" />
                <div>
                  <p className="text-sm text-muted-foreground">Parking</p>
                  <p className="font-semibold">
                    {listing.parking.available
                      ? `${listing.parking.spaces} spaces`
                      : "No"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {listing.description}
              </p>
            </CardContent>
          </Card>

          {/* Facilities */}
          {listing.facilities && listing.facilities.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Facilities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {listing.facilities.map((facility) => (
                    <div key={facility} className="flex items-center">
                      <WavesLadder className="h-5 w-5 mr-2" />
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Map */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={15}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
              <div className="mt-4 space-y-2">
                {listing.nearbyMRT.map((mrt) => (
                  <div key={mrt.name} className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>
                      {mrt.name} MRT Station - {mrt.distance}m away
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-4">
                ${listing.perMonth}/mo
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Property Type</p>
                  <p className="font-semibold">
                    {listing.propertyType} - {listing.aptType}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Furnishing</p>
                  <p className="font-semibold">{listing.furnishing}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lease Period</p>
                  <p className="font-semibold">{listing.leasePeriod}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Utilities Included
                  </p>
                  <p className="font-semibold">
                    {listing.utilities.included.length > 0
                      ? listing.utilities.included.join(", ")
                      : "Not included"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Security Deposit
                  </p>
                  <p className="font-semibold">${listing.utilities.deposit}</p>
                </div>
                {listing.utilities.agentFee && (
                  <div>
                    <p className="text-sm text-muted-foreground">Agent Fee</p>
                    <p className="font-semibold">
                      ${listing.utilities.agentFee}
                    </p>
                  </div>
                )}
                <Button className="w-full">Contact Agent</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
