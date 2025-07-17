import React from "react";
import { floatingLabel, floatingInput, floatingSelect } from "./floatingStyles";
import { LEASE_PERIOD_TYPES, UTILITIES } from "@/lib/constants";

interface LeaseSectionProps {
  form: {
    perMonth: string;
    utilitiesIncluded: string[];
    securityDeposit: string;
    facilities?: string; // now a comma-separated string
    agentFee: string;
    leasePeriod: string;
    availableFrom: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleToggleUtility: (utility: string) => void;
}

export function LeaseSection({ form, handleChange, handleToggleUtility }: LeaseSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="relative">
        <input
          name="perMonth"
          value={form.perMonth}
          onChange={handleChange}
          className={floatingInput}
          required
          placeholder=" "
        />
        <label className={floatingLabel}>Monthly Rent</label>
      </div>
      <div className="relative flex flex-col gap-2">
        <span className="block font-medium mb-1">Utilities Included</span>
        <div className="flex gap-4">
          {UTILITIES.map((utility) => (
            <label key={utility} className="flex items-center gap-1">
              <input
                type="checkbox"
                name="utilitiesIncluded"
                value={utility}
                checked={Array.isArray(form.utilitiesIncluded) ? form.utilitiesIncluded.includes(utility) : false}
                onChange={() => handleToggleUtility(utility)}
              />
              {utility}
            </label>
          ))}
        </div>
      </div>
      <div className="relative">
        <input
          name="securityDeposit"
          value={form.securityDeposit}
          onChange={handleChange}
          className={floatingInput}
          required
          placeholder=" "
        />
        <label className={floatingLabel}>Security Deposit</label>
      </div>
      <div className="relative">
        <input
          name="facilities"
          value={form.facilities || ""}
          onChange={handleChange}
          className={floatingInput}
        />
        <label className={floatingLabel}>Facilities (comma separated)</label>
      </div>
      <div className="relative">
        <input
          name="agentFee"
          value={form.agentFee}
          onChange={handleChange}
          className={floatingInput}
          placeholder=" "
        />
        <label className={floatingLabel}>Agent Fee (optional)</label>
      </div>
      <div className="relative">
        <select
          name="leasePeriod"
          value={form.leasePeriod}
          onChange={handleChange}
          className={floatingSelect}
        >
          {LEASE_PERIOD_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <label className={floatingLabel}>Lease Period</label>
      </div>
      <div className="relative">
        <input
          name="availableFrom"
          type="date"
          value={form.availableFrom}
          onChange={handleChange}
          className={floatingInput}
          placeholder=" "
        />
        <label className={floatingLabel}>Available From</label>
      </div>
    </div>
  );
}
