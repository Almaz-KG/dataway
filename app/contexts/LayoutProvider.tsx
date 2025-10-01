"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { THEME_STORAGE_KEY, SIDEBAR_STORAGE_KEY } from "./layoutConstants";
import { LayoutContext } from "./LayoutContext";

type ThemeMode = "light" | "dark";

interface LayoutContextValue {
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setThemeState] = useState<ThemeMode>("light");

  // hydrate from localStorage
  useEffect(() => {
    try {
      const storedTheme =
        (localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode) || "light";
      const storedSidebar = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      setThemeState(storedTheme);
      if (storedSidebar != null)
        setIsSidebarCollapsed(storedSidebar === "true");
    } catch {
      // ignore
    }
  }, []);

  // apply theme to document
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const setTheme = useCallback((next: ThemeMode) => setThemeState(next), []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const setSidebarCollapsed = useCallback((collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(collapsed));
    } catch {
      // ignore
    }
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(!isSidebarCollapsed);
  }, [isSidebarCollapsed, setSidebarCollapsed]);

  const value = useMemo<LayoutContextValue>(
    () => ({
      isSidebarCollapsed,
      setSidebarCollapsed,
      toggleSidebar,
      theme,
      setTheme,
      toggleTheme,
    }),
    [
      isSidebarCollapsed,
      setSidebarCollapsed,
      theme,
      setTheme,
      toggleTheme,
      toggleSidebar,
    ],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
