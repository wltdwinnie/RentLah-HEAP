import { PropertyImageUpload } from "@/components/addproperty/PropertyImageUpload";
import Image from "next/image";
import React from "react";

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
  return (
    <div>
      <label className="block mb-2 font-medium">Upload Images</label>
      <div className="bg-blue-500 border-2 border-dashed border-blue-800 rounded-xl p-6 flex flex-col items-center justify-center mb-4 min-h-[120px]">
        {/* Force all text inside this rectangle to be white */}
        <style>{`
          .upload-rectangle * {
            color: #fff !important;
          }
          .upload-rectangle input[type='file']::file-selector-button,
          .upload-rectangle input[type='file']::-webkit-file-upload-button {
            color: #fff !important;
            background: #3b82f6 !important;
            border: 1px solid #fff !important;
          }
        `}</style>
        <div className="upload-rectangle w-full flex flex-col items-center">
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
            onUploadError={(err) =>
              setError(err.message || "Image upload failed")
            }
          />
        </div>
      </div>
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
      {images.length > 0 && (
        <div className="text-green-600 font-medium mt-2">Images uploaded!</div>
      )}
    </div>
  );
}
