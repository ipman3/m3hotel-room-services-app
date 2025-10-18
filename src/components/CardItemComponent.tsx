import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export interface CardItemProps {
  id?: string;
  imageUrl?: string;
  imageAlt?: string;
  children: ReactNode;
  onRemove?: (id?: string) => void;
  isRemovable?: boolean;
  className?: string;
}

export default function CardItemComponent({
  id,
  imageUrl,
  imageAlt = "Item Image",
  children,
  onRemove,
  isRemovable = false,
  className = "",
}: CardItemProps) {
  return (
    <div
      key={id}
      className={`flex items-center gap-4 p-2 bg-muted-background rounded-2xl customShadowSm ${className}`}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={imageAlt}
          className="flex-shrink-0 object-cover w-24 h-24 rounded-xl"
          loading="lazy"
        />
      )}

      <div className="flex-grow space-y-0.5 text-sm text-base-secondary">
        {children}
      </div>

      {isRemovable && onRemove && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(id)}
          aria-label="Remove item"
        >
          <Trash2 className="w-5 h-5 text-red-500" />
        </Button>
      )}
    </div>
  );
}
