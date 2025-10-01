export type ThemeMode = "light" | "dark";

export interface LayoutContextValue {
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

export type IconName =
  | "Box"
  | "Database"
  | "Layers"
  | "Server"
  | "Workflow"
  | "FileText"
  | "BarChart3"
  | "GitBranch"
  | "Activity"
  | "Zap"
  | "Monitor"
  | "Plug"
  | "Plus"
  | "ChevronLeft"
  | "ChevronRight";

export interface NavigationItem {
  key: string;
  label: string;
  iconName: IconName;
}

export interface NavigationGroup {
  key: string;
  label: string;
  items: NavigationItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}
