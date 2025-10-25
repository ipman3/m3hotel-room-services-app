import z from 'zod';

export const customerFormSchema = z.object({
    customerName: z.string().min(1, 'Customer name is required'),
    roomNumber: z.string().min(1, 'Room number is required'),
});

export type CustomerFormData = z.infer<typeof customerFormSchema>;