import { useRef } from "react";

interface FileUploadProps {
  onFilesSelected: (files: FileList) => void;
  multiple?: boolean;
}

export function FileUpload({
  onFilesSelected,
  multiple = false,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        className="bg-[var(--foreground)] text-[var(--background)] px-4 py-2 rounded-2xl font-medium hover:opacity-90 transition border border-[var(--foreground)]"
        onClick={() => inputRef.current?.click()}
      >
        Upload Images
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) onFilesSelected(e.target.files);
        }}
      />
    </div>
  );
}
