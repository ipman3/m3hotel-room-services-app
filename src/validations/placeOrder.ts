

import z from 'zod';

export const placeOrderSchema = z.object({
    customerName: z.string().min(1, 'Customer name is required'),
    roomNumber: z.string().min(1, 'Room number is required'),
});

export type PlaceOrderInput = z.infer<typeof placeOrderSchema>;