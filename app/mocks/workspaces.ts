import type { Workspace } from "../types/workspace";

export const MOCK_WORKSPACES: Workspace[] = [
  {
    id: "ws-1",
    name: "Personal Analytics",
    description: "My personal data workspace",
    type: "personal",
    isFavorite: true,
    lastAccessed: new Date().toISOString(),
  },
  {
    id: "ws-2",
    name: "Marketing Team",
    description: "Marketing analytics and campaigns",
    type: "team",
    isFavorite: true,
    lastAccessed: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "ws-3",
    name: "Data Engineering",
    description: "ETL pipelines and data processing",
    type: "team",
    isFavorite: false,
    lastAccessed: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "ws-4",
    name: "ML Research",
    description: "Machine learning experiments",
    type: "organization",
    isFavorite: false,
    lastAccessed: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: "ws-5",
    name: "Finance Analytics",
    description: "Financial reporting and analysis",
    type: "organization",
    isFavorite: true,
    lastAccessed: new Date(Date.now() - 345600000).toISOString(),
  },
];
