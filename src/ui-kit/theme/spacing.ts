export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  2xl: "48px",
  section: "80px",
} as const;

export type SpacingToken = keyof typeof spacing;