import React from "react";

export function PropertyDetailsSection({ form, handleChange }: any) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <select
        name="aptType"
        value={form.aptType}
        onChange={handleChange}
        className="border p-3 rounded-2xl"
      >
        <option value="3-bedroom">3-bedroom</option>
        <option value="studio">Studio</option>
        <option value="1-bedroom">1-bedroom</option>
        <option value="2-bedroom">2-bedroom</option>
        <option value="4-bedroom">4-bedroom</option>
        <option value="5-bedroom">5-bedroom</option>
        <option value="penthouse">Penthouse</option>
        <option value="semi-detached">Semi-Detached</option>
        <option value="detached">Detached</option>
        <option value="others">Others</option>
      </select>
      <select
        name="propertyType"
        value={form.propertyType}
        onChange={handleChange}
        className="border p-3 rounded-2xl"
      >
        <option value="HDB">HDB</option>
        <option value="Condo">Condo</option>
        <option value="Landed">Landed</option>
      </select>
      <input
        name="bedrooms"
        type="number"
        value={form.bedrooms}
        onChange={handleChange}
        placeholder="Bedrooms"
        className="border p-3 rounded-2xl"
        required
      />
      <input
        name="bathrooms"
        type="number"
        value={form.bathrooms}
        onChange={handleChange}
        placeholder="Bathrooms"
        className="border p-3 rounded-2xl"
        required
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="hasStudy"
          checked={form.hasStudy}
          onChange={handleChange}
        />{" "}
        Study
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="hasHelper"
          checked={form.hasHelper}
          onChange={handleChange}
        />{" "}
        Helper&apos;s Room
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="hasBalcony"
          checked={form.hasBalcony}
          onChange={handleChange}
        />{" "}
        Balcony
      </label>
      <select
        name="furnishing"
        value={form.furnishing}
        onChange={handleChange}
        className="border p-3 rounded-2xl"
      >
        <option value="Unfurnished">Unfurnished</option>
        <option value="Partially Furnished">Partially Furnished</option>
        <option value="Fully Furnished">Fully Furnished</option>
      </select>
      <input
        name="sqft"
        value={form.sqft}
        onChange={handleChange}
        placeholder="Square Feet"
        className="border p-3 rounded-2xl"
        required
      />
    </div>
  );
}
