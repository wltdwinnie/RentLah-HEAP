import React from "react";
import { AddressSection } from "./AddressSection";
import { PropertyDetailsSection } from "./PropertyDetailsSection";
import { AmenitiesSection } from "./AmenitiesSection";
import { NearbyMRTSection } from "./NearbyMRTSection";
import { ParkingSection } from "./ParkingSection";
import { LeaseSection } from "./LeaseSection";
import { PreferencesSection } from "./PreferencesSection";
import { PropertyImageUploadSection } from "./PropertyImageUploadSection";
import { AddPropertyFormState, LocationInfo, MRTInfo } from "@/lib/definition";

export interface PropertyFormPageProps {
  form: AddPropertyFormState;
  setForm: React.Dispatch<React.SetStateAction<AddPropertyFormState>>;
  submitting: boolean;
  success: boolean;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  nearbyMRT: MRTInfo[];
  amenityName: string;
  setAmenityName: React.Dispatch<React.SetStateAction<string>>;
  amenityDistance: string;
  setAmenityDistance: React.Dispatch<React.SetStateAction<string>>;
  amenityType: string;
  setAmenityType: React.Dispatch<React.SetStateAction<string>>;
  amenities: LocationInfo[];
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleToggleUtility: (utility: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleAutoPopulateCoordinates: () => void;
  handleAutoPopulateMRT: (lat: number, lng: number) => Promise<MRTInfo[]>;
  handleAddAmenity: () => void;
  handleRemoveAmenity: (index: number) => void;
  title: string;
  availableFrom: string;
}

export function PropertyFormPage({
  form,
//   setForm,
  submitting,
  success,
  error,
  setError,
  images,
  setImages,
  nearbyMRT,
  amenityName,
  setAmenityName,
  amenityDistance,
  setAmenityDistance,
  amenityType,
  setAmenityType,
  amenities,
  handleChange,
  handleToggleUtility,
  handleSubmit,
  handleAutoPopulateCoordinates,
  handleAutoPopulateMRT,
  handleAddAmenity,
  handleRemoveAmenity,
  title,
  availableFrom,
}: PropertyFormPageProps) {
  function renderAvailableFrom(date: Date) {
    const today = new Date();
    if (date <= today)
      return (
        <span className="text-green-600 font-semibold">Available now</span>
      );
    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="mb-4">
        <strong>Available From: </strong>
        {availableFrom ? renderAvailableFrom(new Date(availableFrom)) : "-"}
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-lg rounded-2xl p-8"
      >
        <AddressSection
          form={form}
          handleChange={handleChange}
          handleAutoPopulateCoordinates={handleAutoPopulateCoordinates}
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-3 rounded-2xl w-full"
          required
        />
        <PropertyDetailsSection
          form={{
            ...form,
            bedrooms: form.bedrooms !== undefined ? String(form.bedrooms) : "",
            bathrooms:
              form.bathrooms !== undefined ? String(form.bathrooms) : "",
            sqft: form.sqft !== undefined ? String(form.sqft) : "",
          }}
          handleChange={handleChange}
        />
        <AmenitiesSection
          amenityName={amenityName}
          setAmenityName={setAmenityName}
          amenityDistance={amenityDistance}
          setAmenityDistance={setAmenityDistance}
          amenityType={amenityType}
          setAmenityType={setAmenityType}
          amenities={amenities}
          handleAddAmenity={handleAddAmenity}
          handleRemoveAmenity={handleRemoveAmenity}
        />
        <ParkingSection form={form} handleChange={handleChange} />
        <NearbyMRTSection
          form={form ? { coordinatesLat: form.coordinatesLat ?? "", coordinatesLng: form.coordinatesLng ?? "" } : { coordinatesLat: "", coordinatesLng: "" }}
          nearbyMRT={nearbyMRT}
          handleAutoPopulateMRT={handleAutoPopulateMRT}
        />
        <LeaseSection
          form={{
            ...form,
            perMonth: String(form.perMonth ?? ""),
            securityDeposit: String(form.securityDeposit ?? ""),
            facilities: String(form.facilities ?? ""),
            agentFee: form.agentFee !== undefined ? String(form.agentFee) : "",
          }}
          handleChange={handleChange}
          handleToggleUtility={handleToggleUtility}
        />
        <PreferencesSection form={form} handleChange={handleChange} />
        <PropertyImageUploadSection
          images={images}
          setImages={setImages}
          setError={setError}
        />
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-2xl transition-colors"
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>
        {success && (
          <div className="text-green-600">Property updated successfully!</div>
        )}
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
}
