"use client";

import React from "react";
import { useLayout } from "../contexts/useLayout";
import { NAVIGATION_ITEMS, NAVIGATION_GROUPS } from "../config/navigation";
import SidebarIcon from "./SidebarIcon";

/**
 * Sidebar navigation component with collapsible sections
 * Displays navigation items and groups with toggle functionality
 */
const Sidebar: React.FC = () => {
  const { isSidebarCollapsed, toggleSidebar } = useLayout();

  return (
    <div className="flex flex-col px-4 py-3 text-gray-700 dark:text-gray-200">
      {/* Collapse/Expand control */}
      <div className="mb-2 flex justify-end">
        <button
          type="button"
          onClick={toggleSidebar}
          className="inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-300 h-8 w-8"
          aria-label={
            isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
          }
        >
          <SidebarIcon
            name={isSidebarCollapsed ? "ChevronRight" : "ChevronLeft"}
            className="w-4 h-4"
          />
        </button>
      </div>

      {/* New button */}
      <div className="mb-2">
        <a
          href="#"
          className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 font-semibold text-blue-600 dark:text-blue-400"
          aria-label="New"
        >
          <SidebarIcon name="Plus" className="w-4 h-4" />
          {!isSidebarCollapsed && <span>New</span>}
        </a>
      </div>

      {/* Ungrouped */}
      <ul className="space-y-1 mb-4">
        {NAVIGATION_ITEMS.map((item) => (
          <li key={item.key}>
            <a
              href="#"
              className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900"
              aria-label={item.label}
            >
              <SidebarIcon name={item.iconName} className="w-4 h-4" />
              {!isSidebarCollapsed && <span>{item.label}</span>}
            </a>
          </li>
        ))}
      </ul>

      {/* Groups */}
      <div className="space-y-4">
        {NAVIGATION_GROUPS.map((g) => (
          <div key={g.key}>
            {!isSidebarCollapsed && (
              <div className="px-2 pb-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {g.label}
              </div>
            )}
            {isSidebarCollapsed && (
              <div className="px-2 pb-1">
                <div
                  className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"
                  aria-label={g.label}
                />
              </div>
            )}
            <ul className="space-y-1">
              {g.items.map((item) => (
                <li key={item.key}>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900"
                    aria-label={item.label}
                  >
                    <SidebarIcon name={item.iconName} className="w-4 h-4" />
                    {!isSidebarCollapsed && <span>{item.label}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
