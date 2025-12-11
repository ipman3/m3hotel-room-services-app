import { LoaderIcon } from "lucide-react";
import { Button } from "./ui/button";

interface CustomButtonSubmitProps {
  type?: "button" | "submit" | "reset";
  textBtn: string;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function CustomButtonSubmit({
  textBtn,
  isLoading,
  className,
  onClick,
  disabled
}: CustomButtonSubmitProps) {
  return (
    <Button
      type="submit"
      size="lg"
      onClick={onClick}
      className={`w-full h-12 mt-4 bg-base-primary text-card ${className}`}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <span className="flex items-center gap-1">
          <LoaderIcon className="animate-spin" /> Loading...
        </span>
      ) : (
        textBtn
      )}
    </Button>
  );
}
