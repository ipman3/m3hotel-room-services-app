import { useState } from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

interface Service {
  name: string;
  description: string;
  isPopular: boolean;
  packages: string[];
}

interface ServiceDetailSheetProps {
  service: Service;
}

export default function ServiceDetailSheet({
  service,
}: ServiceDetailSheetProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedPackage, setSelectedPackage] = useState(service.packages[0]);

  return (
    <div className="relative z-10 px-4 py-6 -mt-8 bg-muted-background rounded-t-4xl">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-base-input rounded-full" />

      <div className="flex items-center justify-between mt-4">
        <h1 className="text-xl font-bold">{service.name}</h1>
        {service.isPopular && (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-base-accent/20 text-base-accent">
            Popular
          </span>
        )}
      </div>

      <div className="mt-4">
        <h2 className="font-semibold">Description</h2>
        <p className="mt-1 text-gray-600">{service.description}</p>
      </div>

      {/* Form Section */}
      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-semibold uppercase text-foreground">
            Package
          </label>
          <Select value={selectedPackage} onValueChange={setSelectedPackage}>
            <SelectTrigger className="w-full !h-12 mt-1 border-none bg-base-input">
              <SelectValue placeholder="Select a package" />
            </SelectTrigger>
            <SelectContent>
              {service.packages.map((pkg) => (
                <SelectItem key={pkg} value={pkg}>
                  {pkg}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-semibold uppercase text-foreground">
            Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal mt-1 bg-base-input border-none h-12",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="text-sm font-semibold uppercase text-foreground">
            Hours
          </label>
          <div className="relative mt-1">
            <Clock className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2" />
            <Input
              type="time"
              id="time-picker"
              step="1"
              defaultValue="10:30:00"
              className="w-full h-12 py-2 pl-10 pr-3 border-none bg-base-input appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold uppercase text-foreground">
            Message
          </label>
          <Textarea
            placeholder="Type here"
            className="mt-1 border-none bg-base-input"
            rows={3}
          />
        </div>
      </div>

      <Button size="lg" className="w-full mt-8 bg-base-primary">
        Make Appointment
      </Button>
    </div>
  );
}
