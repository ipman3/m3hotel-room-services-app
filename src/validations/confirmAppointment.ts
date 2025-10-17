

import z from 'zod';

export const confirmAppointmentSchema = z.object({
    customerName: z.string().min(1, 'Customer name is required'),
    roomNumber: z.string().min(1, 'Room number is required'),
});

export type ConfirmAppointmentInput = z.infer<typeof confirmAppointmentSchema>;