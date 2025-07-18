"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Listing } from "@/lib/definition";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Footprints } from "lucide-react";
import { Button, SaveButton } from "@/components/ui/button";
import { useState } from "react";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 pb-1", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center px-6 pb-1", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

interface PropertyCardProps {
  listing: Listing;
}
const PropertyCard = ({ listing }: PropertyCardProps) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClick = () => {
    router.push(`/properties/${listing.id}`, { scroll: false });
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (listing.images && listing.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
    }
  };

  const previousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (listing.images && listing.images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + listing.images.length) % listing.images.length
      );
    }
  };

  return (
    <div onClick={handleClick} className="h-[480px]">
      <Card className="h-full overflow-hidden">
        <div className="relative w-full h-[200px] group">
          <Image
            src={
              listing.images &&
              listing.images.length > 0 &&
              listing.images[currentImageIndex]
                ? listing.images[currentImageIndex]
                : "/assets/placeholder-property.webp"
            }
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            className="rounded-t-xl transition-opacity duration-300"
            alt={
              listing.images && listing.images.length > 0
                ? `Property image ${currentImageIndex + 1}`
                : "Property placeholder"
            }
            onError={(e) => {
              console.log("Image failed to load:", e.currentTarget.src);
              e.currentTarget.src = "/assets/placeholder-property.webp";
            }}
          />
          {/* Navigation Buttons - Only show on hover */}
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-black/50 hover:bg-black/70"
              onClick={previousImage}
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-black/50 hover:bg-black/70"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </Button>
          </div>

          {/* Image Indicators */}
          {listing.images && listing.images.length > 0 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {listing.images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full transition-all ${
                    index === currentImageIndex ? "w-3 bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
            <SaveButton
              initialSaved={false}
              onToggle={(saved) => {
                console.log(
                  "the accomodation is saved",
                  saved
                ); /* implement saved accomodation logic */
              }}
            />
          </div>
        </div>
        <CardHeader>
          <CardTitle className="truncate">${listing.perMonth}/month</CardTitle>
          <CardDescription className="line-clamp-3">
            <b>
              {listing.address.blk} {listing.address.street},{" "}
              {listing.address.postalCode}
            </b>
            <br />
            {listing.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Card className="px-3 py-1 w-fit text-sm">
              {listing.propertyType}
            </Card>
            <Card className="px-3 py-1 w-fit text-sm">
              {listing.furnishing}
            </Card>
            <Card className="px-3 py-1 w-fit text-sm">{listing.aptType}</Card>
            <Card className="px-3 py-1 w-fit text-sm">{listing.sqft} sqft</Card>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <div className="flex items-center gap-2 w-full">
            <Footprints className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm truncate">
              {listing.nearbyMRT && listing.nearbyMRT.length > 0
                ? `${listing.nearbyMRT[0].distance}m from ${listing.nearbyMRT[0].name}`
                : "No nearby MRT information"}
            </span>
          </div>

          {listing.facilities && listing.facilities.length > 0 && (
            <div className="text-sm text-muted-foreground truncate w-full">
              Facilities: {listing.facilities.join(", ")}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
export { PropertyCard };

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
