import { useState } from "react";
import { cn } from "@/lib/utils";

export interface Tab {
  title: string;
  content: React.ReactNode;
}

interface TabBarProps {
  tabs: Tab[];
}

export function TabBarComponent({ tabs }: TabBarProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!tabs || tabs.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={tab.title}
            onClick={() => setActiveTab(index)}
            className={cn(
              "px-4 py-2 -mb-px text-sm font-medium text-center transition-colors duration-200 ease-in-out border-b-2 focus:outline-none",
              activeTab === index
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="py-4">
        <h2 className="text-lg font-semibold mb-4">{tabs[activeTab].title}</h2>
        {tabs[activeTab].content}
      </div>
    </div>
  );
}