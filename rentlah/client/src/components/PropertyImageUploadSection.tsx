import { PropertyImageUpload } from "@/components/addproperty/PropertyImageUpload";
import Image from "next/image";
import React, { useRef } from "react";

interface PropertyImageUploadSectionProps {
  images: string[];
  setImages: (urls: string[]) => void;
  setError: (msg: string) => void;
}

export function PropertyImageUploadSection({
  images,
  setImages,
  setError,
}: PropertyImageUploadSectionProps) {
  // Ref to trigger file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handler for manual file input (if PropertyImageUpload does not expose its own button)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    // If PropertyImageUpload can accept files directly, pass them here
    // Otherwise, handle upload logic here
    // For now, just clear the input
    e.target.value = "";
  };

  return (
    <div>
      <label className="block mb-2 font-medium">Upload Images</label>

      {/* PropertyImageUpload component (UploadThing) */}
      <PropertyImageUpload
        onUploadComplete={(res) => {
          const urls = Array.isArray(res)
            ? res
                .map(
                  (file: { url?: string; ufsUrl?: string }) =>
                    file.url || file.ufsUrl
                )
                .filter((u): u is string => Boolean(u))
            : [];
          setImages(urls);
        }}
        onUploadError={(err) => setError(err.message || "Image upload failed")}
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`Property image ${idx + 1}`}
            width={96}
            height={96}
            className="w-24 h-24 object-cover rounded-xl border"
          />
        ))}
      </div>

      {/* Hidden file input for manual trigger */}
      <input
        id="property-image-upload-input"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button
        type="button"
        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-2xl transition-colors mb-2"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload Image
      </button>
    </div>
  );
}
