import { string, z } from 'zod'
import { fileScheme, uploadSchema } from '../../controllers/uploads.schema';

export const queueSchema = fileScheme.pick({
        fileId: true,
        filename: true,
    })
    .merge(uploadSchema.pick({
        quality: true,
        extention: true,
    }))
export const queueWithStatusSchema = z.object({
    status: z.string()
}).merge(queueSchema)

export type Queue = z.infer<typeof queueSchema>;
export type QueueWithStatus = z.infer<typeof queueWithStatusSchema>;