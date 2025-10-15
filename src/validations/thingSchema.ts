import { z } from "zod";

export const thingSchema = z.object({
  serviceName: z.string(),
  price: z.number(),
  category: z.string(),
  package: z.string({
    message: "Please select a package for your service.",
  }),
  date: z.date({
    message: "An appointment date is required.",
  }),
  time: z.string().refine((time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time), {
    message: "Please enter a valid time.",
  }),
  message: z.string().max(500, "Message must be 500 characters or less.").optional(),
});
