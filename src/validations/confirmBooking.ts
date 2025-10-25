

import z from 'zod';

export const confirmBookingSchema = z.object({
    customerName: z.string().min(1, 'Customer name is required'),
    roomNumber: z.string().min(1, 'Room number is required'),
    // email: z.string().email("Please enter a valid email address."),
    // phoneNumber: z.string().min(8, "Please enter a valid phone number."),
});

export type ConfirmBookingInput = z.infer<typeof confirmBookingSchema>;