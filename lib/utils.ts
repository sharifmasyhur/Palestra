type ClassValue = string | number | null | undefined | false;

// Minimal className joiner — avoids pulling in clsx/tailwind-merge for a
// single helper. Swap for `cn` from a shared lib later if the project
// grows conditional-class complexity.
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
