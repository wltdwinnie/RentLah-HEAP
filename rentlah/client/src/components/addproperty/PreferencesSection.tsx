import React from "react";

export function PreferencesSection({ form, handleChange }: any) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <select
        name="preferredGender"
        value={form.preferredGender}
        onChange={handleChange}
        className="border p-3 rounded-2xl"
      >
        <option value="No Preference">No Preference</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <select
        name="preferredNationality"
        value={form.preferredNationality}
        onChange={handleChange}
        className="border p-3 rounded-2xl"
      >
        <option value="No Preference">No Preference</option>
        <option value="Singaporean/PR">Singaporean/PR</option>
        <option value="Foreigner">Foreigner</option>
      </select>
      <input
        name="preferredOccupation"
        value={form.preferredOccupation}
        onChange={handleChange}
        placeholder="Preferred Occupation (comma separated)"
        className="border p-3 rounded-2xl"
      />
      <input
        name="maxOccupants"
        value={form.maxOccupants}
        onChange={handleChange}
        placeholder="Max Occupants"
        className="border p-3 rounded-2xl"
        required
      />
    </div>
  );
}
