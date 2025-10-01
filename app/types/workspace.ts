export interface Workspace {
  id: string;
  name: string;
  description?: string;
  isFavorite?: boolean;
  lastAccessed?: string;
  type: "personal" | "team" | "organization";
}

export type RecentWorkspaceEntry = { id: string; lastAccessed: string };
