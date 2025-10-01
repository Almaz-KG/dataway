"use client";

import React from "react";
import { useLayout } from "../contexts/useLayout";
import Navigation from "./Navigation";

interface AppShellProps {
  leftSidebar: React.ReactNode;
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ leftSidebar, children }) => {
  const { isSidebarCollapsed } = useLayout();

  const sidebarWidth = isSidebarCollapsed ? 64 : 264; // px

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navigation className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800" />
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <aside
          className="sticky top-0 h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-[width] duration-200 ease-in-out overflow-hidden"
          style={{ width: sidebarWidth }}
          aria-label="Primary navigation"
        >
          {leftSidebar}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-4">
            {/* Breadcrumbs */}
            <nav
              aria-label="Breadcrumb"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              <ol className="flex items-center gap-2">
                <li>Home</li>
                <li aria-hidden>›</li>
                <li className="text-gray-900 dark:text-gray-100">Overview</li>
              </ol>
            </nav>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppShell;
