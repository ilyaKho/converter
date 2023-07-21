import { z } from 'zod'
export const fileScheme = z.object({
    fileId: z.string().optional(),
    fieldname: z.string(),
    originalname: z.string(),
    encoding: z.string(),
    mimetype: z.string(),
    destination: z.string(),
    filename: z.string(),
    path: z.string(),
    size: z.number()
})
export const uploadSchema = z.object({
    quality: z.string().optional(),
    extention: z.string(),
    file: fileScheme
})
export type UploadT = z.infer<typeof uploadSchema>;


