// Utility functions for validation and sanitization
export function sanitizeFacilities(facilities: unknown): string[] {
  if (Array.isArray(facilities)) return facilities;
  if (typeof facilities === "string" && facilities) {
    return facilities.split(",").map((f: string) => f.trim()).filter(Boolean);
  }
  return [];
}

export function sanitizeOccupation(occupation: unknown): string[] {
  if (Array.isArray(occupation)) return occupation;
  if (typeof occupation === "string" && occupation) {
    return occupation.split(",").map((o: string) => o.trim()).filter(Boolean);
  }
  return [];
}

export function sanitizeNumber(val: unknown, fallback = 0): number {
  const num = Number(val);
  return isNaN(num) ? fallback : num;
}

export function sanitizeArray(val: unknown): unknown[] {
  return Array.isArray(val) ? val : [];
}

export function sanitizeDate(val: unknown): string | null {
  if (!val) return null;
  const dateObj = new Date(val as string);
  return isNaN(dateObj.getTime()) ? null : dateObj.toISOString();
}
