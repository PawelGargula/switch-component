import { z } from 'zod';

export const FormSchema = z.object({
    name: z.string()
        .min(1, { 
            message: 'Name is required' 
        })
        .regex(/^[a-zA-Z\s]*$/, { 
            message: 'Name cannot contain special characters' 
        }),
    lastName: z.string()
        .min(1, { 
            message: 'Last name is required' 
        })
        .regex(/^[a-zA-Z\s]*$/, { 
            message: 'Last name cannot contain special characters' 
        }),
    email: z.string().email(),
    agreement: z.boolean().refine(val => val === true, {
        message: 'You must agree to the processing of personal data'
    })
});

export type FormValues = z.infer<typeof FormSchema>;