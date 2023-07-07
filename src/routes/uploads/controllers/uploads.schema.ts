import { z } from 'zod'
export const schema = z.object({
    quality: z.string().optional(),
    extention: z.string().optional(),
    file: z.object({
        fieldname: z.string(),
        originalname: z.string(),
        encoding: z.string(),
        mimetype: z.string(),
        destination: z.string(),
        filename: z.string(),
        path: z.string(),
        size: z.number()
    })
})

export type uploadType = z.infer<typeof schema>;


