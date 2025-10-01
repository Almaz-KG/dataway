import React from "react";
import type { BreadcrumbItem } from "../_types/layout";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Dynamic breadcrumb component for navigation
 * @param items - Array of breadcrumb items
 * @param className - Optional CSS classes
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = "",
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}
    >
      <ol className="flex items-center gap-2">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <li aria-hidden>›</li>}
            <li>
              {item.href ? (
                <a
                  href={item.href}
                  className={`hover:text-gray-700 dark:hover:text-gray-300 ${
                    item.current
                      ? "text-gray-900 dark:text-gray-100 font-medium"
                      : ""
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={
                    item.current
                      ? "text-gray-900 dark:text-gray-100 font-medium"
                      : ""
                  }
                >
                  {item.label}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
