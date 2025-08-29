// Whitelisted agent IDs for credential login (email prefix, normalized)
// NOTE: normalize rule = lowercase, remove non-alphanumeric
export const allowedAgentIds: string[] = [
  "ana",
  "jayden",
  "jaylux",
  "jayth",
  "jayra",
  "jaymini",
  "jayvox",
  "jayvue",
  "jaynis",
  "jayne",
  "jayx",
]

export function normalizeAgentId(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "")
}


