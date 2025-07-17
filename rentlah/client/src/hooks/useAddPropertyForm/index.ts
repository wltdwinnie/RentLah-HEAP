// Main useAddPropertyForm hook, imports helpers/hooks
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { geocodeAddress } from "@/lib/address-utils";
import { AddPropertyFormState } from "@/lib/definition";
import { useAmenities } from "./useAmenities";
import { useMRT } from "./useMRT";
import {
  sanitizeFacilities,
  sanitizeOccupation,
  sanitizeNumber,
  sanitizeArray,
  sanitizeDate,
} from "./validation";

export function useAddPropertyForm(user: string, GOOGLE_API_KEY: string) {
  const [form, setForm] = useState<AddPropertyFormState>({
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
    } catch {
      setError("Failed to fetch coordinates from address");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);
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
        } catch {
          setError(
            "Failed to auto-populate coordinates. Please check the address."
          );
          setSubmitting(false);
          return;
        }
      }
      // Data sanitization
      const data = {
        id: uuidv4(),
        description: updatedForm.description,
        userId: updatedForm.userId,
        aptType: updatedForm.aptType,
        propertyType: updatedForm.propertyType,
        bedrooms: sanitizeNumber(updatedForm.bedrooms),
        bathrooms: sanitizeNumber(updatedForm.bathrooms),
        hasStudy: !!updatedForm.hasStudy,
        hasHelper: !!updatedForm.hasHelper,
        hasBalcony: !!updatedForm.hasBalcony,
        furnishing: updatedForm.furnishing,
        sqft: sanitizeNumber(updatedForm.sqft),
        addressBlk: sanitizeNumber(updatedForm.addressBlk),
        addressStreet: updatedForm.addressStreet,
        addressPostalCode: updatedForm.addressPostalCode,
        addressFloor: updatedForm.addressFloor
          ? sanitizeNumber(updatedForm.addressFloor)
          : undefined,
        addressUnit: updatedForm.addressUnit
          ? sanitizeNumber(updatedForm.addressUnit)
          : undefined,
        coordinates: {
          lat: sanitizeNumber(updatedForm.coordinatesLat),
          lng: sanitizeNumber(updatedForm.coordinatesLng),
        },
        nearbyMRT: mrtHook.nearbyMRT,
        facilities: sanitizeFacilities(updatedForm.facilities),
        parkingAvailable: !!updatedForm.parkingAvailable,
        parkingType:
          updatedForm.parkingType === "" ? null : updatedForm.parkingType,
        parkingSpaces: updatedForm.parkingSpaces
          ? sanitizeNumber(updatedForm.parkingSpaces)
          : 0,
        nearbyAmenities: amenitiesHook.amenities,
        perMonth: sanitizeNumber(updatedForm.perMonth),
        utilitiesIncluded: sanitizeArray(updatedForm.utilitiesIncluded),
        deposit: sanitizeNumber(updatedForm.securityDeposit),
        agentFee: updatedForm.agentFee
          ? sanitizeNumber(updatedForm.agentFee)
          : undefined,
        leasePeriod: updatedForm.leasePeriod,
        preferredGender: updatedForm.preferredGender || "No Preference",
        preferredNationality:
          updatedForm.preferredNationality || "No Preference",
        preferredOccupation: sanitizeOccupation(
          updatedForm.preferredOccupation
        ),
        maxOccupants: sanitizeNumber(updatedForm.maxOccupants),
        images: images,
        isActive: !!updatedForm.isActive,
        isFeatured: !!updatedForm.isFeatured,
        isVerified: !!updatedForm.isVerified,
        universityTravelTimes: updatedForm.universityTravelTimes,
        availableFrom: sanitizeDate(updatedForm.availableFrom),
      };
      const res = await fetch("/api/listings/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSuccess(true);
        setForm((f) => ({ ...f, description: "" }));
        setLastAddedId(data.id);
      } else {
        const errData = await res.json();
        setError(errData.error || "Failed to add property");
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
