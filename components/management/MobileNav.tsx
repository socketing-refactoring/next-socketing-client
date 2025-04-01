import React from "react";
import { MenuLabelType } from '../../types/page/management';

interface MobileNavProps {
  activeTab: MenuLabelType;
  onTabChange: (tab: MenuLabelType) => void;
  tabNames: {
    ongoing: string;
    past: string;
    profile: string;
    registerEvent: string;
  };
  menuNames: {
    ongoing: string;
    past: string;
    profile: string;
    registerEvent: string;
  };
}

export function MobileNav({
  activeTab,
  onTabChange,
  tabNames,
  menuNames,
}: MobileNavProps) {
  return (
    <div className="flex border-b mb-6">
      {activeTab === "profile" ? (
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === "profile"
              ? "border-b-2 border-rose-400 text-rose-400"
              : "text-gray-500 hover:text-rose-400"
          }`}
          onClick={() => onTabChange("profile")}
        >
          {tabNames.profile}
        </button>
      ) : activeTab === "registerEvent" ? (
        <button
          className={`px-6 py-3 font-medium ${
            activeTab === "registerEvent"
              ? "border-b-2 border-rose-400 text-rose-400"
              : "text-gray-500 hover:text-rose-400"
          }`}
          onClick={() => onTabChange("registerEvent")}
        >
          {tabNames.registerEvent}
        </button>
      ) : (
        <>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "ongoing"
                ? "border-b-2 border-rose-400 text-rose-400"
                : "text-gray-500 hover:text-rose-400"
            }`}
            onClick={() => onTabChange("ongoing")}
          >
            {tabNames.ongoing}
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "past"
                ? "border-b-2 border-rose-400 text-rose-400"
                : "text-gray-500 hover:text-rose-400"
            }`}
            onClick={() => onTabChange("past")}
          >
            {tabNames.past}
          </button>
        </>
      )}
    </div>
  );
}
