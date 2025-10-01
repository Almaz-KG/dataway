"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Workspace, RecentWorkspaceEntry } from "../types/workspace";
import { MOCK_WORKSPACES } from "../mocks/workspaces";
import {
  readFavorites,
  readRecent,
  writeFavorites,
  writeRecent,
} from "../utils/storage";

// Workspace types moved to app/types/workspace

interface WorkspaceContextType {
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  favorites: Workspace[];
  recent: Workspace[];
  isLoading: boolean;
  switchWorkspace: (workspaceId: string) => void;
  toggleFavorite: (workspaceId: string) => void;
  searchWorkspaces: (query: string) => Workspace[];
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined,
);

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};

interface WorkspaceProviderProps {
  children: React.ReactNode;
}
// Data mocks moved to app/mocks/workspaces

export const WorkspaceProvider: React.FC<WorkspaceProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null,
  );
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // mock workspaces moved to module scope as MOCK_WORKSPACES

  // Load workspaces once and initialize state
  useEffect(() => {
    const loadWorkspaces = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 200));
        const favoriteIds = readFavorites();
        const recentWorkspaces = readRecent();
        const workspacesWithPreferences = MOCK_WORKSPACES.map((workspace) => {
          const recentData = recentWorkspaces.find(
            (r) => r.id === workspace.id,
          );
          return {
            ...workspace,
            isFavorite: favoriteIds.includes(workspace.id),
            lastAccessed: recentData?.lastAccessed || workspace.lastAccessed,
          };
        });
        setWorkspaces(workspacesWithPreferences);
        const sorted = [...workspacesWithPreferences].sort(
          (a, b) =>
            new Date(b.lastAccessed || 0).getTime() -
            new Date(a.lastAccessed || 0).getTime(),
        );
        setCurrentWorkspace(sorted[0] ?? null);
      } finally {
        setIsLoading(false);
      }
    };
    loadWorkspaces();
  }, []);

  // Sync selection when URL workspace_id param changes
  const workspaceIdParam = searchParams.get("workspace_id");
  useEffect(() => {
    if (!workspaceIdParam || !workspaces.length) return;
    const next = workspaces.find((w) => w.id === workspaceIdParam);
    if (next) setCurrentWorkspace(next);
  }, [workspaceIdParam, workspaces]);

  const switchWorkspace = useCallback(
    (workspaceId: string) => {
      const workspace = workspaces.find((w) => w.id === workspaceId);
      if (workspace) {
        setCurrentWorkspace(workspace);

        // Update URL with workspace_id parameter
        const url = new URL(window.location.href);
        url.searchParams.set("workspace_id", workspaceId);
        router.push(url.pathname + url.search, { scroll: false });

        // Update last accessed time and persist to localStorage
        const now = new Date().toISOString();
        setWorkspaces((prev) =>
          prev.map((w) =>
            w.id === workspaceId ? { ...w, lastAccessed: now } : w,
          ),
        );

        // Update recent workspaces in localStorage
        const existing = readRecent();
        const filtered = existing.filter((r) => r.id !== workspaceId);
        const updated: RecentWorkspaceEntry[] = [
          { id: workspaceId, lastAccessed: now },
          ...filtered,
        ].slice(0, 10);
        writeRecent(updated);
      }
    },
    [workspaces, router],
  );

  const toggleFavorite = useCallback((workspaceId: string) => {
    setWorkspaces((prev) => {
      const updated = prev.map((w) =>
        w.id === workspaceId ? { ...w, isFavorite: !w.isFavorite } : w,
      );

      // Persist favorites to localStorage
      const favoriteIds = updated.filter((w) => w.isFavorite).map((w) => w.id);
      writeFavorites(favoriteIds);

      return updated;
    });
  }, []);

  const searchWorkspaces = useCallback(
    (query: string): Workspace[] => {
      if (!query.trim()) return workspaces;

      const lowercaseQuery = query.toLowerCase();
      return workspaces.filter(
        (workspace) =>
          workspace.name.toLowerCase().includes(lowercaseQuery) ||
          workspace.description?.toLowerCase().includes(lowercaseQuery),
      );
    },
    [workspaces],
  );

  const favorites = workspaces.filter((w) => w.isFavorite);
  const recent = [...workspaces]
    .sort(
      (a, b) =>
        new Date(b.lastAccessed || 0).getTime() -
        new Date(a.lastAccessed || 0).getTime(),
    )
    .slice(0, 5);

  const value: WorkspaceContextType = {
    currentWorkspace,
    workspaces,
    favorites,
    recent,
    isLoading,
    switchWorkspace,
    toggleFavorite,
    searchWorkspaces,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
};
