import React from "react";

export function LeaseSection({ form, handleChange }: any) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <input
        name="perMonth"
        value={form.perMonth}
        onChange={handleChange}
        placeholder="Monthly Rent"
        className="border p-3 rounded-2xl"
        required
      />
      <input
        name="utilitiesIncluded"
        value={form.utilitiesIncluded}
        onChange={handleChange}
        placeholder="Utilities Included (comma separated)"
        className="border p-3 rounded-2xl"
      />
      <input
        name="securityDeposit"
        value={form.securityDeposit}
        onChange={handleChange}
        placeholder="Security Deposit"
        className="border p-3 rounded-2xl"
        required
      />
      <input
        name="agentFee"
        value={form.agentFee}
        onChange={handleChange}
        placeholder="Agent Fee (optional)"
        className="border p-3 rounded-2xl"
      />
      <select
        name="leasePeriod"
        value={form.leasePeriod}
        onChange={handleChange}
        className="border p-3 rounded-2xl"
      >
        <option value="long-term">Long-term</option>
        <option value="short-term">Short-term</option>
      </select>
    </div>
  );
}
