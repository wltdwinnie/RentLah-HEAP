'use client';
import { useRouter } from "next/navigation";

export default function AddPropertyButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      style={{
        padding: "0.5rem 1.2rem",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "1rem",
        marginTop: "0.5rem",
      }}
      onClick={() => router.push("/properties/add")}
    >
      List Property
    </button>
  );
}
