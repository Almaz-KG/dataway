import { createContext } from "react";

type ThemeMode = "light" | "dark";

export interface LayoutContextValue {
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

export const LayoutContext = createContext<LayoutContextValue | undefined>(
  undefined,
);
