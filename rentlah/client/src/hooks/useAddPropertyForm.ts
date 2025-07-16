import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { geocodeAddress, fetchNearbyMRT } from "@/lib/address-utils";
import { AddPropertyFormState, LocationInfo } from "@/lib/definition";

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
    sqft: "",
    facilities: "",
    parkingAvailable: false,
    parkingType: "",
    parkingSpaces: "",
    nearbyAmenities: [],
    perMonth: "",
    utilitiesIncluded: "",
    securityDeposit: "",
    agentFee: "",
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
  const [nearbyMRT, setNearbyMRT] = useState<
    { name: string; line: string[]; distance: number }[]
  >([]);
  const [amenityName, setAmenityName] = useState("");
  const [amenityDistance, setAmenityDistance] = useState("");
  const [amenityType, setAmenityType] = useState("Mall");
  const [amenities, setAmenities] = useState<LocationInfo[]>([]);

  // Ensure userId is updated if user changes
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);
    try {
      // Auto-populate coordinates if missing
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
      const data = {
        id: uuidv4(),
        description: updatedForm.description,
        userId: updatedForm.userId,
        aptType: updatedForm.aptType,
        propertyType: updatedForm.propertyType,
        bedrooms: Number(updatedForm.bedrooms),
        bathrooms: Number(updatedForm.bathrooms),
        hasStudy: updatedForm.hasStudy,
        hasHelper: updatedForm.hasHelper,
        hasBalcony: updatedForm.hasBalcony,
        furnishing: updatedForm.furnishing,
        sqft: Number(updatedForm.sqft),
        addressBlk: Number(updatedForm.addressBlk),
        addressStreet: updatedForm.addressStreet,
        addressPostalCode: updatedForm.addressPostalCode,
        addressFloor: updatedForm.addressFloor
          ? Number(updatedForm.addressFloor)
          : undefined,
        addressUnit: updatedForm.addressUnit
          ? Number(updatedForm.addressUnit)
          : undefined,
        coordinates: {
          lat: Number(updatedForm.coordinatesLat),
          lng: Number(updatedForm.coordinatesLng),
        },
        nearbyMRT: nearbyMRT,
        facilities: updatedForm.facilities
          ? updatedForm.facilities.split(",").map((f: string) => f.trim())
          : [],
        parkingAvailable: updatedForm.parkingAvailable,
        parkingType:
          updatedForm.parkingType === "" ? null : updatedForm.parkingType,
        parkingSpaces: updatedForm.parkingSpaces
          ? Number(updatedForm.parkingSpaces)
          : undefined,
        nearbyAmenities: amenities,
        perMonth: updatedForm.perMonth,
        utilitiesIncluded: updatedForm.utilitiesIncluded
          ? updatedForm.utilitiesIncluded
              .split(",")
              .map((u: string) => u.trim())
          : [],
        securityDeposit: updatedForm.securityDeposit,
        agentFee: updatedForm.agentFee || undefined,
        leasePeriod: updatedForm.leasePeriod,
        preferredGender: updatedForm.preferredGender || "No Preference",
        preferredNationality:
          updatedForm.preferredNationality || "No Preference",
        preferredOccupation: updatedForm.preferredOccupation
          ? updatedForm.preferredOccupation
              .split(",")
              .map((o: string) => o.trim())
          : [],
        maxOccupants: Number(updatedForm.maxOccupants),
        images: images,
        isActive: updatedForm.isActive,
        isFeatured: updatedForm.isFeatured,
        isVerified: updatedForm.isVerified,
        universityTravelTimes: updatedForm.universityTravelTimes
          ? JSON.parse(updatedForm.universityTravelTimes)
          : {},
        availableFrom: updatedForm.availableFrom,
      };
      const res = await fetch("/api/listings/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSuccess(true);
        setForm((f) => ({ ...f, description: "" }));
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

  const handleAutoPopulateMRT = async (): Promise<
    {
      name: string;
      line: string[];
      distance: number;
    }[]
  > => {
    try {
      const lat = Number(form.coordinatesLat);
      const lng = Number(form.coordinatesLng);
      if (!lat || !lng) throw new Error("Coordinates required");
      const stations = await fetchNearbyMRT(lat, lng);
      setNearbyMRT(stations);
      return stations;
    } catch {
      setError("Failed to fetch nearby MRT stations");
      setNearbyMRT([]);
      return [];
    }
  };

  const handleAddAmenity = () => {
    if (!amenityName || !amenityDistance || isNaN(Number(amenityDistance)))
      return;
    setAmenities((prev) => [
      ...prev,
      {
        name: amenityName,
        distance: Number(amenityDistance),
        type: amenityType as LocationInfo["type"],
      },
    ]);
    setAmenityName("");
    setAmenityDistance("");
    setAmenityType("Mall");
  };

  const handleRemoveAmenity = (idx: number) => {
    setAmenities((prev) => prev.filter((_, i) => i !== idx));
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
    nearbyMRT,
    setNearbyMRT,
    amenityName,
    setAmenityName,
    amenityDistance,
    setAmenityDistance,
    amenityType,
    setAmenityType,
    amenities,
    setAmenities,
    handleChange,
    handleSubmit,
    handleAutoPopulateCoordinates,
    handleAutoPopulateMRT,
    handleAddAmenity,
    handleRemoveAmenity,
  };
}
