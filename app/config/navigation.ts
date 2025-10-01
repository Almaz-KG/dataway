import type { NavigationItem, NavigationGroup } from "../_types/layout";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    key: "workspaces",
    label: "Workspaces",
    iconName: "Box",
  },
  {
    key: "catalogs",
    label: "Catalogs",
    iconName: "Database",
  },
  {
    key: "workflows",
    label: "Workflows",
    iconName: "Layers",
  },
  {
    key: "compute",
    label: "Compute",
    iconName: "Server",
  },
];

export const NAVIGATION_GROUPS: NavigationGroup[] = [
  {
    key: "sql",
    label: "SQL",
    items: [
      {
        key: "sql-editor",
        label: "SQL Editor",
        iconName: "FileText",
      },
      {
        key: "dbt-models",
        label: "dbt-models",
        iconName: "GitBranch",
      },
      {
        key: "queries",
        label: "Queries",
        iconName: "Database",
      },
      {
        key: "dashboards",
        label: "Dashboards",
        iconName: "BarChart3",
      },
    ],
  },
  {
    key: "de",
    label: "Data Engineering",
    items: [
      {
        key: "pipelines",
        label: "Pipelines",
        iconName: "Workflow",
      },
      {
        key: "syncs",
        label: "Syncs",
        iconName: "Zap",
      },
      {
        key: "monitoring",
        label: "Monitoring",
        iconName: "Monitor",
      },
    ],
  },
  {
    key: "ml",
    label: "ML Engineering",
    items: [
      {
        key: "features",
        label: "Features",
        iconName: "Zap",
      },
      {
        key: "models",
        label: "Models",
        iconName: "Layers",
      },
      {
        key: "mlops",
        label: "MLOps",
        iconName: "Activity",
      },
    ],
  },
  {
    key: "settings",
    label: "Settings",
    items: [
      {
        key: "plugins",
        label: "Plugins",
        iconName: "Plug",
      },
    ],
  },
];
