export const SIDEBAR_WIDTHS = {
  COLLAPSED: 64,
  EXPANDED: 264,
} as const;

export const STORAGE_KEYS = {
  THEME: "dataway-theme",
  SIDEBAR_COLLAPSED: "dataway-sidebar-collapsed",
} as const;

export const LAYOUT_BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
} as const;

const layoutConfig = {
  SIDEBAR_WIDTHS,
  STORAGE_KEYS,
  LAYOUT_BREAKPOINTS,
} as const;

export default layoutConfig;
