import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

import { useNavigate } from "@tanstack/react-router";
import { useCartStore } from "@/store/CartStore";
import { thingSchema, type ThingFormData } from "@/validations/thingSchema";
import { NumberInput } from "@/components/NumberInput";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceData {
  id: number;
  name: string;
  short_desc: string;
  image: string;
  price: string;
  unit: string;
  category_id: number;
  serviceType: string;
}

<<<<<<< HEAD
export default function ServiceForm({ id, name, serviceTypeId, serviceType, price, description, category, packages, imageUrl }: ServiceData) {
=======
export default function ServiceForm({
  id,
  name,
  short_desc,
  price,
  category_id,
  image,
  serviceType,
}: ServiceData) {
>>>>>>> origin/Bunheng-Dev
  const navigate = useNavigate();
  const { setPendingItem, confirmPendingItem } = useCartStore();

  const form = useForm<ThingFormData>({
    resolver: zodResolver(thingSchema),
    defaultValues: {
      name: name,
      serviceType: serviceType,
      price: price,
      category_id: category_id,
      date: new Date(),
      time: "10:30",
      adults: 1,
      children: 1,
      message: "",
    },
  });

  function onSubmit(values: ThingFormData) {
    console.log("Form Submitted:", values);

    // Add the validated form data to the global cart store
<<<<<<< HEAD
    // setPendingItem({
    //   ...values,
    //   serviceTypeId: values.serviceTypeId || 0,
    //   serviceType: values.serviceType || "",
    //   packageName: values.package || "",
    //   message: values.message || "",
    //   imageUrl: imageUrl,
    //   description: description,
    // });
=======
    setPendingItem({
      ...values,
      // Additional service details
      serviceType: serviceType,
      price: price,
      name: name,
      time: values.time,
      date: values.date,
      category_id: category_id,
      message: values.message || "",
      image: image,
      description: short_desc,
      quantity: (values.adults || 0) + (values.children || 0),
    });
>>>>>>> origin/Bunheng-Dev

    confirmPendingItem?.();
    toast.success("Item added to cart!", {
      duration: 8000,
      action: { label: "View Cart", onClick: () => navigate({ to: "/cart" }) },
    });
    // navigate({ to: "/thing-to-do/confirm-booking" });
    // navigate({ to: "/thing-to-do" });
  }

  const onError = (errors: FieldErrors<ThingFormData>) => {
    console.log("Form Errors:", errors);
    toast.error("Please fix the errors in the form before submitting.");
  };

  return (
    <>
<<<<<<< HEAD
      <div className="flex items-center p-4 mb-6 space-x-4 border rounded-lg bg-card border-border">
        <img src={imageUrl} alt={name} className="object-cover w-16 h-16 rounded-md" />
        <div>
          <h2 className="font-semibold">{name}</h2>
          <p className="mt-1 font-bold text-primary">${price.toFixed(2)}</p>
        </div>
      </div>
=======
      <Card className="py-4 mb-4 overflow-hidden border-none customShadowSm rounded-xl scroll-animate">
        <CardContent className="flex items-center gap-4 px-4">
          <img
            src={image}
            alt={name}
            className="object-cover w-24 h-24 rounded-xl"
            loading="lazy"
          />
          <div className="flex-grow">
            <h3 className="font-bold">{name.replace("_", " ")}</h3>
            <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: short_desc }} />
            <p className="mt-1 font-bold">${parseFloat(price).toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>


>>>>>>> origin/Bunheng-Dev
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="mt-6 space-y-4">
          <input type="hidden" value={id} />
          <input type="hidden" value={name} />
          <input type="hidden" value={serviceType} />
          <input type="hidden" value={price} />
          <input type="hidden" value={image} />
          <input type="hidden" value={short_desc} />
          <input type="hidden" value={category_id} />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-sm font-semibold uppercase text-foreground">Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal mt-1 bg-base-input border-none h-12",
                          !field.value && "text-muted-foreground"
                        )}>
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
<<<<<<< HEAD
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
=======
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={{ before: new Date() }}
                    />
>>>>>>> origin/Bunheng-Dev
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="adults"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold uppercase text-foreground">Adults (Age 12 - 99)</FormLabel>
                <NumberInput onChange={field.onChange} value={field.value} key={field.name} max={10} min={1} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="children"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold uppercase text-foreground">Children (Age 5 - 11)</FormLabel>
                <NumberInput onChange={field.onChange} value={field.value} key={field.name} max={10} min={1} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold uppercase text-foreground">Hours</FormLabel>
                <div className="relative mt-1">
                  <Clock className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                  <FormControl>
                    <Input type="time" {...field} className="w-full h-12 py-2 pl-10 pr-3 border-none bg-base-input" />
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
                <FormLabel className="text-sm font-semibold uppercase text-foreground">Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type here" className="mt-1 border-none bg-base-input" rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" className="w-full h-12 mt-8 bg-base-primary">
            Add to Cart
          </Button>
        </form>
      </Form>
    </>
  );
}
