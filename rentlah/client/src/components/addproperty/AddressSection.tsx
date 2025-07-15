import React from "react";

interface AddressForm {
  addressBlk: string;
  addressStreet: string;
  addressPostalCode: string;
  addressFloor?: string;
  addressUnit?: string;
  coordinatesLat: string;
  coordinatesLng: string;
}

interface AddressSectionProps {
  form: AddressForm;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleAutoPopulateCoordinates: () => void;
}

export function AddressSection({
  form,
  handleChange,
  handleAutoPopulateCoordinates,
}: AddressSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <input
        name="addressBlk"
        value={form.addressBlk}
        onChange={handleChange}
        placeholder="Block"
        className="border p-3 rounded-2xl"
        required
      />
      <input
        name="addressStreet"
        value={form.addressStreet}
        onChange={handleChange}
        placeholder="Street"
        className="border p-3 rounded-2xl"
        required
      />
      <input
        name="addressPostalCode"
        value={form.addressPostalCode}
        onChange={handleChange}
        placeholder="Postal Code"
        className="border p-3 rounded-2xl"
        required
      />
      <input
        name="addressFloor"
        value={form.addressFloor}
        onChange={handleChange}
        placeholder="Floor (optional)"
        className="border p-3 rounded-2xl"
      />
      <input
        name="addressUnit"
        value={form.addressUnit}
        onChange={handleChange}
        placeholder="Unit (optional)"
        className="border p-3 rounded-2xl"
      />
      <button
        type="button"
        onClick={handleAutoPopulateCoordinates}
        className="bg-blue-700 hover:bg-blue-800 text-white rounded-2xl p-3 transition-colors"
      >
        Auto-populate Coordinates
      </button>
      <input
        name="coordinatesLat"
        value={form.coordinatesLat}
        onChange={handleChange}
        placeholder="Latitude"
        className="border p-3 rounded-2xl"
        required
      />
      <input
        name="coordinatesLng"
        value={form.coordinatesLng}
        onChange={handleChange}
        placeholder="Longitude"
        className="border p-3 rounded-2xl"
        required
      />
    </div>
  );
}
