"use client";

import { createContext, useContext } from "react";
import type { Workspace } from "../_types/workspace";

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

export const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined,
);

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};
