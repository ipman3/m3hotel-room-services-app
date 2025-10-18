import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { spaSchema, type SpaFormData } from "@/validations/spaSchema";
import { useNavigate } from "@tanstack/react-router";
import { useCartStore } from "@/store/CartStore";
import { CustomButtonSubmit } from "@/components/CustomSubmitButtonCom";

interface SpaFormProps {
  id: string;
  serviceName: string;
  serviceTypeId: number;
  serviceType: string;
  price: number;
  category: string;
  packages: string[];
  imageUrl: string;
}

export default function SpaForm({
  id,
  packages,
  serviceName,
  price,
  category,
  serviceTypeId,
  serviceType,
  imageUrl,
}: SpaFormProps) {
  const navigate = useNavigate();
  const { setPendingItem, confirmPendingItem } = useCartStore();

  const form = useForm<SpaFormData>({
    resolver: zodResolver(spaSchema),
    defaultValues: {
      serviceName: serviceName,
      serviceTypeId: serviceTypeId,
      serviceType: serviceType,
      price: price,
      category: category,
      package: packages[0] || "",
      date: new Date(),
      time: "10:30",
      message: "",
    },
  });

  function onSubmit(values: SpaFormData) {
    console.log("Form Submitted:", values);

    // Add the validated form data to the global cart store
    setPendingItem({
      serviceName: values.serviceName,
      packageName: values.package,
      date: values.date,
      time: values.time,
      price: values.price,
      category: values.category,
      serviceTypeId: values.serviceTypeId,
      serviceType: values.serviceType,
      message: values.message || "",
      imageUrl: imageUrl,
    });

    confirmPendingItem?.();
    toast.success(`${values.serviceName} has been added to your appointment.`);
    navigate({ to: "/confirm-appointment" });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <input type="hidden" value={id} />
        <input type="hidden" value={serviceName} />
        <input type="hidden" value={serviceTypeId} />
        <input type="hidden" value={serviceType} />
        <input type="hidden" value={price} />
        <input type="hidden" value={category} />

        <FormField
          control={form.control}
          name="package"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold uppercase text-foreground">
                Package
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full !h-12 mt-1 border-none bg-base-input">
                    <SelectValue placeholder="Select a package" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {packages.map((pkg) => (
                    <SelectItem key={pkg} value={pkg}>
                      {pkg}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm font-semibold uppercase text-foreground">
                Date
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1 bg-base-input border-none h-12",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold uppercase text-foreground">
                Hours
              </FormLabel>
              <div className="relative mt-1">
                <Clock className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-black" />
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    className="w-full h-12 py-2 pl-10 pr-3 border-none bg-base-input text-black"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold uppercase text-foreground">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type here"
                  className="mt-1 border-none bg-base-input"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CustomButtonSubmit
          textBtn="Add to Appointment"
          isLoading={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
}
