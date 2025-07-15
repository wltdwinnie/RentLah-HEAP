import React from "react";

export function ParkingSection({ form, handleChange }: any) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="parkingAvailable"
          checked={form.parkingAvailable}
          onChange={handleChange}
        />{" "}
        Parking Available
      </label>
      {form.parkingAvailable && (
        <>
          <select
            name="parkingType"
            value={form.parkingType}
            onChange={handleChange}
            className="border p-3 rounded-2xl"
          >
            <option value="Covered">Covered</option>
            <option value="Open">Open</option>
            <option value="Mechanical">Mechanical</option>
          </select>
          <input
            name="parkingSpaces"
            value={form.parkingSpaces}
            onChange={handleChange}
            placeholder="Parking Spaces"
            className="border p-3 rounded-2xl"
          />
        </>
      )}
    </div>
  );
}
