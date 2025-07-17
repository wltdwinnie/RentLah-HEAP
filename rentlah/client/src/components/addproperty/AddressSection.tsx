import React from "react";
import { floatingLabel, floatingInput } from "./floatingStyles";

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
      <div className="relative">
        <input
          name="addressBlk"
          value={form.addressBlk}
          onChange={handleChange}
          className={floatingInput}
          required
          placeholder=" "
        />
        <label className={floatingLabel}>Block</label>
      </div>
      <div className="relative">
        <input
          name="addressStreet"
          value={form.addressStreet}
          onChange={handleChange}
          className={floatingInput}
          required
          placeholder=" "
        />
        <label className={floatingLabel}>Street</label>
      </div>
      <div className="relative">
        <input
          name="addressPostalCode"
          value={form.addressPostalCode}
          onChange={handleChange}
          className={floatingInput}
          required
          placeholder=" "
        />
        <label className={floatingLabel}>Postal Code</label>
      </div>
      <div className="relative">
        <input
          name="addressFloor"
          value={form.addressFloor}
          onChange={handleChange}
          className={floatingInput}
          placeholder=" "
        />
        <label className={floatingLabel}>Floor (optional)</label>
      </div>
      <div className="relative">
        <input
          name="addressUnit"
          value={form.addressUnit}
          onChange={handleChange}
          className={floatingInput}
          placeholder=" "
        />
        <label className={floatingLabel}>Unit (optional)</label>
      </div>
      <div className="relative">
        <input
          name="coordinatesLat"
          value={form.coordinatesLat}
          onChange={handleChange}
          className={floatingInput}
          required
          placeholder=" "
        />
        <label className={floatingLabel}>Latitude</label>
      </div>
      <div className="relative">
        <input
          name="coordinatesLng"
          value={form.coordinatesLng}
          onChange={handleChange}
          className={floatingInput}
          required
          placeholder=" "
        />
        <label className={floatingLabel}>Longitude</label>
      </div>
      <div className="col-span-2">
        <button
          type="button"
          onClick={handleAutoPopulateCoordinates}
          className="bg-blue-700 hover:bg-blue-800 text-white rounded-2xl p-2 mt-2 transition-colors"
        >
          Auto-populate Coordinates
        </button>
      </div>
    </div>
  );
}
