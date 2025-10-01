"use client";

import React from "react";
import { useWorkspace } from "./contexts/WorkspaceContext";
import {
  Database,
  BarChart3,
  FileText,
  Settings,
  Users,
  Zap,
} from "lucide-react";

export default function Home() {
  const { currentWorkspace, isLoading } = useWorkspace();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Dataway
        </h1>
        <p className="text-gray-600">
          {currentWorkspace ? (
            <>
              Currently working in{" "}
              <span className="font-semibold text-blue-600">
                {currentWorkspace.name}
              </span>
              {currentWorkspace.description && (
                <span className="text-gray-500">
                  {" "}
                  - {currentWorkspace.description}
                </span>
              )}
            </>
          ) : (
            "Select a workspace to get started"
          )}
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Notebooks</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Create and run interactive notebooks for data exploration and
            analysis.
          </p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Open Notebook →
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <Database className="w-8 h-8 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">SQL Editor</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Write and execute SQL queries across your data sources.
          </p>
          <button className="text-green-600 hover:text-green-700 font-medium">
            New Query →
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <BarChart3 className="w-8 h-8 text-purple-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Dashboards</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Build interactive dashboards and visualizations.
          </p>
          <button className="text-purple-600 hover:text-purple-700 font-medium">
            Create Dashboard →
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <Zap className="w-8 h-8 text-orange-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Pipelines</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Design and manage data processing pipelines.
          </p>
          <button className="text-orange-600 hover:text-orange-700 font-medium">
            New Pipeline →
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 text-indigo-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              Collaboration
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Share and collaborate on data projects with your team.
          </p>
          <button className="text-indigo-600 hover:text-indigo-700 font-medium">
            Invite Team →
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <Settings className="w-8 h-8 text-gray-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Configure workspace settings and preferences.
          </p>
          <button className="text-gray-600 hover:text-gray-700 font-medium">
            Open Settings →
          </button>
        </div>
      </div>

      {/* Workspace Info */}
      {currentWorkspace && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Workspace Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-800">Name:</span>
              <span className="ml-2 text-blue-700">
                {currentWorkspace.name}
              </span>
            </div>
            <div>
              <span className="font-medium text-blue-800">Type:</span>
              <span className="ml-2 text-blue-700 capitalize">
                {currentWorkspace.type}
              </span>
            </div>
            <div>
              <span className="font-medium text-blue-800">ID:</span>
              <span className="ml-2 text-blue-700 font-mono">
                {currentWorkspace.id}
              </span>
            </div>
          </div>
          {currentWorkspace.description && (
            <div className="mt-3">
              <span className="font-medium text-blue-800">Description:</span>
              <p className="mt-1 text-blue-700">
                {currentWorkspace.description}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
