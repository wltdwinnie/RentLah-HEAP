import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { geocodeAddress, fetchNearbyMRT } from "@/lib/address-utils";

export function useAddPropertyForm(user: any, GOOGLE_API_KEY: string) {
  const [form, setForm] = useState({
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
    userId: user?.id || "",
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
  const [amenities, setAmenities] = useState<any[]>([]);

  // Ensure userId is updated if user changes
  // This effect will update form.userId whenever the user prop changes
  useEffect(() => {
    setForm((prev) => ({ ...prev, userId: user?.id || "" }));
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
      const data = {
        id: uuidv4(),
        description: form.description,
        userId: form.userId,
        aptType: form.aptType,
        propertyType: form.propertyType,
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        hasStudy: form.hasStudy,
        hasHelper: form.hasHelper,
        hasBalcony: form.hasBalcony,
        furnishing: form.furnishing,
        sqft: Number(form.sqft),
        addressBlk: Number(form.addressBlk),
        addressStreet: form.addressStreet,
        addressPostalCode: form.addressPostalCode,
        addressFloor: form.addressFloor ? Number(form.addressFloor) : undefined,
        addressUnit: form.addressUnit ? Number(form.addressUnit) : undefined,
        coordinates: {
          lat: Number(form.coordinatesLat),
          lng: Number(form.coordinatesLng),
        },
        nearbyMRT: nearbyMRT,
        facilities: form.facilities
          ? form.facilities.split(",").map((f: string) => f.trim())
          : [],
        parkingAvailable: form.parkingAvailable,
        parkingType: form.parkingType === "" ? null : form.parkingType,
        parkingSpaces: form.parkingSpaces
          ? Number(form.parkingSpaces)
          : undefined,
        nearbyAmenities: amenities,
        perMonth: form.perMonth,
        utilitiesIncluded: form.utilitiesIncluded
          ? form.utilitiesIncluded.split(",").map((u: string) => u.trim())
          : [],
        securityDeposit: form.securityDeposit,
        agentFee: form.agentFee || undefined,
        leasePeriod: form.leasePeriod,
        preferredGender: form.preferredGender,
        preferredNationality: form.preferredNationality,
        preferredOccupation: form.preferredOccupation
          ? form.preferredOccupation.split(",").map((o: string) => o.trim())
          : [],
        maxOccupants: Number(form.maxOccupants),
        images: images,
        isActive: form.isActive,
        isFeatured: form.isFeatured,
        isVerified: form.isVerified,
        universityTravelTimes: form.universityTravelTimes
          ? JSON.parse(form.universityTravelTimes)
          : {},
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

  const handleAutoPopulateMRT = async (): Promise<{
    name: string;
    line: string[];
    distance: number;
  }[]> => {
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
        type: amenityType,
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
