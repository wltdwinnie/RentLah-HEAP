"use client";

import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Image from "next/image";
import { Listing } from "@/lib/definition";
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
  X,
} from "lucide-react";
import { authClient } from "@/lib/authClient";
import { format } from "date-fns";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function PropertyDetails({ listing }: { listing: Listing }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const session = await authClient.getSession();
      if (session && session.data && session.data.user) {
        setCurrentUserId(session.data.user.id);
      }
    }
    fetchUser();
  }, []);

  // Load Google Maps API
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "" + process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  // Calculate deterministic coordinates based on the listing id
  const defaultCenter = { lat: 1.3521, lng: 103.8198 }; // Singapore
  const center =
    Number.isFinite(listing.address.coordinates?.lat) &&
    Number.isFinite(listing.address.coordinates?.lng)
      ? {
          lat: listing.address.coordinates.lat,
          lng: listing.address.coordinates.lng,
        }
      : defaultCenter;

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
          style={{ objectFit: "cover", cursor: "zoom-in" }}
          alt={`Property image ${currentImageIndex + 1}`}
          priority
          onClick={() => setZoomed(true)}
        />
        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-black/50 hover:bg-black/70 pointer-events-auto"
            onClick={previousImage}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-black/50 hover:bg-black/70 pointer-events-auto"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </Button>
        </div>
        {/* Save Button */}
        <Button
          size="icon"
          className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors pointer-events-auto"
          onClick={() => setIsSaved(!isSaved)}
        >
          <Heart
            className={`h-6 w-6 ${
              isSaved ? "text-red-500 fill-red-500" : "text-white"
            }`}
          />
        </Button>
        {/* Image Indicators */}
        {listing.images && listing.images.length > 0 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-none">
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

      {/* Zoom Modal */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setZoomed(false)}
        >
          <div
            className="relative max-w-3xl w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            {listing.images && listing.images.length > 1 && (
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 z-10"
                onClick={() =>
                  setCurrentImageIndex(
                    (prev) =>
                      (prev - 1 + listing.images!.length) %
                      listing.images!.length
                  )
                }
              >
                <ChevronLeft className="h-8 w-8 text-white" />
              </button>
            )}
            <Image
              src={
                listing.images?.[currentImageIndex] ||
                "/assets/placeholder-property.webp"
              }
              alt={`Zoomed property image ${currentImageIndex + 1}`}
              width={1200}
              height={800}
              style={{
                objectFit: "contain",
                maxHeight: "80vh",
                width: "auto",
                cursor: "zoom-out",
              }}
              className="rounded-lg shadow-lg bg-white"
              onClick={() => setZoomed(false)}
            />
            {/* Next Button */}
            {listing.images && listing.images.length > 1 && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 z-10"
                onClick={() =>
                  setCurrentImageIndex(
                    (prev) => (prev + 1) % listing.images!.length
                  )
                }
              >
                <ChevronRight className="h-8 w-8 text-white" />
              </button>
            )}
            <button
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 rounded-full p-2"
              onClick={() => setZoomed(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      )}

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
              {loadError ? (
                <div>Error loading maps</div>
              ) : isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={15}
                >
                  <Marker position={center} />
                </GoogleMap>
              ) : (
                <div>Loading maps...</div>
              )}
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
                    {listing.utilitiesIncluded.length > 0
                      ? listing.utilitiesIncluded.join(", ")
                      : "Not included"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Security Deposit
                  </p>
                  <p className="font-semibold">${listing.deposit}</p>
                </div>
                {listing.agentFee && (
                  <div>
                    <p className="text-sm text-muted-foreground">Agent Fee</p>
                    <p className="font-semibold">
                      ${listing.agentFee}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">
                    Available From
                  </p>
                  <p className="font-semibold">
                    {listing.availableFrom
                      ? format(new Date(listing.availableFrom), "dd/MM/yyyy")
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created At</p>
                  <p className="font-semibold">
                    {listing.createdAt
                      ? format(new Date(listing.createdAt), "dd/MM/yyyy")
                      : "N/A"}
                  </p>
                </div>
                {currentUserId === listing.userId ? (
                  <Button
                    className="w-full"
                    onClick={() =>
                      (window.location.href = `/properties/${listing.id}/edit`)
                    }
                  >
                    Modify Listing
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() =>
                      (window.location.href = `/chat/${listing.userId}`)
                    }
                  >
                    Contact Agent
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
