import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export function PropertyImageUpload({
  onUploadComplete,
  onUploadError,
}: {
  onUploadComplete: (res: unknown) => void;
  onUploadError?: (error: Error) => void;
}) {
  return (
    <UploadButton<OurFileRouter, "imageUploader">
      endpoint="imageUploader"
      onClientUploadComplete={onUploadComplete}
      onUploadError={onUploadError}
    />
  );
}
