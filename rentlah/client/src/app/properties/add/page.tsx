"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/authClient";
import { useAddPropertyForm } from "@/hooks/useAddPropertyForm/index";
import { useRouter } from "next/navigation";
import { MRTInfo } from "@/lib/definition";
import { PropertyFormPage } from "@/components/addproperty/PropertyFormPage";

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
    setForm,
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
      console.log(mrtStatus, mrtErrorMsg);
      return [];
    }
  };

  // Show modal when success is true
  useEffect(() => {
    if (success) setShowSuccessModal(true);
  }, [success]);

  return (
    <div className="max-w-2xl mx-auto py-8">
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
          handleAutoPopulateMRT={handleAutoPopulateMRTWithStatus}
          handleAddAmenity={handleAddAmenity}
          handleRemoveAmenity={handleRemoveAmenity}
          title="Add Property"
          availableFrom={form.availableFrom}
          mode="add"
        />
      )}
    </div>
  );
}
