"use client";

import React from "react";
import { Database, Menu, Bell, User, Settings, Moon, Sun } from "lucide-react";
import WorkspaceSwitcher from "./WorkspaceSwitcher";
import { useLayout } from "../contexts/useLayout";

interface NavigationProps {
  className?: string;
  userEmail?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  className = "",
  userEmail,
}) => {
  const emailToShow = userEmail ?? "user@example.com";
  const { theme, toggleTheme } = useLayout();
  return (
    <nav className={`bg-white border-b border-gray-200 px-4 py-3 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Database className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Dataway</span>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Workspace Switcher moved to right side */}
          <WorkspaceSwitcher />

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle theme"
              type="button"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Notifications"
              type="button"
            >
              <Bell className="w-5 h-5" />
            </button>

            <button
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Settings"
              type="button"
            >
              <Settings className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 hidden sm:inline">
                {emailToShow}
              </span>
              <button
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="User menu"
                type="button"
              >
                <User className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menu"
              type="button"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
