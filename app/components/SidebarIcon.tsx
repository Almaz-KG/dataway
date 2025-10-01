"use client";

import React from "react";
import type { IconName } from "../_types/layout";
import {
  Layers,
  Database,
  Server,
  Workflow,
  Box,
  FileText,
  BarChart3,
  GitBranch,
  Activity,
  Zap,
  Monitor,
  Plug,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const iconMap = {
  Box,
  Database,
  Layers,
  Server,
  Workflow,
  FileText,
  BarChart3,
  GitBranch,
  Activity,
  Zap,
  Monitor,
  Plug,
  Plus,
  ChevronLeft,
  ChevronRight,
} as const;

const SidebarIcon: React.FC<{ name: IconName; className?: string }> = ({
  name,
  className = "w-4 h-4",
}) => {
  const IconComponent = iconMap[name as keyof typeof iconMap] ?? Box;
  return <IconComponent className={className} />;
};

export default SidebarIcon;
