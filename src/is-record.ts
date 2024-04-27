/** Checks if the item is an object with `Record`-ish shape */
export function isRecord(item: unknown): item is Record<string, any> {
  if (!item || typeof item !== 'object') return false;
  if (Array.isArray(item)) return false;
  if (Object.getOwnPropertySymbols(item).length > 0) return false;
  return true;
}
