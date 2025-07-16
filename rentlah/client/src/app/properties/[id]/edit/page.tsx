"use client";

import { useEffect, useState } from "react";
import { useAddPropertyForm } from "@/hooks/useAddPropertyForm";
import { AddressSection } from "@/components/addproperty/AddressSection";
import { PropertyDetailsSection } from "@/components/addproperty/PropertyDetailsSection";
import { AmenitiesSection } from "@/components/addproperty/AmenitiesSection";
import { ParkingSection } from "@/components/addproperty/ParkingSection";
import { LeaseSection } from "@/components/addproperty/LeaseSection";
import { PreferencesSection } from "@/components/addproperty/PreferencesSection";
import { PropertyImageUploadSection } from "@/components/addproperty/PropertyImageUploadSection";
import { getListingById } from "@/db/queries/select";
import { NearbyMRTSection } from "@/components/addproperty/NearbyMRTSection";
import { Listing } from "@/lib/definition";

export default function EditPropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<any>();

  useEffect(() => {
    async function fetchListing() {
      const listing = await getListingById(params.id);
      setInitialData(listing[0]);
      setLoading(false);
    }
    fetchListing();
  }, [params.id]);

  // Use the custom hook for all form state and handlers
  const {
    form,
    setForm,
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
    handleSubmit,
    handleAutoPopulateCoordinates,
    handleAutoPopulateMRT,
    handleAddAmenity,
    handleRemoveAmenity,
  } = useAddPropertyForm(
    initialData,
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  );

  useEffect(() => {
    if (initialData) {
      setForm({ ...form, ...initialData });
      setImages(initialData.images || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Property</h1>
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
            bedrooms: String(form.bedrooms ?? ""),
            bathrooms: String(form.bathrooms ?? ""),
            sqft: String(form.sqft ?? ""),
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
          nearbyMRT={nearbyMRT}
          handleAutoPopulateMRT={handleAutoPopulateMRT}
        />
        <LeaseSection form={form} handleChange={handleChange} />
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
