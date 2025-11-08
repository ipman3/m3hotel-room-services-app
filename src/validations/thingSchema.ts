import { z } from "zod";

export const thingSchema = z.object({
  adults: z.number().int().min(1, "At least one adult is required."),
  children: z.number().int().min(0),
  name: z.string(),
  price: z.string(),
  serviceType: z.string(),
  category_id: z.number(),
  date: z.date({ message: "An appointment date is required." }),
  time: z.string().refine((time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time), {
    message: "Please enter a valid time.",
  }),
  message: z
    .string()
    .max(500, "Message must be 500 characters or less.")
    .optional(),
});

export type ThingFormData = z.infer<typeof thingSchema>;
