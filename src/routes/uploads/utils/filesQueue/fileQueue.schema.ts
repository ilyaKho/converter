import { string, z } from 'zod'
import { userScheme } from '../../../users/users.schema';
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

export type queueType = z.infer<typeof queueSchema>;
export type queueWithStatusType = z.infer<typeof queueWithStatusSchema>;