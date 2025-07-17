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
import { useAddPropertyForm } from "@/hooks/useAddPropertyForm/index";
import { useRouter } from "next/navigation";
import { MRTInfo } from "@/lib/definition";

export default function AddPropertyPage() {
  const [user, setUser] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const session = await authClient.getSession();
      if (session && session.data && session.data.user) {
        setUser(session.data.user.id);
      }
    };
    fetchUser();
    const interval = setInterval(fetchUser, 1800000); // refresh every 30 min
    return () => clearInterval(interval);
  }, []);

  const isVerifiedUser = (user && user != "") || false; // Use user verification status from Better Auth
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  // Use the custom hook for all form state and handlers
  const {
    form,
    submitting,
    success,
    error,
    setError,
    images,
    setImages,
    lastAddedId,
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
  } = useAddPropertyForm(user, GOOGLE_API_KEY);

  // Track MRT fetch status for user feedback
  const [mrtStatus, setMrtStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [mrtErrorMsg, setMrtErrorMsg] = useState("");

  // Wrap the hook's MRT handler to update status
  const handleAutoPopulateMRTWithStatus = async (lat: number, lng: number): Promise<MRTInfo[]> => {
    setMrtStatus("loading");
    setMrtErrorMsg("");
    try {
      const stations = await handleAutoPopulateMRT(lat, lng);
      if (Array.isArray(stations) && stations.length > 0) {
        setMrtStatus("success");
      } else {
        setMrtStatus("success"); // No stations found, but not an error
      }
      return stations;
    } catch {
      setMrtStatus("error");
      setMrtErrorMsg("Failed to fetch nearby MRT stations");
      return [];
    }
  };

  // Show modal when success is true
  useEffect(() => {
    if (success) setShowSuccessModal(true);
  }, [success]);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Add Property</h1>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">Property added successfully!</h2>
            <div className="flex flex-col gap-4">
              <button
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-2xl"
                onClick={() => {
                  setShowSuccessModal(false);
                  window.location.reload();
                }}
              >
                Add another listing
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-2xl"
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push(`/properties/${lastAddedId}`);
                }}
              >
                View added property
              </button>
            </div>
          </div>
        </div>
      )}
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

          {/* MRT status indicator */}
          <div>
            {mrtStatus === "idle" && (
              <span className="text-gray-500">Nearby MRT not fetched yet.</span>
            )}
            {mrtStatus === "loading" && (
              <span className="text-blue-600">
                Fetching nearby MRT stations...
              </span>
            )}
            {mrtStatus === "success" && (
              <span className="text-green-600">
                {nearbyMRT.length > 0
                  ? `Fetched ${nearbyMRT.length} nearby MRT station${
                      nearbyMRT.length > 1 ? "s" : ""
                    }.`
                  : "No nearby MRT stations found."}
              </span>
            )}
            {mrtStatus === "error" && (
              <span className="text-red-600">
                {mrtErrorMsg || "Failed to fetch nearby MRT stations."}
              </span>
            )}
          </div>
          <NearbyMRTSection
            form={form}
            nearbyMRT={nearbyMRT}
            handleAutoPopulateMRT={handleAutoPopulateMRTWithStatus}
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
