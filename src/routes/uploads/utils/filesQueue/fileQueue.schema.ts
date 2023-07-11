import { z } from 'zod'
export const schema = z.object({
    userId: z.string(),
    fileId: z.string(),
    quality: z.number().optional(),
    extention: z.string(),
    fieldname: z.string(),
    originalname: z.string(),
    mimetype: z.string(),
    filename: z.string(),
    path: z.string(),
})
export type queueType = z.infer<typeof schema>;