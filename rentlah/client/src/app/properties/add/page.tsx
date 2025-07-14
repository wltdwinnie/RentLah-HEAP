"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PropertyImageUpload } from "@/components/PropertyImageUpload";
import { FileUpload } from "@/components/ui/file-upload";
import { useRef } from "react";

// Helper to geocode address using Google Maps API
async function geocodeAddress(address: string, apiKey: string) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === "OK" && data.results.length > 0) {
    const loc = data.results[0].geometry.location;
    return { lat: loc.lat, lng: loc.lng };
  }
  throw new Error("Failed to geocode address");
}

// Helper to fetch nearby MRT stations from secure API route
async function fetchNearbyMRT(lat: number, lng: number) {
  const res = await fetch("/api/mrt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat, lng }),
  });
  if (!res.ok) throw new Error("Failed to fetch MRT stations");
  const data = await res.json();
  return data.stations || [];
}

export default function AddPropertyPage() {
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
    parkingType: "Covered",
    parkingSpaces: "",
    nearbyAmenities: "",
    perMonth: "",
    utilitiesIncluded: "",
    securityDeposit: "",
    agentFee: "",
    leasePeriod: "long-term",
    preferredGender: "No Preference",
    preferredNationality: "No Preference",
    preferredOccupation: "",
    maxOccupants: "",
    images: "",
    isActive: true,
    isFeatured: false,
    isVerified: false,
    universityTravelTimes: "",
    userId: "demo-user",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [amenityName, setAmenityName] = useState("");
  const [amenityDistance, setAmenityDistance] = useState("");
  const [amenityType, setAmenityType] = useState("Mall");
  const [amenities, setAmenities] = useState<
    {
      name: string;
      distance: number;
      type: string;
    }[]
  >([]);
  const [nearbyMRT, setNearbyMRT] = useState<
    { name: string; line: string[]; distance: number }[]
  >([]);
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (url: string) => {
    setImages((prev) => [...prev, url]);
    setForm((prev) => ({ ...prev, images: [...images, url].join(",") }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);
    // Prepare data for API
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
        nearbyMRT: nearbyMRT, // Use the state, not form
        facilities: form.facilities
          ? form.facilities.split(",").map((f: string) => f.trim())
          : [],
        parkingAvailable: form.parkingAvailable,
        parkingType: form.parkingType,
        parkingSpaces: form.parkingSpaces
          ? Number(form.parkingSpaces)
          : undefined,
        nearbyAmenities: amenities, // Use the state, not form
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
        const err = await res.json();
        setError(err.error || "Failed to add property");
      }
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  // Add a function to auto-populate coordinates
  const handleAutoPopulateCoordinates = async () => {
    try {
      const address = `${form.addressBlk} ${form.addressStreet} Singapore ${form.addressPostalCode}`;
      const coords = await geocodeAddress(address, GOOGLE_API_KEY);
      setForm((prev) => ({
        ...prev,
        coordinatesLat: coords.lat.toString(),
        coordinatesLng: coords.lng.toString(),
      }));
    } catch (err: any) {
      setError("Failed to fetch coordinates from address");
    }
  };

  // Auto-populate MRT stations after coordinates are set
  const handleAutoPopulateMRT = async () => {
    try {
      const lat = Number(form.coordinatesLat);
      const lng = Number(form.coordinatesLng);
      if (!lat || !lng) throw new Error("Coordinates required");
      const stations = await fetchNearbyMRT(lat, lng);
      setNearbyMRT(stations);
      setForm((prev) => ({ ...prev, nearbyMRT: JSON.stringify(stations) }));
    } catch (err) {
      setError("Failed to fetch nearby MRT stations");
    }
  };

  // Add amenity to list
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
  // Remove amenity
  const handleRemoveAmenity = (idx: number) => {
    setAmenities((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Add Property</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-lg rounded-2xl p-8"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            name="addressBlk"
            value={form.addressBlk}
            onChange={handleChange}
            placeholder="Block"
            className="border p-3 rounded-2xl"
            required
          />
          <input
            name="addressStreet"
            value={form.addressStreet}
            onChange={handleChange}
            placeholder="Street"
            className="border p-3 rounded-2xl"
            required
          />
          <input
            name="addressPostalCode"
            value={form.addressPostalCode}
            onChange={handleChange}
            placeholder="Postal Code"
            className="border p-3 rounded-2xl"
            required
          />
          <input
            name="addressFloor"
            value={form.addressFloor}
            onChange={handleChange}
            placeholder="Floor (optional)"
            className="border p-3 rounded-2xl"
          />
          <input
            name="addressUnit"
            value={form.addressUnit}
            onChange={handleChange}
            placeholder="Unit (optional)"
            className="border p-3 rounded-2xl"
          />
          <button
            type="button"
            onClick={handleAutoPopulateCoordinates}
            className="bg-blue-700 hover:bg-blue-800 text-white rounded-2xl p-3 transition-colors"
          >
            Auto-populate Coordinates
          </button>
          <input
            name="coordinatesLat"
            value={form.coordinatesLat}
            onChange={handleChange}
            placeholder="Latitude"
            className="border p-3 rounded-2xl"
            required
          />
          <input
            name="coordinatesLng"
            value={form.coordinatesLng}
            onChange={handleChange}
            placeholder="Longitude"
            className="border p-3 rounded-2xl"
            required
          />
        </div>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-3 rounded-2xl w-full"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <select
            name="aptType"
            value={form.aptType}
            onChange={handleChange}
            className="border p-3 rounded-2xl"
          >
            <option value="3-bedroom">3-bedroom</option>
            <option value="studio">Studio</option>
            <option value="1-bedroom">1-bedroom</option>
            <option value="2-bedroom">2-bedroom</option>
            <option value="4-bedroom">4-bedroom</option>
            <option value="5-bedroom">5-bedroom</option>
            <option value="penthouse">Penthouse</option>
            <option value="semi-detached">Semi-Detached</option>
            <option value="detached">Detached</option>
            <option value="others">Others</option>
          </select>
          <select
            name="propertyType"
            value={form.propertyType}
            onChange={handleChange}
            className="border p-3 rounded-2xl"
          >
            <option value="HDB">HDB</option>
            <option value="Condo">Condo</option>
            <option value="Landed">Landed</option>
          </select>
          <input
            name="bedrooms"
            type="number"
            value={form.bedrooms}
            onChange={handleChange}
            placeholder="Bedrooms"
            className="border p-3 rounded-2xl"
            required
          />
          <input
            name="bathrooms"
            type="number"
            value={form.bathrooms}
            onChange={handleChange}
            placeholder="Bathrooms"
            className="border p-3 rounded-2xl"
            required
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="hasStudy"
              checked={form.hasStudy}
              onChange={handleChange}
            />{" "}
            Study
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="hasHelper"
              checked={form.hasHelper}
              onChange={handleChange}
            />{" "}
            Helper's Room
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="hasBalcony"
              checked={form.hasBalcony}
              onChange={handleChange}
            />{" "}
            Balcony
          </label>
          <select
            name="furnishing"
            value={form.furnishing}
            onChange={handleChange}
            className="border p-3 rounded-2xl"
          >
            <option value="Unfurnished">Unfurnished</option>
            <option value="Partially Furnished">Partially Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
          </select>
          <input
            name="sqft"
            value={form.sqft}
            onChange={handleChange}
            placeholder="Square Feet"
            className="border p-3 rounded-2xl"
            required
          />
        </div>
        <input
          name="facilities"
          value={form.facilities}
          onChange={handleChange}
          placeholder="Facilities (comma separated)"
          className="border p-3 rounded-2xl w-full"
        />
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="parkingAvailable"
              checked={form.parkingAvailable}
              onChange={handleChange}
            />{" "}
            Parking Available
          </label>
          <select
            name="parkingType"
            value={form.parkingType}
            onChange={handleChange}
            className="border p-3 rounded-2xl"
          >
            <option value="Covered">Covered</option>
            <option value="Open">Open</option>
            <option value="Mechanical">Mechanical</option>
          </select>
          <input
            name="parkingSpaces"
            value={form.parkingSpaces}
            onChange={handleChange}
            placeholder="Parking Spaces"
            className="border p-3 rounded-2xl"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Nearby MRT</label>
          <button
            type="button"
            onClick={handleAutoPopulateMRT}
            className="bg-blue-700 hover:bg-blue-800 text-white rounded-2xl p-2 mb-2 transition-colors"
          >
            Auto-populate Nearby MRT
          </button>
          <ul>
            {nearbyMRT.length === 0 && (
              <li className="text-gray-500">No stations found yet.</li>
            )}
            {nearbyMRT.map((mrt, idx) => (
              <li key={idx} className="mb-1">
                <span className="font-semibold">{mrt.name}</span>{" "}
                <span className="text-sm text-gray-600">({mrt.distance}m)</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="perMonth"
            value={form.perMonth}
            onChange={handleChange}
            placeholder="Monthly Rent"
            className="border p-3 rounded-2xl"
            required
          />
          <input
            name="utilitiesIncluded"
            value={form.utilitiesIncluded}
            onChange={handleChange}
            placeholder="Utilities Included (comma separated)"
            className="border p-3 rounded-2xl"
          />
          <input
            name="securityDeposit"
            value={form.securityDeposit}
            onChange={handleChange}
            placeholder="Security Deposit"
            className="border p-3 rounded-2xl"
            required
          />
          <input
            name="agentFee"
            value={form.agentFee}
            onChange={handleChange}
            placeholder="Agent Fee (optional)"
            className="border p-3 rounded-2xl"
          />
          <select
            name="leasePeriod"
            value={form.leasePeriod}
            onChange={handleChange}
            className="border p-3 rounded-2xl"
          >
            <option value="long-term">Long-term</option>
            <option value="short-term">Short-term</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <select
            name="preferredGender"
            value={form.preferredGender}
            onChange={handleChange}
            className="border p-3 rounded-2xl"
          >
            <option value="No Preference">No Preference</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select
            name="preferredNationality"
            value={form.preferredNationality}
            onChange={handleChange}
            className="border p-3 rounded-2xl"
          >
            <option value="No Preference">No Preference</option>
            <option value="Singaporean/PR">Singaporean/PR</option>
            <option value="Foreigner">Foreigner</option>
          </select>
          <input
            name="preferredOccupation"
            value={form.preferredOccupation}
            onChange={handleChange}
            placeholder="Preferred Occupation (comma separated)"
            className="border p-3 rounded-2xl"
          />
          <input
            name="maxOccupants"
            value={form.maxOccupants}
            onChange={handleChange}
            placeholder="Max Occupants"
            className="border p-3 rounded-2xl"
            required
          />
        </div>
        {/* UploadThing image upload */}
        <div>
          <label className="block mb-2 font-medium">Upload Images</label>
          <FileUpload
            multiple
            onFilesSelected={async (files) => {
              // You can integrate UploadThing or your own upload logic here
              // For now, just preview the images
              const urls: string[] = [];
              for (let i = 0; i < files.length; i++) {
                urls.push(URL.createObjectURL(files[i]));
              }
              setImages(urls);
              // If you want to upload to UploadThing, call your upload logic here
            }}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Property image ${idx + 1}`}
                className="w-24 h-24 object-cover rounded-xl border"
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-2xl transition-colors"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Add Property"}
        </button>
        {success && (
          <div className="text-green-600">Property added successfully!</div>
        )}
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
}
