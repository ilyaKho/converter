import { z } from 'zod'
export const userScheme = z.object({
    authorized: z.boolean(),
    userId: z.string(),
    email: z.string(),
    subscription: z.boolean(),
    expires: z.number(),
    dayLimit: z.number(),
    monthLimit: z.number(),
    createdDate: z.number().optional()
})
export const unknownUserScheme = userScheme.pick({
    authorized: true,
    userId: true,
    dayLimit: true,
    monthLimit: true,
    createdDate: true
})
export const paymentScheme = z.object({
    amount: z.number()
})
export type PaymentT = z.infer<typeof paymentScheme>;
export type UserT = z.infer<typeof userScheme>;
export type UnknownUserT = z.infer<typeof unknownUserScheme>;


