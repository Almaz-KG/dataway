"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Star,
  ChevronDown,
  Check,
  Building,
  Users,
  User,
} from "lucide-react";
import { useWorkspace } from "../contexts/WorkspaceContext";

interface WorkspaceSwitcherProps {
  className?: string;
}

const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = ({
  className = "",
}) => {
  const {
    currentWorkspace,
    workspaces,
    isLoading,
    switchWorkspace,
    toggleFavorite,
    searchWorkspaces,
  } = useWorkspace();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Filter workspaces based on search
  const filteredWorkspaces = searchQuery.trim()
    ? searchWorkspaces(searchQuery)
    : workspaces;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev < filteredWorkspaces.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredWorkspaces.length - 1,
          );
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < filteredWorkspaces.length) {
            const workspace = filteredWorkspaces[focusedIndex];
            switchWorkspace(workspace.id);
            setIsOpen(false);
            setFocusedIndex(-1);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          buttonRef.current?.focus();
          break;
        case "Tab":
          if (e.shiftKey) {
            // Shift+Tab - close dropdown
            setIsOpen(false);
            setFocusedIndex(-1);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, focusedIndex, filteredWorkspaces, switchWorkspace]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleWorkspaceSelect = (workspaceId: string) => {
    switchWorkspace(workspaceId);
    setIsOpen(false);
    setFocusedIndex(-1);
    setSearchQuery("");
  };

  const handleToggleFavorite = (e: React.MouseEvent, workspaceId: string) => {
    e.stopPropagation();
    toggleFavorite(workspaceId);
  };

  const getWorkspaceIcon = (type: string) => {
    switch (type) {
      case "personal":
        return <User className="w-4 h-4" />;
      case "team":
        return <Users className="w-4 h-4" />;
      case "organization":
        return <Building className="w-4 h-4" />;
      default:
        return <Building className="w-4 h-4" />;
    }
  };

  const formatLastAccessed = (lastAccessed?: string) => {
    if (!lastAccessed) return "";

    const date = new Date(lastAccessed);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div
        className={`flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg ${className}`}
      >
        <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
        <div className="w-24 h-4 bg-gray-300 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select workspace"
        type="button"
      >
        {currentWorkspace && (
          <>
            {getWorkspaceIcon(currentWorkspace.type)}
            <span className="font-medium text-gray-900 truncate max-w-48">
              {currentWorkspace.name}
            </span>
          </>
        )}
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search workspaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Search workspaces"
              />
            </div>
          </div>

          {/* Workspace List */}
          <div
            className="max-h-80 overflow-y-auto"
            role="listbox"
            id="workspace-switcher-listbox"
            aria-live="polite"
          >
            {filteredWorkspaces.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {searchQuery.trim()
                  ? "No workspaces found"
                  : "No workspaces available"}
              </div>
            ) : (
              filteredWorkspaces.map((workspace, index) => (
                <div
                  key={workspace.id}
                  onClick={() => handleWorkspaceSelect(workspace.id)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
                    index === focusedIndex ? "bg-blue-50" : "hover:bg-gray-50"
                  } ${
                    currentWorkspace?.id === workspace.id
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : ""
                  }`}
                  role="option"
                  aria-selected={currentWorkspace?.id === workspace.id}
                  id={`workspace-option-${workspace.id}`}
                  tabIndex={index === focusedIndex ? 0 : -1}
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {getWorkspaceIcon(workspace.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 truncate">
                          {workspace.name}
                        </span>
                        {currentWorkspace?.id === workspace.id && (
                          <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        )}
                      </div>
                      {workspace.description && (
                        <p className="text-sm text-gray-500 truncate">
                          {workspace.description}
                        </p>
                      )}
                      {workspace.lastAccessed && (
                        <p className="text-xs text-gray-400">
                          {formatLastAccessed(workspace.lastAccessed)}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleToggleFavorite(e, workspace.id)}
                    className={`p-1 rounded transition-colors ${
                      workspace.isFavorite
                        ? "text-yellow-500 hover:text-yellow-600"
                        : "text-gray-400 hover:text-yellow-500"
                    }`}
                    aria-label={
                      workspace.isFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    <Star
                      className={`w-4 h-4 ${workspace.isFavorite ? "fill-current" : ""}`}
                    />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceSwitcher;
