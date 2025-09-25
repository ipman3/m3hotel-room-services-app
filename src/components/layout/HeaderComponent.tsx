"use client";

import { useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title?: string;
  showBack?: boolean;
  iconBgColor?: string;
  headerBgColor?: string;
  noBorder?: boolean;
}

export default function HeaderComponent({ title, showBack = true, iconBgColor, headerBgColor, noBorder }: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${headerBgColor ? headerBgColor : "bg-muted-background"} ${noBorder ? "" : "border-b border-gray-200"}`}>
      <div className="relative flex items-center justify-center w-full max-w-md px-4 py-4 mx-auto text-accent-foreground">
        {showBack && (
          <button
            onClick={() => router.history.back()}
            className={`absolute left-5 rounded-lg cursor-pointer h-8 w-8 flex items-center justify-center ${iconBgColor ? iconBgColor : "bg-base-primary"}`}
            aria-label="Go back">
            <ChevronLeft className="!text-white" size={24} />
          </button>
        )}
        {title && <h2 className="w-full px-8 text-lg font-bold text-center truncate">{title}</h2>}
      </div>
    </header>
  );
}
