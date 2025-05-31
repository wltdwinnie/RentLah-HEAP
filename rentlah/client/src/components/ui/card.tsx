import * as React from "react"

import { cn } from "@/lib/utils"
import { Listing } from "@/lib/definition";


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
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

interface PropertyCardProps {
  listing: Listing;
}
const PropertyCard = ({ listing }: PropertyCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{listing.address.blk} {listing.address.street}</CardTitle>
        <CardDescription>{listing.description.substring(0,50)} ...</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1">
          <p>Postal Code: {listing.address.postalCode}</p>
          <p>Property Type: {listing.propertyType}</p>
          <p>Apartment Type: {listing.aptType}</p>
          <p>Size: {listing.sqft} sqft</p>
          <p>Furnishing: {listing.furnishing}</p>
          <div>
            <p>Rooms:</p>
            <ul className="list-disc list-inside">
              <li>{listing.roomConfig.bedrooms} Bedrooms</li>
              <li>{listing.roomConfig.bathrooms} Bathrooms</li>
              {listing.roomConfig.study && <li>Study Room</li>}
              {listing.roomConfig.helper && <li>Helper{"'"}s Room</li>}
              {listing.roomConfig.balcony && <li>Balcony</li>}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter>
          <div className="text-sm">
            MRT: {listing.nearbyMRT[0]?.distance + "m from " + listing.nearbyMRT[0]?.name || "N/A"}
          </div>
          <div>
          {listing.facilities && listing.facilities.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Facilities: {listing.facilities.join(", ")}
            </div>
          )}
          </div>
      </CardFooter>
    </Card>
  )
}
export { PropertyCard }

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
