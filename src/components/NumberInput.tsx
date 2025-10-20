import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function NumberInput({ value, onChange, min = 0, max }: NumberInputProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (max === undefined || value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center justify-between w-full h-12 px-3 bg-base-input rounded-lg">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="w-8 h-8 rounded-full"
        onClick={handleDecrement}
        disabled={value <= min}
      >
        <Minus className="w-4 h-4" />
      </Button>
      <span className="text-base font-semibold">{value}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="w-8 h-8 rounded-full"
        onClick={handleIncrement}
        disabled={max !== undefined && value >= max}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}