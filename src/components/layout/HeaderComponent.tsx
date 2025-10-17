"use client";

import { useRouter } from "@tanstack/react-router";
import { ChevronLeft, PhoneCallIcon } from "lucide-react";
import { Button } from "../ui/button";

interface PageHeaderProps {
  title?: string;
  showBack?: boolean;
  showContact?: boolean;
  onContactClick?: () => void;
  headerBgColor?: string;
  noBorder?: boolean;
}

export default function HeaderComponent({
  title,
  showBack = true,
  showContact = false,
  onContactClick,
  headerBgColor,
  noBorder,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${headerBgColor ? headerBgColor : "bg-muted-background"} ${noBorder ? "" : "border-b border-gray-200"}`}
    >
      <div className="relative flex items-center justify-center w-full max-w-md px-4 py-4 mx-auto text-accent-foreground">
        <div className="absolute left-4">
          {showBack && (
            <Button
              onClick={() => router.history.back()}
              size="icon"
              aria-label="Go back"
              className="w-8 h-8 rounded-lg bg-base-primary"
            >
              <ChevronLeft className="!text-white" size={20} />
            </Button>
          )}
        </div>
        {title && (
          <h2 className="w-full px-4 text-lg font-bold text-center truncate">
            {title}
          </h2>
        )}

        <div className="absolute right-4">
          {showContact && (
            <Button
              onClick={onContactClick}
              size="icon"
              aria-label="Contact"
              className="w-8 h-8 rounded-lg bg-blue-500/25"
            >
              <PhoneCallIcon className="!text-blue-500" size={20} />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
