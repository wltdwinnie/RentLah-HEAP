"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useAddPropertyForm } from "@/hooks/useAddPropertyForm/index";
import { Listing, MRTInfo } from "@/lib/definition";
import { UtilityType } from "@/lib/constants";
import { PropertyFormPage } from "@/components/addproperty/PropertyFormPage";
import { useRouter } from "next/navigation";

export default function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<Listing | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchListing() {
      const res = await fetch(`/api/listings?id=${id}`);
      const listings = await res.json();
      setInitialData(listings[0]);
      setLoading(false);
    }
    fetchListing();
  }, [id]);

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
    handleToggleUtility,
    handleSubmit,
    handleAutoPopulateCoordinates,
    handleAutoPopulateMRT,
    handleAddAmenity,
    handleRemoveAmenity,
  } = useAddPropertyForm(
    id,
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  );

  useEffect(() => {
    if (initialData) {
      setForm({
        ...form,
        ...initialData,
        addressBlk: initialData.address?.blk?.toString() ?? "",
        addressStreet: initialData.address?.street ?? "",
        addressPostalCode: initialData.address?.postalCode ?? "",
        addressFloor: initialData.address?.floor?.toString() ?? "",
        addressUnit: initialData.address?.unit?.toString() ?? "",
        coordinatesLat: initialData.address?.coordinates?.lat?.toString() ?? "",
        coordinatesLng: initialData.address?.coordinates?.lng?.toString() ?? "",
        bedrooms: initialData.roomConfig?.bedrooms ?? 0,
        bathrooms: initialData.roomConfig?.bathrooms ?? 0,
        sqft: initialData.sqft ?? 0,
        facilities: Array.isArray(initialData.facilities)
          ? initialData.facilities
          : initialData.facilities
          ? [initialData.facilities]
          : [],
        utilitiesIncluded: Array.isArray(initialData.utilitiesIncluded)
          ? initialData.utilitiesIncluded as UtilityType[]
          : [],
        securityDeposit: initialData.deposit ?? initialData.perMonth,
        agentFee: initialData.agentFee ?? 0,
        perMonth: initialData.perMonth ?? 0,
        universityTravelTimes: initialData.universityTravelTimes
          ? JSON.stringify(initialData.universityTravelTimes)
          : "",
        availableFrom: initialData.availableFrom
          ? new Date(initialData.availableFrom).toISOString().slice(0, 10)
          : "",
      });
      setImages(initialData.images || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  useEffect(() => {
    if (success) setShowSuccessModal(true);
  }, [success]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">Property updated successfully!</h2>
            <div className="flex flex-col gap-4">
              <button
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-2xl"
                onClick={() => {
                  setShowSuccessModal(false);
                  window.location.reload();
                }}
              >
                Edit another listing
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-2xl"
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push(`/properties/${id}`);
                }}
              >
                View updated property
              </button>
            </div>
          </div>
        </div>
      )}
      <PropertyFormPage
        form={form}
        setForm={setForm}
        submitting={submitting}
        success={success}
        error={error}
        setError={setError}
        images={images}
        setImages={setImages}
        nearbyMRT={nearbyMRT as MRTInfo[]}
        amenityName={amenityName}
        setAmenityName={setAmenityName}
        amenityDistance={amenityDistance}
        setAmenityDistance={setAmenityDistance}
        amenityType={amenityType}
        setAmenityType={setAmenityType}
        amenities={amenities}
        handleChange={handleChange}
        handleToggleUtility={handleToggleUtility}
        handleSubmit={handleSubmit}
        handleAutoPopulateCoordinates={handleAutoPopulateCoordinates}
        handleAutoPopulateMRT={handleAutoPopulateMRT}
        handleAddAmenity={handleAddAmenity}
        handleRemoveAmenity={handleRemoveAmenity}
        title="Edit Property"
        availableFrom={form.availableFrom}
      />
    </>
  );
}
