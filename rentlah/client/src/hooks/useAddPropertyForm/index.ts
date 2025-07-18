// Main useAddPropertyForm hook, imports helpers/hooks
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { geocodeAddress } from "@/lib/address-utils";
import { AddPropertyFormState } from "@/lib/definition";
import { InsertListing } from "@/db/schema";
import { useAmenities } from "./useAmenities";
import { useMRT } from "./useMRT";
import {
  sanitizeFacilities,
  sanitizeOccupation,
  sanitizeNumber,
  sanitizeArray,
  sanitizeDate,
} from "./validation";
import { AptType, FurnishingType, GenderType, LeasePeriodType, NationalityType, ParkingType, PropertyType, UtilityType } from "@/lib/constants";

export function useAddPropertyForm(user: string, GOOGLE_API_KEY: string) {
  const [form, setForm] = useState<AddPropertyFormState>({
    id: undefined,
    addressBlk: "",
    addressStreet: "",
    addressPostalCode: "",
    addressFloor: "",
    addressUnit: "",
    coordinatesLat: "",
    coordinatesLng: "",
    description: "",
    aptType: "3-bedroom",
    propertyType: "HDB",
    bedrooms: 1,
    bathrooms: 1,
    hasStudy: false,
    hasHelper: false,
    hasBalcony: false,
    furnishing: "Unfurnished",
    sqft: 0,
    facilities: [],
    parkingAvailable: false,
    parkingType: "",
    parkingSpaces: "",
    nearbyAmenities: [],
    perMonth: 0,
    utilitiesIncluded: [],
    securityDeposit: 0,
    agentFee: 0,
    leasePeriod: "long-term",
    preferredGender: "No Preference",
    preferredNationality: "No Preference",
    preferredOccupation: "",
    maxOccupants: "",
    isActive: true,
    isFeatured: false,
    isVerified: false,
    universityTravelTimes: "",
    userId: user || "",
    availableFrom: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [lastAddedId, setLastAddedId] = useState<string>("");

  // Amenities hook
  const amenitiesHook = useAmenities();
  // MRT hook
  const mrtHook = useMRT();

  useEffect(() => {
    setForm((prev) => ({ ...prev, userId: user || "" }));
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleToggleUtility = (utility: string) => {
    setForm((prev) => {
      const current = Array.isArray(prev.utilitiesIncluded)
        ? prev.utilitiesIncluded
        : [];
      if (current.includes(utility)) {
        return {
          ...prev,
          utilitiesIncluded: current.filter((u) => u !== utility),
        };
      } else {
        return { ...prev, utilitiesIncluded: [...current, utility] };
      }
    });
  };

  const handleAutoPopulateCoordinates = async () => {
    try {
      const address = `${form.addressBlk} ${form.addressStreet} Singapore ${form.addressPostalCode}`;
      const coords = await geocodeAddress(address, GOOGLE_API_KEY);
      setForm((prev) => ({
        ...prev,
        coordinatesLat: coords.lat.toString(),
        coordinatesLng: coords.lng.toString(),
      }));
        console.log(`[inside handle auto] Coordinates auto-populated: ${form.coordinatesLat}, ${form.coordinatesLng}`);
    } catch {
      setError("Failed to fetch coordinates from address");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    // Validation checks
    const validationErrors: string[] = [];

    // Required field validations
    if (!form.addressBlk.trim()) validationErrors.push("Block number is required");
    if (!form.addressStreet.trim()) validationErrors.push("Street name is required");
    if (!form.addressPostalCode.trim()) validationErrors.push("Postal code is required");
    if (!form.description.trim()) validationErrors.push("Property description is required");
    if (!form.availableFrom) validationErrors.push("Available from date is required");

    // Numeric field validations
    if (isNaN(Number(form.perMonth)) || form.perMonth <= 0) validationErrors.push("Monthly rent must be a valid number greater than 0");
    if (isNaN(Number(form.bedrooms)) || form.bedrooms <= 0) validationErrors.push("Number of bedrooms must be a valid number greater than 0");
    if (isNaN(Number(form.bathrooms)) || form.bathrooms <= 0) validationErrors.push("Number of bathrooms must be a valid number greater than 0");
    if (isNaN(Number(form.sqft)) || form.sqft <= 0) validationErrors.push("Square footage must be a valid number greater than 0");
    if (isNaN(Number(form.securityDeposit)) || form.securityDeposit < 0) validationErrors.push("Security deposit must be a valid number and cannot be negative");
    if (isNaN(Number(form.agentFee)) || form.agentFee < 0) validationErrors.push("Agent fee must be a valid number and cannot be negative");

    // Max occupants validation
    if (form.maxOccupants && isNaN(Number(form.maxOccupants))) {
      validationErrors.push("Maximum occupants must be a valid number");
    }

    // Parking validation
    if (form.parkingAvailable && form.parkingSpaces && Number(form.parkingSpaces) <= 0) {
      validationErrors.push("Parking spaces must be greater than 0 when parking is available");
    }

    // Images validation
    if (images.length === 0) {
      validationErrors.push("At least one property image is required");
    }

    // If there are validation errors, show them and stop submission
    if (validationErrors.length > 0) {
      setError(validationErrors.join(". "));
      setSubmitting(false);
      return; // Exit early - do not proceed with data submission
    }

    // Only proceed with submission if all validations pass
    try {
      const updatedForm = { ...form };
      if (!form.coordinatesLat || !form.coordinatesLng) {
        try {
          const address = `${form.addressBlk} ${form.addressStreet} Singapore ${form.addressPostalCode}`;
          const coords = await geocodeAddress(address, GOOGLE_API_KEY);
          updatedForm.coordinatesLat = coords.lat.toString();
          updatedForm.coordinatesLng = coords.lng.toString();
          setForm((prev) => ({
            ...prev,
            coordinatesLat: coords.lat.toString(),
            coordinatesLng: coords.lng.toString(),
          }));
          console.log(`[inside submit] Coordinates auto-populated: ${form.coordinatesLat}, ${form.coordinatesLng}`);
        } catch {
          setError(
            "Failed to auto-populate coordinates. Please check the address."
          );
          setSubmitting(false);
          return;
        }
      }
      // Data sanitization
      const data: InsertListing = {
        id: updatedForm.id || uuidv4(),
        description: updatedForm.description,
        userId: updatedForm.userId,
        aptType: updatedForm.aptType as AptType, // ensure enum type
        propertyType: updatedForm.propertyType as PropertyType,
        bedrooms: sanitizeNumber(updatedForm.bedrooms),
        bathrooms: sanitizeNumber(updatedForm.bathrooms),
        hasStudy: !!updatedForm.hasStudy,
        hasHelper: !!updatedForm.hasHelper,
        hasBalcony: !!updatedForm.hasBalcony,
        furnishing: updatedForm.furnishing as FurnishingType,
        sqft: sanitizeNumber(updatedForm.sqft),
        addressBlk: sanitizeNumber(updatedForm.addressBlk),
        addressStreet: updatedForm.addressStreet,
        addressPostalCode: updatedForm.addressPostalCode,
        addressFloor: updatedForm.addressFloor ? sanitizeNumber(updatedForm.addressFloor) : undefined,
        addressUnit: updatedForm.addressUnit ? sanitizeNumber(updatedForm.addressUnit) : undefined,
        coordinates: {
          lat: sanitizeNumber(updatedForm.coordinatesLat),
          lng: sanitizeNumber(updatedForm.coordinatesLng),
        },
        nearbyMRT: mrtHook.nearbyMRT,
        facilities: sanitizeFacilities(updatedForm.facilities),
        parkingAvailable: !!updatedForm.parkingAvailable,
        parkingType: updatedForm.parkingType === "" ? undefined : updatedForm.parkingType as ParkingType,
        parkingSpaces: updatedForm.parkingSpaces ? sanitizeNumber(updatedForm.parkingSpaces) : 0,
        nearbyAmenities: amenitiesHook.amenities,
        perMonth: String(sanitizeNumber(updatedForm.perMonth)),
        utilitiesIncluded: sanitizeArray(updatedForm.utilitiesIncluded) as UtilityType[],
        deposit: String(sanitizeNumber(updatedForm.securityDeposit)),
        agentFee: updatedForm.agentFee ? String(sanitizeNumber(updatedForm.agentFee)) : undefined,
        leasePeriod: updatedForm.leasePeriod as LeasePeriodType,
        preferredGender: updatedForm.preferredGender !== "No Preference" ? updatedForm.preferredGender as GenderType : undefined,
        preferredNationality: updatedForm.preferredNationality !== "No Preference" ? updatedForm.preferredNationality as NationalityType : undefined,
        preferredOccupation: sanitizeOccupation(updatedForm.preferredOccupation),
        maxOccupants: sanitizeNumber(updatedForm.maxOccupants),
        images: images,
        isActive: !!updatedForm.isActive,
        isFeatured: !!updatedForm.isFeatured,
        isVerified: !!updatedForm.isVerified,
        createdAt: new Date(),
        updatedAt: new Date(),
        availableFrom: sanitizeDate(updatedForm.availableFrom) ? new Date(sanitizeDate(updatedForm.availableFrom) as string) : new Date(),
        universityTravelTimes: updatedForm.universityTravelTimes ? JSON.parse(updatedForm.universityTravelTimes) : undefined,
      };
      let res;
      if (updatedForm.id) {
        // Update existing listing
        res = await fetch(`/api/listings/${data.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        // Create new listing
        data.id = uuidv4();
        res = await fetch("/api/listings/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      if (res.ok) {
        setSuccess(true);
        setForm((f) => ({ ...f, description: "" }));
        setLastAddedId(data.id);
      } else {
        const errData = await res.json();
        setError(errData.error || "Failed to save property");
      }
    } catch {
      setError("Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    setForm,
    submitting,
    setSubmitting,
    success,
    setSuccess,
    error,
    setError,
    images,
    setImages,
    lastAddedId,
    ...amenitiesHook,
    ...mrtHook,
    handleChange,
    handleToggleUtility,
    handleSubmit,
    handleAutoPopulateCoordinates,
  };
}
