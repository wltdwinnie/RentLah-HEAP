import React from "react";
import { floatingLabel, floatingInput, floatingSelect } from "./floatingStyles";
import { PARKING_TYPES } from "@/lib/constants";

interface ParkingSectionProps {
  form: {
    parkingAvailable: boolean;
    parkingType: string;
    parkingSpaces: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export function ParkingSection({ form, handleChange }: ParkingSectionProps) {
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
          <div className="relative">
            <select
              name="parkingType"
              value={form.parkingType}
              onChange={handleChange}
              className={floatingSelect}
            >
              {PARKING_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <label className={floatingLabel}>Parking Type</label>
          </div>
          <div className="relative">
            <input
              name="parkingSpaces"
              value={form.parkingSpaces}
              onChange={handleChange}
              className={floatingInput}
              placeholder=" "
            />
            <label className={floatingLabel}>Parking Spaces</label>
          </div>
        </>
      )}
    </div>
  );
}
