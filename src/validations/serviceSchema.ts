// src/schemas/serviceSchema.ts
import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required."),
  description: z.string().optional(),
  imageUrl: z.array(z.string()).min(1, "At least one image is required."),
  quantity: z.number().min(1, "Quantity must be at least 1."),
  price: z.number().positive().optional(),
  message: z.string().max(500, "Message must be 500 characters or less.").optional(),
});

export type ServiceSchema = z.infer<typeof serviceSchema>;
