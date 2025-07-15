"use client";
import { useEffect, useState } from "react";
import { PropertyImageUploadSection } from "@/components/addproperty/PropertyImageUploadSection";
import { AddressSection } from "@/components/addproperty/AddressSection";
import { AmenitiesSection } from "@/components/addproperty/AmenitiesSection";
import { NearbyMRTSection } from "@/components/addproperty/NearbyMRTSection";
import { authClient } from "@/lib/authClient";
import { PropertyDetailsSection } from "@/components/addproperty/PropertyDetailsSection";
import { PreferencesSection } from "@/components/addproperty/PreferencesSection";
import { ParkingSection } from "@/components/addproperty/ParkingSection";
import { LeaseSection } from "@/components/addproperty/LeaseSection";
import { useAddPropertyForm } from "@/components/addproperty/useAddPropertyForm";

export default function AddPropertyPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await authClient.getSession();
      if (session && session.data && session.data.user) {
        setUser(session.data.user);
      }
    };
    fetchUser();
    const interval = setInterval(fetchUser, 600000); // refresh every 10 min
    return () => clearInterval(interval);
  }, []);

  const isVerifiedUser = user || false; // Use user verification status from Better Auth
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  // Use the custom hook for all form state and handlers
  const {
    form,
    // setForm,
    submitting,
    // setSubmitting,
    success,
    // setSuccess,
    error,
    setError,
    images,
    setImages,
    nearbyMRT,
    // setNearbyMRT,
    amenityName,
    setAmenityName,
    amenityDistance,
    setAmenityDistance,
    amenityType,
    setAmenityType,
    amenities,
    // setAmenities,
    handleChange,
    handleSubmit,
    handleAutoPopulateCoordinates,
    handleAutoPopulateMRT,
    handleAddAmenity,
    handleRemoveAmenity,
  } = useAddPropertyForm(user, GOOGLE_API_KEY);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Add Property</h1>
      {!isVerifiedUser ? (
        /* Display a message for unverified users */
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-2xl text-center font-semibold">
          Only verified users can add new listings. Please verify your account
          to continue.
        </div>
      ) : (
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

          <PropertyDetailsSection form={form} handleChange={handleChange} />

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

          {/* UploadThing image upload */}
          <PropertyImageUploadSection
            images={images}
            setImages={setImages}
            setError={setError}
          />

          {/* Submit */}
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
      )}
    </div>
  );
}
