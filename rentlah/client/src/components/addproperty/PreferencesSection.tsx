import React from "react";
import { floatingLabel, floatingInput, floatingSelect } from "./floatingStyles";
import { GENDER_TYPES, NATIONALITY_TYPES } from "@/lib/constants";

interface PrefrenceSectionProps {
  form: {
    preferredGender: string;
    preferredNationality: string;
    preferredOccupation: string;
    maxOccupants: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export function PreferencesSection({
  form,
  handleChange,
}: PrefrenceSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="relative">
        <select
          name="preferredGender"
          value={form.preferredGender}
          onChange={handleChange}
          className={floatingSelect}
        >
          {GENDER_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <label className={floatingLabel}>Preferred Gender</label>
      </div>
      <div className="relative">
        <select
          name="preferredNationality"
          value={form.preferredNationality}
          onChange={handleChange}
          className={floatingSelect}
        >
          {NATIONALITY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <label className={floatingLabel}>Preferred Nationality</label>
      </div>
      <div className="relative">
        <input
          name="preferredOccupation"
          value={form.preferredOccupation}
          onChange={handleChange}
          className={floatingInput}
          placeholder=" "
        />
        <label className={floatingLabel}>Preferred Occupation</label>
      </div>
      <div className="relative">
        <input
          name="maxOccupants"
          value={form.maxOccupants}
          onChange={handleChange}
          className={floatingInput}
          required
          placeholder=" "
        />
        <label className={floatingLabel}>Max Occupants</label>
      </div>
    </div>
  );
}
